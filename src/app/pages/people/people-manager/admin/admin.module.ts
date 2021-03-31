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

import { ComponentsModule } from '../../../../components/components.module';
import { CustomFormsFieldModule } from '../../../../components/appanalyst/custom-forms-field/custom-forms-field.module';

import { AdminComponent } from './admin.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';

const routes: Routes = [
  { path: '', component: AdminComponent, },
  { path: 'detail/:id', component: AdminDetailComponent, },
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
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    DataTablesModule,
    ComponentsModule,
    CustomFormsFieldModule,
  ],
  exports: [RouterModule],
  declarations: [
    AdminComponent,
    AdminDetailComponent,
  ],
})
export class AdminModule { }
