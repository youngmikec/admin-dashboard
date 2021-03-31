import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getFullname } from '../../../../helpers';
import { Upgrade, ApiResponse } from '../../../../models';
import { Upgrades } from '../../../../providers';


@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;
  confirmDelete: boolean = false;


  searchForm: FormGroup;
  queryForm: FormGroup;
  currentRecord: Upgrade;
  currentRecords: Array<Upgrade> = [];
  getName = getFullname;
  loading = false;
  dirty = false;
  searchMark: String = '?';
  queryLoading: Boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public upgrades: Upgrades) {
    this.currentRecords = this.upgrades.query();
    this.queryForm = this.formBuilder.group({
      surname: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    });
    this.searchForm = this.formBuilder.group({
      searchString: ['', Validators.required],
    });
    this.getRecords();
  }

  ngOnInit() {
    // this.monitorRecords();
  }

  search(data) {
    const queryString = `?q=${data.searchString}`; // queryString
    console.log(data);
    this.upgrades.recordRetrieve(queryString).then((res: ApiResponse) => {
      if (res.success) {
        this.currentRecords = this.upgrades.query();
        this.showNotification(`${res.payload.length} record(s) found!`);
      }
    }).catch(err => {
      this.showNotification(err);
    });
  }

  monitorRecords = () => {
    setTimeout(() => {
      this.currentRecords =  this.getRecords()
      if (!(this.currentRecords.length > 1)) { this.monitorRecords(); }
    }, 3000);
  }

  getRecords(){
    this.loading = true;
    let query = ``;
    this.upgrades.recordRetrieve(query).then( res => {
      if(res.success){
        this.currentRecords = res.payload;
        console.log(this.currentRecords);
        this.loading = false;
        this.showNotification(res.message);
      }
    }).catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
    return this.currentRecords;
  }

  goToDetail(record: any): void {
    this.router.navigate([`people/user/detail/${record.id}`]);
    return;
  }

  removeRecord(record) {
    console.log(record.id);
  }

  openSidebar(activePanel: string, status: string, record: Upgrade | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.alwayOpenSidebar = `${status}-${+new Date}`;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} User`;
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

  openModal(record: Upgrade): void {
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

  deleteRecord(record: Upgrade){
    if(record == null || undefined){
      this.showNotification('Cannot delete an empty record');
      return;
    }

    this.upgrades.recordDelete(record).then(res => {
      if(res.success){
        this.showNotification(res.message);
      }
    }).catch( err => {
      this.showNotification(err);
    })
  }

  showNotification(message) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  queryRecord = async () => {
    this.queryLoading = true;
    const queryData = this.queryForm.value;
    let searchQuery = '';
    if (queryData.email !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}email=${queryData.email}`;
    }
    if (queryData.phone !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}phone=${queryData.phone}`;
    }
    if (queryData.surname !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}surname=${queryData.surname}`;
    }
    if (queryData.lastName !== '') {
      this.dirty === false ? this.dirty = true : this.searchMark = '&';
      searchQuery += `${this.searchMark}lastName=${queryData.lastName}`;
    }
    this.searchMark = '?'; this.dirty = false;
    const result = await this.upgrades.recordRetrieve(searchQuery);
    if (result.success) {
      this.currentRecords = result.payload;
      this.showNotification(`(${result.payload.length}) records found`);
    } else {
      this.showNotification(result.message);
    }
    this.queryLoading = false;
  }
}


