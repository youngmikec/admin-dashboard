
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../../../../../models';
import { Tracks } from '../../../../../providers';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genCode } from '../../../../../helpers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-track-add',
  templateUrl: './track-add.component.html',
  styleUrls: ['./track-add.component.css']
})
export class TrackAddComponent implements OnInit {

  constructor(
    private tracks: Tracks,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

  }

}
