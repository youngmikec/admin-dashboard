import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Admins } from '../../providers';
import { AuthService } from '../../services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  match = true;
  admin: Admin;

  constructor(authService: AuthService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private admins: Admins) {
    this.admin = authService.getUser();
    this.resetForm = this._fb.group({
      'password': ['', [Validators.required]],
      'passwordConfirmation': ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit = async () => {
    const form = this.resetForm.value;
    this.checkPassword();
    delete form.passwordConfirmation;
    try {
      const result = await this.admins.recordUpdate(this.admin, form);
      if (result.success) {
        this.showNotification('You password has been changed');
      } else {
        this.showNotification(result.message);
      }
    } catch (e) {
      this.showNotification(e.message);
    }
  }

  checkPassword() {
    const form = this.resetForm.value;
    form.password !== form.passwordConfirmation ? this.match = false : this.match = true;
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
