import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-withdraw-details',
  templateUrl: './withdraw-details.component.html',
  styleUrls: ['./withdraw-details.component.css']
})
export class WithdrawDetailsComponent implements OnInit {
  
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
