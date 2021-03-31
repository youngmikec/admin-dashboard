
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bonus } from '../../../../../models';
import { Bonuses } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bonus-add',
  templateUrl: './bonus-add.component.html',
  styleUrls: ['./bonus-add.component.css']
})
export class BonusAddComponent implements OnInit {
  @Input() record: Bonus | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  addForm: FormGroup;
  loading: boolean = false;
  currentRecord: Bonus;
  currentRecords: Array<Bonus> = [];

  constructor(
    private bonuses: Bonuses,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
  }

  monitorRecords = () => {
    setTimeout(() => {
      if (this.currentRecords.length < 1) {
        this.currentRecords = this.bonuses.query();
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
      name: ['', Validators.required],

    })
  }

  onSubmit(){
    const payload = this.addForm.value;
    payload.code = genCode(8);
    console.log(payload);
    this.loading = true;
    this.bonuses.recordCreate(payload).then(res => {
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
