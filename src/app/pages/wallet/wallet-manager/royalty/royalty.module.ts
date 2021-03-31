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

import { RoyaltyComponent } from './royalty.component';
import { RoyaltyAddComponent } from './royalty-add/royalty-add.component';
import { RoyaltyDetailsComponent } from './royalty-details/royalty-details.component';


const routes: Routes = [
    
    {   path: '',                       component: RoyaltyComponent },
    {   path: 'add',                    component: RoyaltyAddComponent },
    {   path: 'details:id',             component: RoyaltyDetailsComponent },
   
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
        RoyaltyComponent,
        RoyaltyAddComponent,
        RoyaltyDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class RoyaltyModule {}