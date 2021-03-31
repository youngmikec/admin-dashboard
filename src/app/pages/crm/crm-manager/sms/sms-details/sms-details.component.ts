import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.css']
})
export class SmsDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
