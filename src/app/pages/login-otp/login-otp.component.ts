import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit {
  formLoginHeight: string;
  loginForm: FormGroup;
  loading = false;

  constructor(private _fb: FormBuilder,
              private toastr: ToastrService,
              private authService: AuthService) {
    this.formLoginHeight = `calc(50vh - ${+document.getElementById('login-row').clientHeight / 2}px)`;
    this.loginForm = this._fb.group({
      'phone': ['', Validators.required],
      'otp': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit = async () => {
    const currentElm = $('button.hovering.ld-over');
    const form = this.loginForm.value;
    try {
      await this.authService.postLogin(form, currentElm);
    } catch (e) {
      this.showNotification(e.message);
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
