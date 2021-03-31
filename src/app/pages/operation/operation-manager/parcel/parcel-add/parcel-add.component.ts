
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Parcels, Users, Counties, Countries, States, Categories } from '../../../../../providers';
import { County, Country, State, User, Category } from '../../../../../models';
// import { ReceiptsComponent, ReceiptType } from '../../../../../../components/receipts/receipts.component';
// import { CustomerAddComponent } from '../../../../customer/customer-add/customer-add.component'
// import { RightSidebarComponent } from '../../../../../components/right-sidebar/right-sidebar.component';
import { AuthService } from '../../../../../services';
import { getFullname, safeGet, nextDate, formatDate } from '../../../../../helpers';



@Component({
  selector: 'app-parcel-add',
  templateUrl: './parcel-add.component.html',
  styleUrls: ['./parcel-add.component.css']
})
export class ParcelAddComponent implements OnInit {
  
  // @ViewChild('reciept', null) recieptHandler: ReceiptsComponent;
  @Input() currentForm: string;
  @Input() record: User | null;
  @Input() formType: string;
  @Output() changed = new EventEmitter<boolean>();

  addForm: FormGroup;
  addCustomerForm: FormGroup;
  updateForm: FormGroup;
  searchForm: FormGroup;
  returnedRoute: any;
  routeDistance: number;
  defaultDistance: number = 150;
  validRoute: boolean;

  counter: number = 1;
  loading:boolean = false;
  getFullname = getFullname;

  senderRecord: User = null;
  recipientRecord: User = null;
  isUserReturned: boolean = true ;
  isSenderReturned: boolean = true ;
  salesData: any;

  userRecords: Array<User> = [];
  terminalRecords: Array<User> = [];

  senderOptions: Array<any> = [];
  recipientOptions: Array<any> = [];
  customerOptions: Array<any> = [];
  terminalOptions: Array<any> = [];
  user: any;
  noReceiverFound: boolean;
  noSenderFound: boolean;
  pmlTerminalFrom: string;
  pmlTerminalTo: string;

  countyOptions: Array<County> = [];
  countryOptions: Array<Country> = [];
  stateOptions: Array<State> = [];
  categoryOptions: Array<Category> = [];
  
  //right sidebar variables
  alwayOpenSidebar: string;
  sidebarHeading: string;
  sidebarContent = 'create';
  sidebarView: string;
  currentRecord: any;

  monitorTerminals = () => {
    setTimeout(() => {
      if (this.terminalOptions.length === 0) {
        // this.getTerminalOptions();
        this.monitorTerminals(); }
    }, 3000);
  }

  monitorCustomers = () => {
    setTimeout(() => {
      this.customerOptions = this.userRecords.map(item => ({ id: item.id, text: getFullname(item) }));
      if (!(this.customerOptions.length > 1)) { this.monitorCustomers(); }
    }, 3000);
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private users: Users,
    private counties: Counties,
    private countries: Countries,
    private states: States,
    private categories: Categories,
    // private customers: Customers,
    private parcels: Parcels,
    // private terminals: PmlTerminals,
    private toastr: ToastrService,
    private authService: AuthService,
    // private pmlBillings: PmlBillings,
    // private pmlRoutes: PmlRoutes
    ) {
      // this.getTerminalOptions();
     this.getAllOptions();
      this.userRecords = this.users.query();
      this.createForm();
      this.createCustomerForm();
      this.searchForm = this.formBuilder.group({
        sender: [''],
        recipient: ['']
      });
      this.user = this.authService.getUser();
  }

  ngOnInit() {
    if (this.userRecords.length > 0) {
      this.senderOptions = this.customerOptions;
      this.recipientOptions = this.customerOptions;
      this.setCustomerOptions('SENDER');
      this.setCustomerOptions('RECIPIENT');
    }
    this.monitorTerminals();
  }

  incrementCounter(){
    if(this.counter > 2){
      this.counter = 2;
    }
    this.counter ++;
  }
  decreaseCounter(){
    this.counter --;
    if(this.counter < 1){
      this.counter = 1;
    }
  }

