
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { isEmpty, deepPropsExist, getFullname } from '../../../../../helpers';
import { User } from '../../../../../models';
import { Users } from '../../../../../providers'


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() record: User | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();
  updateForm: FormGroup;

  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public users: Users,
    private toastr: ToastrService) {
      this.editForm();
}

ngOnInit() {
  if (!isEmpty(this.record)) {
    console.log(this.record);
    this.setUpdateForm();
  }
}

editForm() {
  this.updateForm = this.formBuilder.group({
    title: [''],
    surname: [''],
    firstName: [''],
    middleName: [''],
    lastName: [''],
    gender: ['M'],
    birthDate: [''],
    address: [''],
    state: [''],
    country: ['NG'],
    type: [''],
    phone: [''],
    email: [''],
    guarantor: [''],
    guarantorAddress: [''],
    guarantorPhone: [''],
    kin: [''],
    kinAddress: [''],
    kinPhone: [''],
    accessLevel: [''],
    accountName: [''],
    accountNumber: [''],
    status: ['PENDING'],
    balance: [''],
    wallet: [''],
    coverage: [''],
    // wallet: [null],
  });
}

setUpdateForm(){
  this.updateForm.patchValue({
    title: deepPropsExist(this.record, 'title') ? this.record.title : null,
    surname: deepPropsExist(this.record, 'surname') ? this.record.surname : null,
    firstName: deepPropsExist(this.record, 'firstName') ? this.record.firstName : null,
    middleName: deepPropsExist(this.record, 'middleName') ? this.record.middleName : null,
    lastName: deepPropsExist(this.record, 'lastName') ? this.record.lastName : null,
    gender: deepPropsExist(this.record, 'gender') ? this.record.gender : null,
    birthDate: deepPropsExist(this.record, 'birthDate') ? this.record.birthDate : null,
    address: deepPropsExist(this.record, 'address') ? this.record.address : null,
    state: deepPropsExist(this.record, 'state') ? this.record.state : null,
    county: deepPropsExist(this.record, 'county') ? this.record.county : null,
    country: deepPropsExist(this.record, 'country') ? this.record.country : null,
    // wallet: deepPropsExist(this.record, 'wallet') ? this.record.wallet : null,
    
  });
}


onUpdate() {
  this.loading = true;
  const payload = this.updateForm.value;
  if (this.updateForm.invalid) {
  this.showNotification('Invalid form! Please fill all the required* inputs.');
  this.loading = false;
  return;
  }
  this.users.recordUpdate(this.record, payload).then(res => {
  if(res.success){
    this.updateForm.reset();
    this.showNotification(`User, ${getFullname(this.record)}, has been successfully updated!`);
    this.changed.emit(true);
  }
  }).catch(error => this.showNotification(error));
  this.loading = false;
  return;
}

get f() {
  return this.updateForm.controls;
}

goBack() {
  this.router.navigate([`user`]);
  // window.history.back();
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







