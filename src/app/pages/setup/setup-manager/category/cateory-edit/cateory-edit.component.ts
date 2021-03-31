import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../../models';
import { deepPropsExist } from '../../../../../helpers';

@Component({
  selector: 'app-cateory-edit',
  templateUrl: './cateory-edit.component.html',
  styleUrls: ['./cateory-edit.component.css']
})
export class CateoryEditComponent implements OnInit {
  @Input() record: Category | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  categoryEditForm: FormGroup;
  loading: boolean = false;
  currentRecords: Array<Category>;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createCategorForm();
   }

  ngOnInit(): void {
  }

  createCategorForm(){
    this.categoryEditForm = this.formBuilder.group({
      parent: [null],
      name: [null, Validators.required],
      cost: [null],
      description: [null, Validators.required]

    })
  }

  setForm() {
    this.categoryEditForm = this.formBuilder.group({
      name:  deepPropsExist(this.record, 'parent') ? this.record.parent : null,
      make: deepPropsExist(this.record, 'name') ? this.record.name : null,
      mass: deepPropsExist(this.record, 'cost') ? this.record.cost : null,
      description: deepPropsExist(this.record, 'description') ? this.record.description : null,
    });
  }

  onSubmit(){
    console.log('submitted');
  }
}
