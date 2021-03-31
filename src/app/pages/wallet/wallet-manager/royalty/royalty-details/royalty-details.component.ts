import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-royalty-details',
  templateUrl: './royalty-details.component.html',
  styleUrls: ['./royalty-details.component.css']
})
export class RoyaltyDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
