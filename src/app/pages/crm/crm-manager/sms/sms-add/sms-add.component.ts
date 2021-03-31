
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sms } from '../../../../../models';
import { Smses } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sms-add',
  templateUrl: './sms-add.component.html',
  styleUrls: ['./sms-add.component.css']
})
export class SmsAddComponent implements OnInit {

  constructor(
    private smses: Smses,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
