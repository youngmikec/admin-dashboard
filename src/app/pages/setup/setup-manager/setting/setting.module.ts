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

import { SettingComponent } from './setting.component';
import { SettingDetailComponent } from './setting-detail/setting-detail.component';
import { SettingAddComponent } from './setting-add/setting-add.component';
import { SettingEditComponent } from './setting-edit/setting-edit.component';

const routes: Routes = [
  { path: '',                     component: SettingComponent,               },
  { path: 'add',                  component: SettingAddComponent,         },
  { path: 'edit',                 component: SettingEditComponent,         },
  { path: 'detail/:id',           component: SettingDetailComponent,         },
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
    SettingComponent, 
    SettingAddComponent,
    SettingDetailComponent,
    SettingEditComponent,
  ],
})
export class SettingModule {}
