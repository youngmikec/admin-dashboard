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

import { LienComponent } from './lien.component';
import { LienAddComponent } from './lien-add/lien-add.component';
import { LienDetailsComponent } from './lien-details/lien-details.component';


const routes: Routes = [
    
    {   path: '',                       component: LienComponent },
    {   path: 'add',                    component: LienAddComponent },
    {   path: 'details:id',             component: LienDetailsComponent },
   
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
        LienComponent,
        LienAddComponent,
        LienDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class LienModule {}