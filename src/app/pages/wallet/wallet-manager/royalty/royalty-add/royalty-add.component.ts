
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Royalty } from '../../../../../models';
import { Royalties } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-royalty-add',
  templateUrl: './royalty-add.component.html',
  styleUrls: ['./royalty-add.component.css']
})
export class RoyaltyAddComponent implements OnInit {

  constructor(
    private royalties: Royalties,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

}
