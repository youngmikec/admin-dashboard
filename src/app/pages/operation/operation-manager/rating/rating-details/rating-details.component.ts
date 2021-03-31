import { Component, OnInit, Input } from '@angular/core';
import { getFullname } from '../../../../../helpers';

@Component({
  selector: 'app-rating-details',
  templateUrl: './rating-details.component.html',
  styleUrls: ['./rating-details.component.css']
})
export class RatingDetailsComponent implements OnInit {
  @Input() record: any;
  getFullname = getFullname;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
