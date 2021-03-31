
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shipment } from '../../../../../models';
import { Shipments } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shipment-add',
  templateUrl: './shipment-add.component.html',
  styleUrls: ['./shipment-add.component.css']
})
export class ShipmentAddComponent implements OnInit {

  constructor(
    private shipments: Shipments,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
