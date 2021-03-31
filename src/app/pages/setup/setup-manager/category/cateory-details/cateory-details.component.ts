import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../../models';

@Component({
  selector: 'app-cateory-details',
  templateUrl: './cateory-details.component.html',
  styleUrls: ['./cateory-details.component.css']
})
export class CateoryDetailsComponent implements OnInit {
  @Input() record: Category | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
