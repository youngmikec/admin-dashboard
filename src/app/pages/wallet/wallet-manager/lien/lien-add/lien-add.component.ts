
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lien } from '../../../../../models';
import { Liens } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lien-add',
  templateUrl: './lien-add.component.html',
  styleUrls: ['./lien-add.component.css']
})
export class LienAddComponent implements OnInit {

  constructor(
    private liens: Liens,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
