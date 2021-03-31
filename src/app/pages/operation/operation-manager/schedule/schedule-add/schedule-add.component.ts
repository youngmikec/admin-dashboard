
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Schedule, County, Country, State, Vehicle } from '../../../../../models';
import { Schedules, Counties, Countries, States, Vehicles } from '../../../../../providers';
import { genCode } from '../../../../../helpers';


@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  addForm: FormGroup;
  loading: boolean = false;
  countyOptions: Array<County> = [];
  countryOptions: Array<Country> = [];
  stateOptions: Array<States> = [];
  vehicleOptions: Array<Vehicle> = [];

  constructor(
    private schedules: Schedules,
    private counties: Counties,
    private countries: Countries,
    private states: States,
    private vehicles: Vehicles,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createAddForm();
    this.getAllOptions();
  }

  ngOnInit(): void {

  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      // courier: ['', Validators.required],
      // terminalFrom: ['', Validators.required],
      countyFrom: ['', Validators.required],
      countryFrom: ['', Validators.required],
      stateFrom: ['', Validators.required],
      // terminalTo: ['', Validators.required],
      countyTo: ['', Validators.required],
      countryTo: ['', Validators.required],
      stateTo: ['', Validators.required],
      isFull: ['', Validators.required],
      vehicle: [''],
      volume: [''],
      mass: [''],
      description: ['', Validators.required],
    });
  }

  onSubmit(){
    this.loading = true;
    const payload = this.addForm.value;
    payload.code = genCode(8);
    payload.boardingDate = Date.now();
    console.log(payload);
    this.schedules.recordCreate(payload).then(res => {
      if(res.success){
        this.showNotification(res.message);
        this.loading = false;
      }
    }).catch(err => {
      this.showNotification(err);
      this.loading = false;
    })
  }

  getAllOptions(){
    this.getCounties();
    this.getCountries();
    this.getStates();
    this.getVehicles();
  }

  getCounties(){
    let query = `?populate=state&sort=state`;
    this.counties.recordRetrieve(query).then(res =>{
      if(res.success){
        this.countyOptions = res.payload;
        console.log(this.countyOptions);
      }
    }).catch(err =>{
      console.log(err);
    });
  }
  
  getCountries(){
    this.countries.recordRetrieve().then(res =>{
      if(res.success){
        this.countryOptions = res.payload;
        console.log( this.countryOptions );
      }
    }).catch(err =>{
      console.log(err);
    });
  }
  
  getStates(){
    this.states.recordRetrieve().then(res =>{
      if(res.success){
        this.stateOptions = res.payload;
        console.log(this.stateOptions);
      }
    }).catch(err =>{
      console.log(err);
    });
  }

  getVehicles(){
    this.vehicles.recordRetrieve().then(res =>{
      if(res.success){
        this.vehicleOptions = res.payload;
        console.log(this.vehicleOptions);
      }
    }).catch(err =>{
      console.log(err);
    });
  }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
    timeOut: 8000,
    closeButton: true,
    enableHtml: true,
    toastClass: 'alert alert-primary alert-with-icon',
    });
  }

}
