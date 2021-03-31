import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Admin, ApiResponse } from '../../../../models';
import { Admins } from '../../../../providers';
import { getFullname } from '../../../../helpers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  searchForm: FormGroup;
  queryForm: FormGroup;
  currentRecords: Array<Admin> = [];
  getName = getFullname;
  dirty = false;
  searchMark: String = '?';
  loading = true;
  confirmDelete:boolean = false;

  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;

  currentRecord: Admin | null;

  monitorRecords = () => {
    setTimeout(() => {
      this.currentRecords = this.admins.query();
      if (this.currentRecords.length === 0) { this.monitorRecords(); }
      this.loading = false;
    }, 3000);
  }

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public admins: Admins) {
    this.currentRecords = this.admins.query();
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
    this.monitorRecords();
  }

  async search(data) {
    const queryString = `?q=${data.searchString}`; // queryString
    this.admins.recordRetrieve(queryString).then((res: ApiResponse) => {
      if (res.success) {
        this.currentRecords = this.admins.query();
        this.showNotification(`${res.payload.length} record(s) found!`);
      }
    }).catch(err => {
      this.showNotification(err);
    });
  }

  getRecords(){
    this.loading = true;
    let query = ``;

    this.admins.recordRetrieve(query).then(res => {
      if(res.success){
        this.currentRecords = res.payload;
        this.loading = false;
        this.showNotification(res.message);
      }
    }).catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
  }

  openSidebar(activePanel: string, status: string, record: Admin | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.alwayOpenSidebar = `${status}-${+new Date}`;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Admin`;
    this.currentRecord = record;
  }

  goToDetail(record: any): void {
    this.router.navigate([`people/admin/detail/${record.id}`]);
    return;
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
    this.loading = true;
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
    const result = await this.admins.recordRetrieve(searchQuery);
    if (result.success) {
      this.currentRecords = result.payload;
      this.showNotification(`(${result.payload.length}) records found`);
    } else {
      this.showNotification(result.message);
    }
    this.loading = false;
  }

  openModal(record: Admin): void {
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

  deleteRecord(record: Admin){
    if(record == null || undefined){
      this.showNotification('Cannot delete an empty record');
      return;
    }

    this.admins.recordDelete(record).then(res => {
      if(res.success){
        this.showNotification(res.message);
      }
    }).catch( err => {
      this.showNotification(err);
    })
  }
}
