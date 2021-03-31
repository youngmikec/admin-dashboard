import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../../../../models';
import { Photos } from '../../../../providers';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private photos: Photos
  ) {
    
   }

  ngOnInit(): void {

  }
  
}

