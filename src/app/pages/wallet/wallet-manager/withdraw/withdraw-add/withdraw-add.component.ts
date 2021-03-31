import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Withdraw } from '../../../../../models';
import { Withdraws } from '../../../../../providers';
import { genCode } from '../../../../../helpers';


@Component({
  selector: 'app-withdraw-add',
  templateUrl: './withdraw-add.component.html',
  styleUrls: ['./withdraw-add.component.css']
})
export class WithdrawAddComponent implements OnInit {
  @Input() record: Withdraw | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  addForm: FormGroup;
  loading: boolean = false;
  currentRecord: Withdraw;
  currentRecords: Array<Withdraw> = [];

  constructor(
    private withdraws: Withdraws,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
  }


  ngOnInit(): void {

  }

  createForm(){
    this.addForm = this.formBuilder.group({
      amount:         [null, Validators.required],
      userFrom:       [null, Validators.required],
      description:    [null, Validators.required],
      walletFrom:     [null, Validators.required],
      narration:      [null],
      status:         [null],
      withdraw:       [null],
      charge:         [null],
      bankName:       [null],
      bankUserNumber: [null],
      bankUserName:   [null],
      remark:         [null]
    });
  }



  onSubmit(){
    const payload = this.addForm.value;
    payload.code = genCode(8);
    console.log(payload);
    this.loading = true;
    this.withdraws.recordCreate(payload).then(res => {
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


