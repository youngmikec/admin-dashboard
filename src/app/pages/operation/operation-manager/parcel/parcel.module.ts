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

import { ParcelComponent } from './parcel.component';
import { ParcelAddComponent } from './parcel-add/parcel-add.component';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';


const routes: Routes = [
    
    {   path: '',               component: ParcelComponent },
    {   path: 'add',            component: ParcelAddComponent },
    {   path: 'details:id',     component: ParcelDetailsComponent },
   
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
        ParcelComponent,
        ParcelDetailsComponent,
        ParcelAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class ParcelModule {}