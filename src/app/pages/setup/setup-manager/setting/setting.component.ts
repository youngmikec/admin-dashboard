import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Setting, ApiResponse } from '../../../../models';
import { Settings } from '../../../../providers';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;

  queryForm: FormGroup;
  searchMark: string = '?';
  dirty: boolean = false;
  currentRecord: Setting;
  currentRecords: Array<Setting> = [];
  loading = false;
  confirmDelete: boolean = false;

  monitorRecords = () => {
    setTimeout(() => {
      if (this.currentRecords.length < 1) {
        this.currentRecords = this.settings.query();
        this.monitorRecords(); }
    }, 3000);
  }

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public settings: Settings) {
      this.setQueryForm();
      this.currentRecords = this.settings.query();
    }

    ngOnInit() {
      this.monitorRecords();
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.settings.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.settings.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err);
      });
    }

    getRecords(){
      let query = `?sort=-createdAt`;
      this.settings.recordRetrieve(query).then(res =>{
        if(res.success){
          this.currentRecords = res.payload;
          this.showNotification(res.message);
        }
      }).catch(err =>{
        this.showNotification(err);
      })
    }

    setQueryForm(){
      this.queryForm = this.formBuilder.group({
        name:     [''],
        type:     [''],
        value:    [''],
        isPublic: ['']
      });
    }
  
    queryRecord() {
      this.loading = true;
      const queryData = this.queryForm.value;
      let searchQuery = '';
      if (queryData.name !== '') {
        this.dirty === false ? this.dirty = true : this.searchMark = '&';
        searchQuery += `${this.searchMark}name=${queryData.name}`;
      }
      if (queryData.type !== '') {
        this.dirty === false ? this.dirty = true : this.searchMark = '&';
        searchQuery += `${this.searchMark}type=${queryData.type}`;
      }
      if (queryData.value !== '') {
        this.dirty === false ? this.dirty = true : this.searchMark = '&';
        searchQuery += `${this.searchMark}value=${queryData.value}`;
      }
      if (queryData.isPublic !== '') {
        this.dirty === false ? this.dirty = true : this.searchMark = '&';
        searchQuery += `${this.searchMark}isPublic=${queryData.isPublic}`;
      }
      this.searchMark = '?'; this.dirty = false;
  
      this.settings.recordRetrieve(searchQuery).then(res =>{
        if (res.success) {
          this.currentRecords = res.payload;
          this.showNotification(`(${res.payload.length}) records found`);
        } else {
          this.showNotification(res.message);
        }
        this.loading = false;
  
      })
    }

    goToDetail(record: any): void {
      this.router.navigate([`setting/detail/${record.id}`]);
      return;
    }


    openSidebar(activePanel: string, status: string, record: any | null) {
      this.sidebarView = activePanel;
      this.sidebarContent = status;
      this.alwayOpenSidebar = `${status}-${+new Date}`;
      this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Bank`;
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


    openModal(record: Setting): void {
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

    deleteRecord(record: Setting){
      if(record == null || undefined){
        this.showNotification('Cannot delete an empty record');
        return;
      }

      this.settings.recordDelete(record).then(res => {
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
      this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }
}
