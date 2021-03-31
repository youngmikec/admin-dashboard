import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Deposit } from '../../../../../models';
import { Deposits } from '../../../../../providers';
import { genCode, deepPropsExist, isEmpty, getFullname } from '../../../../../helpers';


@Component({
  selector: 'app-deposit-edit',
  templateUrl: './deposit-edit.component.html',
  styleUrls: ['./deposit-edit.component.scss']
})
export class DepositEditComponent implements OnInit {
  @Input() record: Deposit | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();
  deepPropsExist = deepPropsExist;
  isEmpty = isEmpty;

  updateForm: FormGroup;
  loading: boolean = false;
  currentRecord: Deposit;
  currentRecords: Array<Deposit> = [];

  constructor(
    private deposits: Deposits,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
  }

  monitorRecords = () => {
    setTimeout(() => {
      if (this.currentRecords.length < 1) {
        this.currentRecords = this.deposits.query();
        this.monitorRecords();
      }
    }, 2000);
  }

  ngOnInit(): void {
    this.monitorRecords();
    this.loading = false;
    if (!isEmpty(this.record)) {
      console.log(this.record);
      this.setUpdateForm();
    }

  }

  createForm(){
    this.updateForm = this.formBuilder.group({
      type:         [null],
      amount:       [null],
      description:  [null],
      userTo:       [null],
      walletTo:     [null],
      status:       [null],
      narration:    [null]
    })
  }

  setUpdateForm(){
    this.updateForm.patchValue({
      type: deepPropsExist(this.record, 'type') ? this.record.type : null,
      amount: deepPropsExist(this.record, 'amount') ? this.record.amount : null,
      description: deepPropsExist(this.record, 'description') ? this.record.description : null,
      userTo: deepPropsExist(this.record, 'userTo') ? getFullname(this.record.userTo) : null,
      walletTo: deepPropsExist(this.record, 'walletTo') ? this.record.walletTo : null,
      status: deepPropsExist(this.record, 'status') ? this.record.status : null,
      narration: deepPropsExist(this.record, 'narration') ? this.record.narration : null,
    });
  }

  onSubmit(){
    const payload = this.updateForm.value;
    console.log(payload);
    payload.userTo = this.record.userTo.id;
    this.loading = true;
    this.deposits.recordUpdate(this.record, payload).then(res => {
      if(res.success){
        this.showNotification(`${res.message}`);
        this.loading = false;
      }
    }).catch(err => {
      this.showNotification(`${err}`);
      this.loading = false;
    })

    this.loading = false;
  }


  showNotification(message: string){
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    }); 
  }


  packageModal(): void {
    // this.getTerminalOptions();
    const deleteModal =  $('#deleteModal');
    deleteModal.attr('aria-modal', 'true');
    deleteModal.removeAttr('aria-hidden');
    deleteModal.addClass('show');
  }
  /**
   * @description "Handle close modal"
   */
  closeModal(): void {
    const deleteModal =  $('#deleteModal');
    deleteModal.attr('aria-hidden', 'true');
    deleteModal.removeAttr('aria-modal');
    deleteModal.removeClass('show');
  }

}

