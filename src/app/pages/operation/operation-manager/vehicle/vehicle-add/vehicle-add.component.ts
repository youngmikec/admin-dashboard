
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../../../../../models';
import { Vehicles } from '../../../../../providers';
import { genCode } from '../../../../../helpers';


@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  @Input() record: any;
  @Input() formType: any;
  @Output() changed: any = new EventEmitter()

  addForm: FormGroup;
  loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private vehicles: Vehicles,
    private router: Router,
    private toastr: ToastrService) {
      this.createForm();
   }

  ngOnInit(): void {

  }

  createForm(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      make: ['', Validators.required],
      mass: ['', Validators.required],
      color: ['', Validators.required],
      volume: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', [Validators.minLength(15), Validators.required]],
      plateNumber: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      photo: [''],
      isHealthy: [''],
      remark: ['', Validators.required],
    })
  }

  onSubmit(){
    this.loading = true;
    let payload = this.addForm.value;
    payload.code = genCode(8);
    payload.isHealthy = payload.ishealthy == 'YES' ? true : false;
    payload.isActive = false;
    
    console.log(payload.ishealthy);

    this.vehicles.recordCreate(payload).then(res =>{
      if(res.success){
        this.showNotification(res.message);
        this.addForm.reset();
        this.loading = false;
      }
    }).catch(err =>{
      this.showNotification(err);
      this.loading;
    })
  }

  showNotification(message: string){
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    }); 
  }

}
