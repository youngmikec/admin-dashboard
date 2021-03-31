import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../models';
import { Categories } from '../../../../providers';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
    loading: boolean = false;
    dirty: boolean = false;
    searchMark: string = '?';
    queryForm: FormGroup;

    alwayOpenSidebar: string;
    sidebarHeading: string;
    sidebarContent: string = 'create';
    sidebarView: string;
    confirmDelete: boolean = false;
    currentDeleteRecord: Category;
  
    currentRecord: Category;
    currentRecords: Array<Category> = []
  
    constructor(
      private categories: Categories,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
    ) { 
      this.setQueryForm();
      this.getRecords();
    }
  
    ngOnInit(): void {
  
    }

    setQueryForm(){
      this.queryForm = this.formBuilder.group({
        name: [''],
        code:[''],
        parent: [''],
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
      if (queryData.name !== '') {
        this.dirty === false ? this.dirty = true : this.searchMark = '&';
        searchQuery += `${this.searchMark}name=${queryData.name}`;
      }
      if (queryData.parent !== '') {
        this.dirty === false ? this.dirty = true : this.searchMark = '&';
        searchQuery += `${this.searchMark}parent=${queryData.parent}`;
      }
      
      this.searchMark = '?'; this.dirty = false;
  
      console.log('pickup searchQuery',searchQuery)
      this.categories.recordRetrieve(searchQuery).then(res =>{
        if (res.success) {
          this.currentRecords = res.payload;
          console.log('pickup', this.currentRecords);
          this.showNotification(`(${res.payload.length}) records found`);
        } else {
          this.showNotification(res.message);
        }
        this.loading = false;
  
      })
    }

    getRecords(){
        let query = '?populate=parent';
       this.categories.recordRetrieve(query).then(res =>{
         if(res.success){
           this.currentRecords = res.payload;
           this.loading = false;
           this.showNotification(`${this.currentRecords.length} categories retrieved`);
         }
       }).catch(err => {
           this.loading = false;
           this.showNotification(err)
       })
     }
  
    openSidebar(activePanel: string, status: string, record: Category | null) {
      this.sidebarView = activePanel;
      this.sidebarContent = status;
      this.alwayOpenSidebar = `${status}-${+new Date}`;
      this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Category`;
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
  
    openModal(record: Category): void {
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

    deleteRecord(record: Category){
      if(record == null || undefined){
        this.showNotification('Cannot delete an empty record');
        return;
      }

      this.categories.recordDelete(record).then(res => {
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






  

