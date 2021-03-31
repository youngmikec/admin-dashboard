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

import { TransactionComponent } from './transaction.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';


const routes: Routes = [
    
    {   path: '',                       component: TransactionComponent },
    {   path: 'add',                    component: TransactionAddComponent },
    {   path: 'details:id',             component: TransactionDetailsComponent },
   
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
        TransactionComponent,
        TransactionAddComponent,
        TransactionDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class TransactionModule {}