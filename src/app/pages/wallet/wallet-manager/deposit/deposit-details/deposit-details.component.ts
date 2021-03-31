import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { getFullname } from '../../../../../helpers';



@Component({
  selector: 'app-deposit-details',
  templateUrl: './deposit-details.component.html',
  styleUrls: ['./deposit-details.component.css']
})
export class DepositDetailsComponent implements OnInit {
  
  @Input() record: any;
  @Input() formType: any;
  @Output() changed = new EventEmitter<boolean>();

  getFullname = getFullname;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    // this.router.navigate('')
    console.log('gone back');
  }

}
