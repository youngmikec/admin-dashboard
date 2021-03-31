import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-county-details',
  templateUrl: './county-details.component.html',
  styleUrls: ['./county-details.component.css']
})
export class CountyDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
