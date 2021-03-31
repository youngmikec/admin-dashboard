import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
