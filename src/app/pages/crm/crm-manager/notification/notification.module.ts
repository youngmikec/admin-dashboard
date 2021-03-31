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

import { NotificationComponent } from './notification.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';


const routes: Routes = [
    
    {   path: '',               component: NotificationComponent },
    {   path: 'add',            component: NotificationAddComponent },
    {   path: 'details:id',     component: NotificationDetailsComponent },
   
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
        NotificationComponent,
        NotificationDetailsComponent,
        NotificationAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class NotificationModule {}