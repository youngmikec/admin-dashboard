
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rating } from '../../../../../models';
import { Ratings } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rating-add',
  templateUrl: './rating-add.component.html',
  styleUrls: ['./rating-add.component.css']
})
export class RatingAddComponent implements OnInit {

  constructor(
    private ratings: Ratings,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
