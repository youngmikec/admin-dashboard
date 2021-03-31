import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getFullname } from '../../../../helpers';
import { Shipment } from '../../../../models';
import { Shipments } from '../../../../providers';


@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {
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
  currentDeleteRecord: Shipment;
  currentRecord: Shipment;
  currentRecords: Array<Shipment> = [];

  constructor(
    private toastr: ToastrService,
    private shipments: Shipments,
    private formBuilder: FormBuilder
  ) {
    this.setQueryForm();
    this.getRecords();
   }

  ngOnInit(): void {

  }

  getRecords(){
    let query = `?populate=courier`;
    this.shipments.recordRetrieve(query).then(res =>{
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
      status: [''],
      createdAt: [''],
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
    if (queryData.status !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}status=${queryData.status}`;
    }
    if (queryData.createdAt !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}createdAt=${queryData.createdAt}`;
    }
    this.searchMark = '?'; this.dirty = false;

    this.shipments.recordRetrieve(searchQuery).then(res =>{
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
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Shipment`;
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

  openModal(record: Shipment): void {
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

  deleteRecord(record: Shipment){
    if(record == null || undefined){
      this.showNotification('Cannot delete an empty record');
      return;
    }

    this.shipments.recordDelete(record).then(res => {
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











