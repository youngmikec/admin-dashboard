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

import { PhotoComponent } from './photo.component';
import { PhotoAddComponent } from './photo-add/photo-add.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';


const routes: Routes = [
    
    {   path: '',               component: PhotoComponent },
    {   path: 'add',            component: PhotoAddComponent },
    {   path: 'details:id',     component: PhotoDetailsComponent },
   
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
        PhotoComponent,
        PhotoDetailsComponent,
        PhotoAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class PhotoModule {}