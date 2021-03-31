import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Track, Parcel } from '../../../../models';
import { Tracks } from '../../../../providers';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  loading: boolean = false;
  currentRecords: Array<Parcel> = [];
  currentRecord: Parcel;
  dirty: boolean = false;
  searchMark: string = '?';
  searchForm: FormGroup;


  constructor(
    private tracks: Tracks,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.searchForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  queryRecord() {
    this.loading = true;
    const queryData = this.searchForm.value;
    let searchQuery = '';
    if (queryData.code !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `?code=${queryData.code}`;
    }

    console.log('pickup searchQuery',searchQuery)
    this.tracks.recordRetrieve(searchQuery).then(res =>{
      if (res.success) {
        this.currentRecords = res.payload;
        this.showNotification(`(${res.payload.length}) records found`);
      } else {
        this.showNotification(res.message);
      }
      this.loading = false;
    })
  }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
    timeOut: 8000,
    closeButton: true,
    enableHtml: true,
    toastClass: 'alert alert-primary alert-with-icon',
    });
  }
  
}

