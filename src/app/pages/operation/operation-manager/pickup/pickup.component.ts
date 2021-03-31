import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getFullname } from '../../../../helpers';
import { Pickup, County, Country, State } from '../../../../models';
import { Pickups, Counties, Countries, States  } from '../../../../providers';


@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {
  countyOptions: Array<County> = [];
  countryOptions: Array<Country> = [];
  stateOptions: Array<State> = [];

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
  currentDeleteRecord: Pickup;
  currentRecord: Pickup;
  currentRecords: Array<Pickup> = [];

  constructor(
    private toastr: ToastrService,
    private pickups: Pickups,
    private counties: Counties,
    private countries: Countries,
    private states: States,
    private formBuilder: FormBuilder
  ) {
    this.setQueryForm();
    this.getAllOptions();
   }

  ngOnInit(): void {

  }

  getRecords(){
    this.loading = true;
    let query = `?populate=sender,parcels&sort=-createdAt`;
    this.pickups.recordRetrieve(query).then(res =>{
      if(res.success){
        this.currentRecords = res.payload;
        this.showNotification(res.message);
        this.loading = false;
        console.log(this.currentRecords);
      }
    }).catch(err =>{
      this.showNotification(err);
      this.loading = false;
    })
  }

  getAllOptions(){
    this.getRecords();
    this.getCounties();
    this.getCountries();
    this.getStates();
  }

  getCounties(){
    let query = `?populate=state&sort=state`;
    this.counties.recordRetrieve(query).then(res =>{
      if(res.success){
        this.countyOptions = res.payload;
        console.log(this.countyOptions);
      }
    }).catch(err =>{
      console.log(err);
    });
  }
  getCountries(){
    this.countries.recordRetrieve().then(res =>{
      if(res.success){
        this.countryOptions = res.payload;
        console.log(this.countryOptions);
      }
    }).catch(err =>{
      console.log(err);
    });
  }
  getStates(){
    this.states.recordRetrieve().then(res =>{
      if(res.success){
        this.stateOptions = res.payload;
        console.log(this.stateOptions);
      }
    }).catch(err =>{
      console.log(err);
    });
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
      searchQuery += `${this.searchMark}status=${queryData.status.toUpperCase()}`;
    }
    if (queryData.createdAt !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}createdAt=${queryData.createdAt}`;
    }
    this.searchMark = '?'; this.dirty = false;
    console.log(searchQuery);
    this.pickups.recordRetrieve(searchQuery).then(res =>{
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
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Pickup`;
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

  openModal(record: Pickup): void {
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

  deleteRecord(record: Pickup){
    if(record == null || undefined){
      this.showNotification('Cannot delete an empty record');
      return;
    }

    this.pickups.recordDelete(record).then(res => {
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










