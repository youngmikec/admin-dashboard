import { Component, OnInit, Input } from '@angular/core';
import { getFullname } from '../../../../../helpers';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {
  @Input() record: any;
  getFullname = getFullname;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
