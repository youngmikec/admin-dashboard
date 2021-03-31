
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mail } from '../../../../../models';
import { Mails } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mail-add',
  templateUrl: './mail-add.component.html',
  styleUrls: ['./mail-add.component.css']
})
export class MailAddComponent implements OnInit {

  constructor(
    private mails: Mails,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
