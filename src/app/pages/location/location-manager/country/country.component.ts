import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { getFullname } from '../../../../helpers';
import { ApiResponse,  Country } from '../../../../models';
import { Countries } from '../../../../providers';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @Input() record: any;
  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;
  confirmDelete: boolean = false;


  searchForm: FormGroup;
  queryForm: FormGroup;
  currentRecord: Country;
  currentRecords: Array<Country> = [];
  getName = getFullname;
  loading = false;
  dirty = false;
  searchMark: String = '?';
  queryLoading: Boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private countries: Countries) {
    this.currentRecords = this.countries.query();
    this.queryForm = this.formBuilder.group({
      name: [''],
      iso2: [''],
      status: ['']
    });
    this.searchForm = this.formBuilder.group({
      searchString: ['', Validators.required],
    });
    this.getRecords();
  }

  ngOnInit() {
    this.monitorRecords();
  }

  search(data) {
    const queryString = `?q=${data.searchString}`; // queryString
    console.log(data);
    this.countries.recordRetrieve(queryString).then((res: ApiResponse) => {
      if (res.success) {
        this.currentRecords = this.countries.query();
        this.showNotification(`${res.payload.length} record(s) found!`);
      }
    }).catch(err => {
      this.showNotification(err);
    });
  }

  monitorRecords = () => {
    setTimeout(() => {
      this.currentRecords =  this.getRecords()
      if (!(this.currentRecords.length > 1)) { this.monitorRecords(); }
    }, 3000);
  }

  getRecords(){
    this.loading = true;
    let query = ``;
    this.countries.recordRetrieve(query).then( res => {
      if(res.success){
        this.currentRecords = res.payload;
        console.log(this.currentRecords);
        this.loading = false;
        this.showNotification(res.message);
      }
    }).catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
    return this.currentRecords;
  }

  // goToDetail(record: any): void {
  //   this.router.navigate([`people/user/detail/${record.id}`]);
  //   return;
  // }

  removeRecord(record) {
    console.log(record.id);
  }

  openSidebar(activePanel: string, status: string, record: Country | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.alwayOpenSidebar = `${status}-${+new Date}`;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Country`;
    this.currentRecord = record;
  }


  closeSidebar($event) {
    console.log('$event', $event);
  }

  openAddSidebar(): void {
    this.openSidebar('forms', 'create', null)
  }

  openViewSidebar(record: any = ""): void {
    this.openSidebar('view', 'view', record);
  }

  openEditSidebar(record: any = ""): void {
    this.openSidebar('forms', 'edit', record);
  }

  openModal(record: Country): void {
    this.currentRecord = record;
    this.confirmDelete = true;
    const deleteModal =  $('#deleteModal');
    deleteModal.attr('aria-modal', 'true');
    deleteModal.removeAttr('aria-hidden');
    deleteModal.addClass('show');
    console.log(deleteModal);
  }

  /**
   * @description "Handle close modal"
   */
  closeModal(): void {
    const deleteModal =  $('#deleteModal');
    deleteModal.attr('aria-hidden', 'true');
    deleteModal.removeAttr('aria-modal');
    deleteModal.removeClass('show');
    this.confirmDelete = false;
    this.currentRecord = null;
  }


  showNotification(message) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  queryRecord = async () => {
    this.queryLoading = true;
    const queryData = this.queryForm.value;
    let searchQuery = '';
    
    if (queryData.name !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}name=${queryData.name}`;
    }
    if (queryData.iso2 !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}iso2=${queryData.iso2}`;
    }
    if (queryData.status !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}status=${queryData.status.toUpperCase()}`;
    }
    this.searchMark = '?'; this.dirty = false;
    const result = await this.countries.recordRetrieve(searchQuery);
    if (result.success) {
      this.currentRecords = result.payload;
      this.showNotification(`(${result.payload.length}) records found`);
    } else {
      this.showNotification(result.message);
    }
    this.queryLoading = false;
  }
}

