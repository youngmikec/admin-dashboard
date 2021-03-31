import { Component, OnInit, Input } from '@angular/core';
import { getFullname } from '../../../../../helpers';

@Component({
  selector: 'app-pickup-details',
  templateUrl: './pickup-details.component.html',
  styleUrls: ['./pickup-details.component.css']
})
export class PickupDetailsComponent implements OnInit {
  @Input() record: any;
  getFullname = getFullname;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
