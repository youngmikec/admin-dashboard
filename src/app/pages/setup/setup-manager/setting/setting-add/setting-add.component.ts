
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../../../../../models';
import { Transactions, Settings } from '../../../../../providers';
import { genCode } from '../../../../../helpers';


@Component({
  selector: 'app-setting-add',
  templateUrl: './setting-add.component.html',
  styleUrls: ['./setting-add.component.css']
})
export class SettingAddComponent implements OnInit {

  loading: boolean = false;
  addForm: FormGroup;
  constructor(
    private transactions: Transactions,
    private settings: Settings,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createAddForm();
  }

  ngOnInit(): void {

  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      name:         ['', Validators.required],
      type:         ['', Validators.required],
      value:        ['', Validators.required],
      description:  ['', Validators.required],
      isPublic:     ['', Validators.required],
    });
  }

  onSubmit(){
    let payload = this.addForm.value;
    if(payload.isPublic == "TRUE"){
      payload.isPublic = true;
    }else{
      payload.isPublic = false;
    }
    console.log(payload);
    this.loading = true;

    this.settings.recordCreate(payload).then(res => {
      if(res.success){
        this.loading = false;
        this.showNotification(res.message);
        this.addForm.reset();
      }
    }).catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
  }

  showNotification(message) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

}
