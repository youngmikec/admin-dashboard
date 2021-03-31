import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../../models';
import { Categories } from '../../../../../providers';
import { genCode } from '../../../../../helpers';


@Component({
  selector: 'app-cateory-add',
  templateUrl: './cateory-add.component.html',
  styleUrls: ['./cateory-add.component.css']
})
export class CateoryAddComponent implements OnInit {
  @Input() record: Category | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  categoryAddForm: FormGroup;
  loading: boolean = false;
  currentRecord: Category;
  currentRecords: Array<Category> = [];

  constructor(
    private Categories: Categories,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
  }

  monitorRecords = () => {
    setTimeout(() => {
      if (this.currentRecords.length < 1) {
        this.currentRecords = this.Categories.query();
        this.monitorRecords();
      }
    }, 2000);
  }

  ngOnInit(): void {
    this.monitorRecords();
    this.loading = false;

  }

  createForm(){
    this.categoryAddForm = this.formBuilder.group({
      name:       [null, Validators.required],
      cost:       [null, Validators.required],
      description:[null, Validators.required],
      parent:     [null]
    })
  }

  onSubmit(){
    const payload = this.categoryAddForm.value;
    payload.code = genCode(8);
    console.log(payload);
    this.loading = true;
    this.Categories.recordCreate(payload).then(res => {
      if(res.success){
        this.showNotification(`${res.message}`);
        this.loading = false;
      }
    }).catch(err => {
      this.showNotification(`${err}`);
      this.loading = false;
    })
  }

  showNotification(message: string){
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    }); 
  }

}
