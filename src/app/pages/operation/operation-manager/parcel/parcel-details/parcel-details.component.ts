import { Component, OnInit, Input } from '@angular/core';
import { getFullname } from '../../../../../helpers';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css']
})
export class ParcelDetailsComponent implements OnInit {
  @Input() record: any;
  getFullname = getFullname;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
