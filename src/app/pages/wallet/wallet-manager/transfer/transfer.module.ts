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

import { TransferComponent } from './transfer.component';
import { TransferAddComponent } from './transfer-add/transfer-add.component';
import { TransferDetailsComponent } from './transfer-details/transfer-details.component';


const routes: Routes = [
    
    {   path: '',                       component: TransferComponent },
    {   path: 'add',                    component: TransferAddComponent },
    {   path: 'details:id',             component: TransferDetailsComponent },
   
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
        TransferComponent,
        TransferAddComponent,
        TransferDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class TransferModule {}