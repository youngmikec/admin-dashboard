import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getFullname } from '../../../../helpers';
import { Vehicle } from '../../../../models';
import { Vehicles } from '../../../../providers';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  loading: boolean = false;
  dirty: boolean = false;
  searchMark: string = '?';
  queryForm: FormGroup;
  getFullname = getFullname;
  
  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;
  confirmDelete: boolean = false;
  currentDeleteRecord: Vehicle;
  currentRecord: Vehicle;
  currentRecords: Array<Vehicle> = [];

  constructor(
    private toastr: ToastrService,
    private vehicles: Vehicles,
    private formBuilder: FormBuilder
  ) {
    this.setQueryForm();
    this.getRecords();
   }

  ngOnInit(): void {

  }

  getRecords(){
    let query = `?populate=user`;
    this.vehicles.recordRetrieve(query).then(res =>{
      if(res.success){
        this.currentRecords = res.payload;
        console.log(this.currentRecords);
        this.showNotification(res.message);
      }
    }).catch(err =>{
      this.showNotification(err);
    })
  }

  setQueryForm(){
    this.queryForm = this.formBuilder.group({
      code: [''],
      type: [''],
      status: [''],
    });
  }

  queryRecord() {
    this.loading = true;
    const queryData = this.queryForm.value;
    let searchQuery = '';
   
    if (queryData.code !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}code=${queryData.code}`;
    }
    if (queryData.type !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}type=${queryData.type.toUpperCase()}`;
    }
    if (queryData.status !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}status=${queryData.status.toUpperCase()}`;
    }
    this.searchMark = '?'; this.dirty = false;

    this.vehicles.recordRetrieve(searchQuery).then(res =>{
      if (res.success) {
        this.currentRecords = res.payload;
        this.showNotification(`(${res.payload.length}) records found`);
      } else {
        this.showNotification(res.message);
      }
      this.loading = false;

    })
  }

  openSidebar(activePanel: string, status: string, record: any | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.alwayOpenSidebar = `${status}-${+new Date}`;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Vehicle`;
    this.currentRecord = record;
  }


  closeSidebar($event) {
    console.log('$event', $event);
  }

  openAddSidebar(): void {
    this.openSidebar('forms', 'create', null)
  }

  openViewSidebar(record: any = ""): void {
    this.openSidebar('view', 'view', record);
  }

  openEditSidebar(record: any = ""): void {
    this.openSidebar('forms', 'edit', record);
  }

  openModal(record: Vehicle): void {
    this.currentRecord = record;
    this.confirmDelete = true;
    const deleteModal =  $('#deleteModal');
    deleteModal.attr('aria-modal', 'true');
    deleteModal.removeAttr('aria-hidden');
    deleteModal.addClass('show');
    console.log(deleteModal);
  }

  /**
   * @description "Handle close modal"
   */
  closeModal(): void {
    const deleteModal =  $('#deleteModal');
    deleteModal.attr('aria-hidden', 'true');
    deleteModal.removeAttr('aria-modal');
    deleteModal.removeClass('show');
    this.confirmDelete = false;
    this.currentRecord = null;
  }

  deleteRecord(record: Vehicle){
    if(record == null || undefined){
      this.showNotification('Cannot delete an empty record');
      return;
    }

    this.vehicles.recordDelete(record).then(res => {
      if(res.success){
        this.showNotification(res.message);
        this.closeModal();
        this.getRecords();
      }
    }).catch( err => {
      this.showNotification(err);
    })
  }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
    timeOut: 8000,
    closeButton: true,
    enableHtml: true,
    toastClass: 'alert alert-primary alert-with-icon',
    });
  }
}












