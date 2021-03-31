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

import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '',           component: UserComponent, },
  { path: 'add',        component: UserAddComponent },
  { path: 'edit',       component: UserEditComponent, },
  { path: 'detail/:id', component: UserDetailComponent, },
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
    UserComponent,
    UserDetailComponent,
    UserAddComponent,
    UserEditComponent,
  ],
})
export class UserModule { }
