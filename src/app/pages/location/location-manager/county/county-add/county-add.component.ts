
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { County } from '../../../../../models';
import { Counties } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-county-add',
  templateUrl: './county-add.component.html',
  styleUrls: ['./county-add.component.css']
})
export class CountyAddComponent implements OnInit {

  constructor(
    private counties: Counties,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
