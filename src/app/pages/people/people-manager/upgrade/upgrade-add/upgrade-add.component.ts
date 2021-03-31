
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Upgrade } from '../../../../../models';
import { Upgrades } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upgrade-add',
  templateUrl: './upgrade-add.component.html',
  styleUrls: ['./upgrade-add.component.css']
})
export class UpgradeAddComponent implements OnInit {

  constructor(
    private upgrades: Upgrades,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
