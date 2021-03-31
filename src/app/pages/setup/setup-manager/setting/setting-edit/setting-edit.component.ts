import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Setting } from '../../../../../models';
import { Settings } from '../../../../../providers';
import { deepPropsExist } from '../../../../../helpers';


@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.scss']
})
export class SettingEditComponent implements OnInit {
  @Input() record: any;
  loading: boolean = false;
  editForm: FormGroup;
  constructor(
    private settings: Settings,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,

  ) { 
    this.createEditForm();
  }

  ngOnInit() {
    this.setEditForm();
  }

  createEditForm(){
    this.editForm = this.formBuilder.group({
      name:         [''],
      type:         [''],
      value:        [''],
      description:  [''],
      isPublic:     [''],
    })
  }
  setEditForm(){
    this.editForm = this.formBuilder.group({
      name:  deepPropsExist(this.record, 'name') ? this.record.name : null,
      type: deepPropsExist(this.record, 'type') ? this.record.type : null,
      value: deepPropsExist(this.record, 'value') ? this.record.value : null,
      isPublic: deepPropsExist(this.record, 'isPublic') ? this.record.isPublic : null,
      description: deepPropsExist(this.record, 'description') ? this.record.description : null,
    });
  }

  onSubmit(){
    const payload = this.editForm.value;
    if(payload.isPublic == "TRUE"){
      payload.isPublic = true;
    }else{
      payload.isPublic = false;
    }
    this.loading = true;
    this.settings.recordUpdate(this.record, payload).then( res => {
      if(res.success){
        this.loading = false;
        this.showNotification(res.message);
      }
    }).catch( err => {
      this.loading = false;
      this.showNotification(err);
    });
  }

  showNotification(message) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }


}
