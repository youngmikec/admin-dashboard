import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataTablesModule } from 'angular-datatables';

import { ComponentsModule } from '../../components/components.module';
import { CustomFormsFieldModule } from '../../components/appanalyst/custom-forms-field/custom-forms-field.module';

const routes: Routes = [
  { path: '',             redirectTo: 'sms', pathMatch: 'full' },
  { path: 'sms',          loadChildren: './crm-manager/sms/sms.module#SmsModule' },  
  { path: 'mail',         loadChildren: './crm-manager/mail/mail.module#MailModule' },
  { path: 'ticket',       loadChildren: './crm-manager/ticket/ticket.module#TicketModule' },
  { path: 'notification', loadChildren: './crm-manager/notification/notification.module#NotificationModule' },

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    ComponentsModule,
    CustomFormsFieldModule,
  ],
  exports: [RouterModule],
  declarations: []
})
export class CrmModule { }
