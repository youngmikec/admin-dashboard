import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as printJS from 'print-js';

export interface ReceiptObject {
  receiptType: ReceiptType;
  dateIssued: Date;
  code: string;
  pmlTerminalFrom: string;
  pmlTerminalTo: string;
  value: number;
  sender: string;
  recipient?: string;
  charge: number;
  description: string;
  paymentMethod?: string;
}

export enum ReceiptType {
  INVOICE = 'Invoice',
  SLIP = 'Slip',
}

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})

export class ReceiptsComponent implements OnInit {

  @ViewChild('invoicePrintArea', null)  printArea: ElementRef;
   show = false;
   data: ReceiptObject = {
    dateIssued: new Date(),
    code: '',
    pmlTerminalFrom: '',
    pmlTerminalTo: '',
    value: 0,
    sender: '',
    recipient: '',
    receiptType: ReceiptType.SLIP,
    paymentMethod: '',
    charge: 0,
    description: ''
  };

  constructor() { }

  ngOnInit() {
  }

  getRoute(route: string, dir: string = 'from'): string {
    const routes = route.split('=>').map((r: string) => r.trim());
    if (dir === 'from') {
      return routes[0];
    } else if (dir === 'to') {
      return routes[1];
    }
    return (`From: ${routes[0]}, To: ${routes[1]}`);
  }

  public print(data: ReceiptObject): void {
    console.log(`Data from print ${data}`);
    this.data = data;
    this.show = true;
    setTimeout(
      () => {
        printJS({
          printable: this.printArea.nativeElement.outerHTML,
          type: 'raw-html',
          documentTitle: `pml-shipment-${data.dateIssued}-${data.code}.pdf`,
        });
        this.show = false;
      }, 0
    );
  }

}
