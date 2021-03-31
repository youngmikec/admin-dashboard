import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getFullname } from '../../../../helpers';
import { Withdraw } from '../../../../models';
import { Withdraws } from '../../../../providers';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  loading: boolean = false;
  queryForm: FormGroup;
  dirty: boolean = false;
  searchMark: string = '?';
  getFullname = getFullname;


  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;
  confirmDelete: boolean = false;
  currentDeleteRecord: Withdraw;
  currentRecord: Withdraw;
  currentRecords: Array<Withdraw> = [];

  constructor(
    private toastr: ToastrService,
    private withdraws: Withdraws,
    private formBuilder: FormBuilder
  ) {
    this.setQueryForm();
    this.getRecords();
   }

  ngOnInit(): void {

  }

  setQueryForm(){
    this.queryForm = this.formBuilder.group({
      amount: [''],
      code: [''],
      walletFrom: [''],
      status: [''],
    });
  }

  getRecords(query: string = ''){
    this.withdraws.recordRetrieve(query).then(res =>{
      if(res.success){
        this.currentRecords = res.payload;
        console.log(this.currentRecords);
        this.showNotification(res.message);
      }
    }).catch(err => console.error(err))
  }



  queryRecord() {
    this.loading = true;
    const queryData = this.queryForm.value;
    let searchQuery = '';
   
    if (queryData.amount !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}amount=${queryData.amount}`;
    }
    if (queryData.code !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}code=${queryData.code}`;
    }
    if (queryData.walletFrom !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}walletFrom=${queryData.walletFrom}`;
    }
    if (queryData.status !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}status=${queryData.status}`;
    }
    this.searchMark = '?'; this.dirty = false;

    this.withdraws.recordRetrieve(searchQuery).then(res =>{
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
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} withdraw`;
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

  openModal(record: Withdraw): void {
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

  deleteRecord(record: Withdraw){
    if(record == null || undefined){
      this.showNotification('Cannot delete an empty record');
      return;
    }

    this.withdraws.recordDelete(record).then(res => {
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


