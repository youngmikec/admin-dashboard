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

import { CountyComponent } from './county.component';
import { CountyAddComponent } from './county-add/county-add.component';
import { CountyDetailsComponent } from './county-details/county-details.component';


const routes: Routes = [
    
    {   path: '',               component: CountyComponent },
    {   path: 'add',            component: CountyAddComponent },
    {   path: 'details:id',     component: CountyDetailsComponent },
   
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
        CountyComponent,
        CountyDetailsComponent,
        CountyAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class CountyModule {}