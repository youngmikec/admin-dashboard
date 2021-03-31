
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { genCode } from '../../../../../helpers';
import { Bank } from '../../../../../models';
import { Banks } from '../../../../../providers';


@Component({
  selector: 'app-bank-add',
  templateUrl: './bank-add.component.html',
  styleUrls: ['./bank-add.component.css']
})
export class BankAddComponent implements OnInit {
  @Input() record: Bank | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  addForm: FormGroup;
  loading: boolean = false;
  currentRecord: Bank;
  currentRecords: Array<Bank> = [];

  constructor(
    private banks: Banks,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  monitorRecords = () => {
    setTimeout(() => {
      if (this.currentRecords.length < 1) {
        this.currentRecords = this.banks.query();
        this.monitorRecords();
      }
    }, 2000);
  }

  ngOnInit(): void {
    this.monitorRecords();
    this.loading = false;

  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      sortCode: ['', Validators.required],
      bankCode: ['', Validators.required],
      shortName: [''],
      country: [''],
      contactPerson: [''],
      website: ['']
    })
  }

  onSubmit() {
    const payload = this.addForm.value;
    payload.code = genCode(8);
    console.log(payload);
    this.loading = true;
    this.banks.recordCreate(payload).then(res => {
      if (res.success) {
        this.showNotification(`${res.message}`);
        this.loading = false;
      }
    }).catch(err => {
      this.showNotification(`${err}`);
      this.loading = false;
    })
  }


  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  // queryRecord = async () => {
  //   this.queryLoading = true;
  //   const queryData = this.queryForm.value;
  //   let searchQuery = '';
  //   if (queryData.email !== '') {
  //     this.dirty === false ? this.dirty = true : this.searchMark = '&';
  //     searchQuery += `${this.searchMark}email=${queryData.email}`;
  //   }
  //   if (queryData.phone !== '') {
  //     this.dirty === false ? this.dirty = true : this.searchMark = '&';
  //     searchQuery += `${this.searchMark}phone=${queryData.phone}`;
  //   }
  //   if (queryData.surname !== '') {
  //     this.dirty === false ? this.dirty = true : this.searchMark = '&';
  //     searchQuery += `${this.searchMark}surname=${queryData.surname}`;
  //   }
  //   if (queryData.lastName !== '') {
  //     this.dirty === false ? this.dirty = true : this.searchMark = '&';
  //     searchQuery += `${this.searchMark}lastName=${queryData.lastName}`;
  //   }
  //   this.searchMark = '?'; this.dirty = false;
  //   const result = await this.customers.recordRetrieve(searchQuery);
  //   if (result.success) {
  //     this.currentRecords = result.payload;
  //     this.showNotification(`(${result.payload.length}) records found`);
  //   } else {
  //     this.showNotification(result.message);
  //   }
  //   this.queryLoading = false;

  packageModal(): void {
    // this.getTerminalOptions();
    const deleteModal = $('#deleteModal');
    deleteModal.attr('aria-modal', 'true');
    deleteModal.removeAttr('aria-hidden');
    deleteModal.addClass('show');
  }
  /**
   * @description "Handle close modal"
   */
  closeModal(): void {
    const deleteModal = $('#deleteModal');
    deleteModal.attr('aria-hidden', 'true');
    deleteModal.removeAttr('aria-modal');
    deleteModal.removeClass('show');
  }

}
