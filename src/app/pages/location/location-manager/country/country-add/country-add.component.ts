
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../../../../../models';
import { Countries } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  constructor(
    private countries: Countries,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
