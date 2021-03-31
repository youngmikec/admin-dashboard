import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bonus-details',
  templateUrl: './bonus-details.component.html',
  styleUrls: ['./bonus-details.component.css']
})
export class BonusDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
