
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { genCode, getFullname, getLocalStorage } from '../../../../../helpers';
import { County, Country, State, Parcel, User, Admin } from '../../../../../models';
import { Pickups, Users, Parcels } from '../../../../../providers';


@Component({
  selector: 'app-pickup-add',
  templateUrl: './pickup-add.component.html',
  styleUrls: ['./pickup-add.component.css']
})
export class PickupAddComponent implements OnInit {
  @Input() countyOptions: Array<County>;
  @Input() countryOptions: Array<Country>;
  @Input() stateOptions: Array<State>;
  admin: Admin;
  addForm: FormGroup;
  userForm: FormGroup;
  parcelForm: FormGroup;
  loading: boolean = false;
  senderObject: User = null;
  terminalFrom: any;
  terminalTo: any;
  parcelOptions: Array<Parcel> = [];
  selectedParcels: Array<string> = [];
  currentParcel: Parcel;


  constructor(
    private pickups: Pickups,
    private parcels: Parcels,
    private users: Users,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.admin = getLocalStorage('user')
    this.setAllForms();
    this.getParcels();
  }

  ngOnInit(): void {

  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      address: ['', Validators.required],
      terminalFrom: [''],
      terminalTo: [''],
      country: ['Ng']
    })
  }
  createUserForm(){
    this.userForm = this.formBuilder.group({
      sender: ['']
    });
  }
  createParcelForm(){
    this.parcelForm = this.formBuilder.group({
      parcels: ['']
    });
  }

  setAllForms(){
    this.createAddForm();
    this.createParcelForm();
    this.createUserForm();
  }

  onSubmit(){
    this.loading = true;
    let payload = this.addForm.value;
    payload.sender = this.senderObject.id;
    payload.parcels = this.selectedParcels;
    payload.terminalTo = {
      type: "Point",
      coordinates: [
          0,
          0
      ],
      _id: "60253f2c4ce951687f7cabb2",
      address: "Test"
  }
payload.terminalFrom = {
      type: "Point",
      coordinates: [
          0,
          0
      ],
      _id: "60262e83ec6a22687d0cfab7",
      address: "Test2"
  }
    console.log(payload);

    this.pickups.recordCreate(payload).then( res => {
      if(res.success){
        console.log(res.payload)
        this.showNotification(res.message);
        this.loading = false;
      }
    }).catch(err => {
      this.showNotification(err);
    })
    this.loading = false;
  }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
    timeOut: 8000,
    closeButton: true,
    enableHtml: true,
    toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  getParcels(){
    let query = `?createdBy=${this.admin.id}`;
    this.parcels.recordRetrieve().then(res => {
      if(res.success){
        this.parcelOptions = res.payload;
      }
    }).catch(err => {
      this.showNotification('no parcel retrieved');
    })
  }

  getSenderDetail(){
    let userPhone = this.userForm.value;
    console.log(userPhone);
    let query = `?phone=${userPhone.sender}`;
    if(userPhone.sender == null){
      this.showNotification('input cannot be empty');
      return;
    }
    this.users.recordRetrieve(query).then( res => {
      if(res.success && res.payload.length > 0){
        this.senderObject = res.payload[0];
        console.log('senderObject', this.senderObject);
        this.userForm = this.formBuilder.group({
          sender: getFullname(this.senderObject)
        })
        this.showNotification('Sender found');
      }
    }).catch(err => {
      this.senderObject = null;
      this.showNotification('Sender not found with Phone number');
      console.log(err);
    })
  }

  addParcel($event){
    $event.preventDefault();
    let payload = this.parcelForm.value;
    this.selectedParcels.push(payload.parcels);
    console.log('selected', this.selectedParcels);
    // this.addForm = this.formBuilder.group({
    //   parcels: ['']
    // });
  }

}
