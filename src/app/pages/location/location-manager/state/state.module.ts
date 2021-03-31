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

import { StateComponent } from './state.component';
import { StateAddComponent } from './state-add/state-add.component';
import { StateDetailsComponent } from './state-details/state-details.component';


const routes: Routes = [
    
    {   path: '',               component: StateComponent },
    {   path: 'add',            component: StateAddComponent },
    {   path: 'details:id',     component: StateDetailsComponent },
   
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
        StateComponent,
        StateDetailsComponent,
        StateAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class StateModule {}