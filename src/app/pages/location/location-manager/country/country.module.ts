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

import { CountryComponent } from './country.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryDetailsComponent } from './country-details/country-details.component';


const routes: Routes = [
    
    {   path: '',               component: CountryComponent },
    {   path: 'add',            component: CountryAddComponent },
    {   path: 'details:id',     component: CountryDetailsComponent },
   
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
        CountryComponent,
        CountryDetailsComponent,
        CountryAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class CountryModule {}