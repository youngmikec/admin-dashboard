
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { State } from '../../../../../models';
import { Counties } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-state-add',
  templateUrl: './state-add.component.html',
  styleUrls: ['./state-add.component.css']
})
export class StateAddComponent implements OnInit {

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
