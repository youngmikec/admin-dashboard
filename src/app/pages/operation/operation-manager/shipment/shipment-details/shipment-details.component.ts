import { Component, OnInit, Input } from '@angular/core';
import { getFullname } from '../../../../../helpers';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.css']
})
export class ShipmentDetailsComponent implements OnInit {
  @Input() record: any;
  getFullname = getFullname;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
