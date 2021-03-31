import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdvanceTableComponent } from './advance-table/advance-table.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import {CustomFormsFieldModule} from './appanalyst/custom-forms-field/custom-forms-field.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    DataTablesModule,
    CustomFormsFieldModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReceiptsComponent,
    InvoiceComponent,
    AdvanceTableComponent,
    RightSidebarComponent,
  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ReceiptsComponent,
        InvoiceComponent,
        AdvanceTableComponent,
        RightSidebarComponent,
    ],
})
export class ComponentsModule { }
