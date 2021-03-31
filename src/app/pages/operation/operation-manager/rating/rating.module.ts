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

import { RatingComponent } from './rating.component';
import { RatingAddComponent } from './rating-add/rating-add.component';
import { RatingDetailsComponent } from './rating-details/rating-details.component';


const routes: Routes = [
    
    {   path: '',               component: RatingComponent },
    {   path: 'add',            component: RatingAddComponent },
    {   path: 'details:id',     component: RatingDetailsComponent },
   
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
        RatingComponent,
        RatingDetailsComponent,
        RatingAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class RatingModule {}