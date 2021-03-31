
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transfer } from '../../../../../models';
import { Transfers } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transfer-add',
  templateUrl: './transfer-add.component.html',
  styleUrls: ['./transfer-add.component.css']
})
export class TransferAddComponent implements OnInit {

  constructor(
    private transfers: Transfers,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
