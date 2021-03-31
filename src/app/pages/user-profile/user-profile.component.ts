import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Admin } from '../../models';
import { Admins } from '../../providers';
import { AuthService } from '../../services';
import { getDeepObjValue } from '../../helpers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  searchForm: FormGroup;
  user: Admin;
  userImage: string;
  editForm: FormGroup;

  constructor(authServive: AuthService,
    private admins: Admins,
    private toastr: ToastrService,
    private _fb: FormBuilder) {
    this.user = authServive.getUser();
  }

  ngOnInit() {
    this.createForm();
    this.setForm();
    if (this.user.gender === 'F') {
      this.userImage = `/assets/img/female-avatar.png`;
    } else {
      this.userImage = `/assets/img/male-avatar.png`;
    }
  }

  createForm() {
    this.editForm = this._fb.group({
      otherName: [''],
      surname: [''],
      email: [''],
      address: [''],
      phoneHome: [''],
      country: ['']
    });
  }

  setForm = () => {
    this.editForm.patchValue({
      email: getDeepObjValue(this.user, 'email') ? this.user.email : '',
      lastName: getDeepObjValue(this.user, 'lastName') ? this.user.lastName : '',
      surname: getDeepObjValue(this.user, 'surname') ? this.user.surname : '',
      address: getDeepObjValue(this.user, 'address') ? this.user.address : '',
      phoneHome: getDeepObjValue(this.user, 'phoneHome') ? this.user.phoneHome : '',
      country: getDeepObjValue(this.user, 'country') ? this.user.country : ''
    });
  }

  updateProfile = async () => {
    const payload = this.editForm.value;
    console.log(payload);
    try {
      const updateAdmin = await this.admins.recordUpdate(this.user, payload);
      if (updateAdmin.success) {
        this.showNotification(updateAdmin.message);
      } else {
        this.showNotification(updateAdmin.message);
      }
    } catch (err) {
      this.showNotification(err);
    }
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