  getAllOptions(){
    this.getCategories();
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
  getCategories(){
    let query = `?populate=parent`;
    this.categories.recordRetrieve(query).then(res =>{
      if(res.success){
        this.categoryOptions = res.payload;
        console.log(this.categoryOptions);
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
  


  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      sender: ['', Validators.required],
      recipient: ['', Validators.required],
      category: ['', Validators.required],
      urgency: [''],
      distance: [''],
      mass: [''],
      volume: [''],
      worth: ['100', [Validators.required, Validators.min(100)]],
      isFragile: ['false', Validators.required],
      isPerishable: ['false', Validators.required],
      isCombustible: ['false', Validators.required],
      isOdiferous: ['false', Validators.required],
      isLiquid: ['false', Validators.required],
      isUnique: ['false', Validators.required],
      description: ['', Validators.required],
      // deliveryType: ['TERMINAL', Validators.required], // 'HOME'|'TERMINAL';
      terminalFrom: ['', Validators.required],
      stateFrom: [''],
      countyFrom: [''],
      countryFrom: [''],
      terminalTo: ['', Validators.required],
      stateTo: [''],
      countyTo: [''],
      countryTo: [''],
      deliveryAddress: ['', Validators.required],
      travelHour: [''],
      departureDate: ['', Validators.required],
      expectedDate: ['', Validators.required],
      transaction: ['PRE_PAID', Validators.required],
      costEstimate: [''],
      costPayable: ['', Validators.required],
      deliveryStatus: [''],

      // paymentMethod: ['CASH', Validators.required],
      // paymentStatus: ['SUCCESSFUL', Validators.required],
      // paymentGateway: [null],
      identification: ['', Validators.required],
      remark: [''],
      isReturned: [''],
      pickup:['']
    });
  }

  createCustomerForm() {
    this.addCustomerForm = this.formBuilder.group({
      // customerType: ['INDIVIDUAL', Validators.required],
      type: ['', [Validators.required]],
      title: [null],
      surname: [null, Validators.required],
      otherName: [null, Validators.required],
      gender: ['MALE', Validators.required],
      birthDate: [null],
      phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      phoneHome: [null, [Validators.minLength(11), Validators.maxLength(11)]],
      email: [null],
      contactPerson: [null, Validators.required],
      contactPersonPhone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: [null, Validators.required],
      // country: ['NG'],
      // skype: [null],
      // linkedin: [null],
      // facebook: [null],
      // instagram: [null],
      // twitter: [null],
      // youtube: [null],
      // product: [null],
      // photo: [null],

    });
  }

  onCustomerCreate() {
    this.loading = true;
    const payload = this.addCustomerForm.value;
    if (this.addCustomerForm.invalid) {
      this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    payload.isPmlClient = true;
    payload.country = 'NG';
    payload.password = payload.phone;
    console.log(payload);
    this.users.recordCreate(payload).then(res => {
      this.addCustomerForm.reset();
      this.showNotification(`Customer, ${res.payload.surname + ' '+ res.payload.otherName}, has been successfully created!`);
      this.changed.emit(true);
    }).catch(error => this.showNotification(error));
    this.loading = false;
    return;
  }

  searchCustomer(type: 'sender' | 'recipient') {
    const customerData = this.searchForm.value;
    const query = `?phone=${customerData[ type ]}`;
    console.log('Searching query => ', query);
    this.users.recordRetrieve(query).then(res => {
      console.log('Response => ', res);
      if (type === 'sender') {
        this.senderRecord = res.payload[0];
        this.setCustomerOptions('SENDER');
        this.isSenderReturned = true;
      } else {
        this.recipientRecord = res.payload[0];
        this.setCustomerOptions('RECIPIENT');
        this.isUserReturned = true;
      }

      if((type === 'sender') && (!this.senderRecord)){
        this.isSenderReturned = false;
      }

      if((type === 'recipient') && (!this.recipientRecord)){
        this.isUserReturned = false;
      }
      
      this.userRecords.push(res.payload[0]);
    });
  }

  setCustomerOptions = (type: 'SENDER'|'RECIPIENT') => {
    switch (type) {
      case 'SENDER':
        if (this.senderRecord) {
          this.senderOptions = [{ id: this.senderRecord.id, text: getFullname(this.senderRecord), code: this.senderRecord.type }];
          this.showNotification(`${this.senderRecord.surname} added to ${type} options`);
          this.addForm.patchValue({
            sender: safeGet(this.senderRecord, 'id'),
          });
        }
        break;
      case 'RECIPIENT':
        if (this.recipientRecord) {
          this.recipientOptions = [{ id: this.recipientRecord.id, text: getFullname(this.recipientRecord), code: this.recipientRecord.type }];
          this.showNotification(`${this.recipientRecord.surname} added to ${type} options`);
          this.addForm.patchValue({
            recipient: safeGet(this.recipientRecord, 'id'),
          });
      }
      break;
      }
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    // payload.type = this.senderOptions[0].code;
    // payload.direction = 'F';
    // delete payload.costEstimate;
    // console.log(payload);
    const { deliveryAddress, deliveryType, billingType, paymentStatus } = payload;
      if (deliveryAddress.length < 20) {
        this.showNotification('Delivery Address for "HOME" delivery must be move than 20 characters');
        this.loading = false;
        return;
      }
    
    // if (billingType === 'PRE_PAID' && paymentStatus !== 'SUCCESSFUL') {
    //   this.showNotification(`Payment Status must be 'SUCCESSFUL' for all 'PRE_PAID' billings`);
    //   this.loading = false;
    //   return;
    // }
    // payload.costEstimate = this.pmlBillings.estimateBilling(payload);
    // payload.pmlTerminalFrom = `${this.user.terminal.id}`;
    // payload.pmlTerminalStore = `${this.user.terminal.id}`;
    console.log(payload);
    this.parcels.recordCreate(payload).then(res => {
      // this.printReceipt(res.payload);
      if(res.success){
        console.log('In response => ',  payload);
        this.loading = false;
        this.addForm.reset();
      }
     // this.closeModal();
      // this.senderRecord = null; this.recipientRecord = null;
      // this.noReceiverFound = false; this.noSenderFound = false;
    }).catch(error => {
      this.showNotification(error);
      this.loading = false;
    }).finally(() => {
      this.loading = false;
      return;
    });

  }

  // getCostEstimate() {
  //   this.loading = true;
  //   const payload = this.addForm.value;
  //   const costEstimate = this.pmlBillings.estimateBilling(payload);
  //   console.log(typeof costEstimate);
  //   this.addForm.get('costEstimate').setValue(costEstimate);
  //   this.showNotification(`Estimate Shipment Cost is ${costEstimate}`);
  //   this.loading = false;
  // }

  openSidebar(activePanel: string, status: string, record: User | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.alwayOpenSidebar = `${status}-${+new Date}`;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Customer`;
    this.currentRecord = record;
  }

  openAddSidebar(): void {
    this.openSidebar('forms', 'create', null);
  }

  openViewSidebar(record: any): void {
    this.openSidebar('view', 'view', record);
  }

  openEditSidebar(record: any): void {
    this.openSidebar('forms', 'edit', record);
  }

  // async printReceipt(responsePayload) {
  //   console.log('\n\nresponsePayload ==>', responsePayload);
  //   console.log('terminalRecords', this.terminalRecords);
  //   let senderName = ''; let recipientName = ''; let destination = ''; let from = ''; let mass = responsePayload.mass;
  //   const senderObj = await this.users.getCustomer('id', responsePayload.sender);
  //   if (senderObj) {
  //     senderName = `${getFullname(senderObj)} ${safeGet(senderObj, 'phone')} `;
  //   }
  //   const recipientObj = await this.users.getCustomer('id', responsePayload.recipient);
  //   if (recipientObj) {
  //     recipientName = `${getFullname(recipientObj)} ${safeGet(recipientObj, 'phone')} `;
  //   }
  //   this.terminalRecords.filter((val) => {
  //     if (val.id === responsePayload.pmlTerminalTo) {
  //       destination = `${val.name} ${val.address}`;
  //     }
  //   });

  //   this.terminalRecords.filter((val) => {
  //     if (val.id === responsePayload.pmlTerminalFrom) {
  //       from = `${val.name} ${val.address}`;
  //     }
  //   });
    
  //   console.log('About to print receipt ====>');
  //   this.recieptHandler.print({
  //     receiptType: ReceiptType.INVOICE,
  //     code: safeGet(responsePayload, 'code'),
  //     charge: safeGet(responsePayload, 'costPayable'),
  //     // pmlTerminalFrom: safeGet(this.user.terminal, 'name'),
  //     pmlTerminalFrom: from,
  //     pmlTerminalTo: destination,
  //     value: safeGet(responsePayload, 'worth'),
  //     description: safeGet(responsePayload, 'description'),
  //     paymentMethod: safeGet(responsePayload, 'paymentMethod'),
  //     // sender: `${getFullname(this.senderRecord)} ${safeGet(this.senderRecord, 'phone')} `,
  //     // recipient: `${getFullname(this.recipientRecord)} ${safeGet(this.recipientRecord, 'phone')} `,
  //     sender: senderName,
  //     recipient: recipientName,
  //     dateIssued: new Date(Date.now()),
  //     mass: mass
  //   });
  // }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`shipment/detail/${record.id}`]);
    return;
  }

  setLocalStorage(name: string, data: any){
    if(localStorage.getItem(name) === null || undefined){
      window.localStorage.setItem(name, JSON.stringify(data));
    }else{
      let previous = JSON.parse(window.localStorage.getItem(name));
      previous.push(data);
      window.localStorage.setItem(name, previous);
    }
  }


  // Record sale made
  recordSale(data){
    this.setLocalStorage('Sale', data);
  };


  get f() {
    return this.addForm.controls;
  }

  goBack() {
    window.history.back();
  }

}


