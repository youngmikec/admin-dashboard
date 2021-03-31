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

import { TrackComponent } from './track.component';
import { TrackAddComponent } from './track-add/track-add.component';
import { TrackDetailsComponent } from './track-details/track-details.component';


const routes: Routes = [
    
    {   path: '',               component: TrackComponent },
    {   path: 'add',            component: TrackAddComponent },
    {   path: 'details:id',     component: TrackDetailsComponent },
   
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
        TrackComponent,
        TrackDetailsComponent,
        TrackAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class TrackModule {}