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

import { ScheduleComponent } from './schedule.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';


const routes: Routes = [
    
    {   path: '',               component: ScheduleComponent },
    {   path: 'add',            component: ScheduleAddComponent },
    {   path: 'details:id',     component: ScheduleDetailsComponent },
   
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
        ScheduleComponent,
        ScheduleDetailsComponent,
        ScheduleAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class ScheduleModule {}