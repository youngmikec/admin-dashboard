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

import { WithdrawComponent } from './withdraw.component';
import { WithdrawAddComponent } from './withdraw-add/withdraw-add.component';
import { WithdrawDetailsComponent } from './withdraw-details/withdraw-details.component';


const routes: Routes = [
    
    {   path: '',                       component: WithdrawComponent },
    {   path: 'add',                    component: WithdrawAddComponent },
    {   path: 'details:id',             component: WithdrawDetailsComponent },
   
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
        WithdrawComponent,
        WithdrawAddComponent,
        WithdrawDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class WithdrawModule {}