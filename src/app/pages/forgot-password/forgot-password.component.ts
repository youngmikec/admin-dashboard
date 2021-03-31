import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Admins } from '../../providers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formLoginHeight: string;
  forgotForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private toastr: ToastrService,
    private admins: Admins) {
    this.forgotForm = this._fb.group({
      'phone': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.formLoginHeight = `calc(50vh - ${+document.getElementById('login-row').clientHeight / 2}px)`;
  }

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit = async () => {
    const payload = this.forgotForm.value;
    if (this.forgotForm.valid) {
      try {
        const result = await this.admins.sendOTP(payload);
        if (result.success) {
          this.showNotification('OTP has been sent to your phone');
        } else {
          this.showNotification(result.message);
        }
      } catch (e) {
        this.showNotification(e.message);
      }
    } else {
      this.showNotification('Please fill out the form correctly');
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
