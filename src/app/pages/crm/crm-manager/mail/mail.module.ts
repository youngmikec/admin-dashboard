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

import { MailComponent } from './mail.component';
import { MailAddComponent } from './mail-add/mail-add.component';
import { MailDetailsComponent } from './mail-details/mail-details.component';


const routes: Routes = [
    
    {   path: '',               component: MailComponent },
    {   path: 'add',            component: MailAddComponent },
    {   path: 'details:id',     component: MailDetailsComponent },
   
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
        MailComponent,
        MailDetailsComponent,
        MailAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class MailModule {}