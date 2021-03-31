import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { isEmpty, deepPropsExist, getFullname } from '../../../../../helpers';
import { User } from '../../../../../models';
import { Users } from '../../../../../providers'


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  @Input() record: User | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();
  addForm: FormGroup;

  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private users: Users,
    private toastr: ToastrService) {
      this.createForm(); 
}

ngOnInit() {
  // if (!isEmpty(this.record)) {
  //   console.log(this.record);
  //   this.setUpdateForm();
  // }
}

createForm() {
  this.addForm = this.formBuilder.group({
    surname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]

  });
}

  // setUpdateForm(){
  //   this.updateForm.patchValue({
  //     title: deepPropsExist(this.record, 'title') ? this.record.title : null,
  //     surname: deepPropsExist(this.record, 'surname') ? this.record.surname : null,
  //     firstName: deepPropsExist(this.record, 'firstName') ? this.record.firstName : null,
  //     middleName: deepPropsExist(this.record, 'middleName') ? this.record.middleName : null,
  //     lastName: deepPropsExist(this.record, 'lastName') ? this.record.lastName : null,
  //     gender: deepPropsExist(this.record, 'gender') ? this.record.gender : null,
  //     birthDate: deepPropsExist(this.record, 'birthDate') ? this.record.birthDate : null,
  //     address: deepPropsExist(this.record, 'address') ? this.record.address : null,
  //     state: deepPropsExist(this.record, 'state') ? this.record.state : null,
  //     county: deepPropsExist(this.record, 'county') ? this.record.county : null,
  //     country: deepPropsExist(this.record, 'country') ? this.record.country : null,
  //     // wallet: deepPropsExist(this.record, 'wallet') ? this.record.wallet : null,
      
  //   });
  // }


onSubmit() {
  this.loading = true;
  const payload = this.addForm.value;

  if (this.addForm.invalid) {
  this.showNotification('Invalid form! Please fill all the required* inputs.');
  this.loading = false;
  return;
  }

  if(this.confirmPassword(payload.password, payload.confirmPassword)){
    delete payload.confirmPassword;
    this.users.recordCreate(payload).then(res => {
    if(res.success){
      this.addForm.reset();
      this.showNotification(`User, ${getFullname(res.payload)}, has been successfully created!`);
      this.changed.emit(true);
    }
    }).catch(error => this.showNotification(error));

  }else{
    this.showNotification('password does not match');
  }
  this.loading = false;
  return;
}

  confirmPassword(pass:string, cfmPass: string){
    return pass === cfmPass ? true : false;
  }


  // onUpdate() {
  //   this.loading = true;
  //   const payload = this.updateForm.value;
  //   if (this.updateForm.invalid) {
  //   this.showNotification('Invalid form! Please fill all the required* inputs.');
  //   this.loading = false;
  //   return;
  //   }
  //   this.users.recordUpdate(this.record, payload).then(res => {
  //   if(res.success){
  //     this.updateForm.reset();
  //     this.showNotification(`User, ${getFullname(this.record)}, has been successfully updated!`);
  //     this.changed.emit(true);
  //   }
  //   }).catch(error => this.showNotification(error));
  //   this.loading = false;
  //   return;
  // }

// get f() {
//   return this.addForm.controls;
// }

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






