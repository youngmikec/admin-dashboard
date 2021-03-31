
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../../../models';
import { Notifications } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.css']
})
export class NotificationAddComponent implements OnInit {

  constructor(
    private notifications: Notifications,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
