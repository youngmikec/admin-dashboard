import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
