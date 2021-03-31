import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  
  @Input() record: any;
  @Input() formType: any;
  @Output() changed = new EventEmitter<boolean>();
  
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
