import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deposit } from '../../../../../models';
import { Deposits } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deposit-add',
  templateUrl: './deposit-add.component.html',
  styleUrls: ['./deposit-add.component.css']
})
export class DepositAddComponent implements OnInit {
  @Input() record: Deposit | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  addForm: FormGroup;
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

  }

  createForm(){
    this.addForm = this.formBuilder.group({
      type:         [null, Validators.required],
      amount:       [null, Validators.required],
      description:  [null, Validators.required],
      userTo:       [null, Validators.required],
      walletTo:     [null, Validators.required],
      status:       [null, Validators.required],
      gateway:       [null, Validators.required],
      narration:    [null]
    })
  }

  onSubmit(){
    const payload = this.addForm.value;
    payload.code = genCode(8);
    payload.trxref = genCode(10);
    console.log(payload);
    this.loading = true;
    this.deposits.recordCreate(payload).then(res => {
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

