import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upgrade-details',
  templateUrl: './upgrade-details.component.html',
  styleUrls: ['./upgrade-details.component.css']
})
export class UpgradeDetailsComponent implements OnInit {
  @Input() record: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    console.log('this is working');
  }

}
