import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ComponentsModule } from '../../../../components/components.module';
import { ToastrModule } from 'ngx-toastr';

import { DepositComponent } from './deposit.component';
import { DepositAddComponent } from './deposit-add/deposit-add.component';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';
import { DepositEditComponent } from './deposit-edit/deposit-edit.component';


const routes: Routes = [
    
    {   path: '',                       component: DepositComponent },
    {   path: 'add',                    component: DepositAddComponent },
    {   path: 'edit',                   component: DepositEditComponent },
    {   path: 'details:id',             component: DepositDetailsComponent },
   
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        NgbModule,
        NgSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,        
    ],

    declarations: [
        DepositComponent,
        DepositAddComponent,
        DepositDetailsComponent,
        DepositEditComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class DepositModule {}