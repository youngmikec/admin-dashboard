import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lien-details',
  templateUrl: './lien-details.component.html',
  styleUrls: ['./lien-details.component.css']
})
export class LienDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
