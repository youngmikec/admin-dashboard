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

import { BankComponent } from './bank.component';
import { BankAddComponent } from './bank-add/bank-add.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';


const routes: Routes = [
    
    {   path: '',                       component: BankComponent },
    {   path: 'add',                    component: BankAddComponent },
    {   path: 'details:id',             component: BankDetailsComponent },
   
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
        BankComponent,
        BankAddComponent,
        BankDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class BankModule {}