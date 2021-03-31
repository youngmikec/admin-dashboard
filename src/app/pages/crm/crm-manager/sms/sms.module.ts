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

import { SmsComponent } from './sms.component';
import { SmsAddComponent } from './sms-add/sms-add.component';
import { SmsDetailsComponent } from './sms-details/sms-details.component';


const routes: Routes = [
    
    {   path: '',               component: SmsComponent },
    {   path: 'add',            component: SmsAddComponent },
    {   path: 'details:id',     component: SmsDetailsComponent },
   
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
        SmsComponent,
        SmsDetailsComponent,
        SmsAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class SmsModule {}