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

import { BonusComponent } from './bonus.component';
import { BonusAddComponent } from './bonus-add/bonus-add.component';
import { BonusDetailsComponent } from './bonus-details/bonus-details.component';


const routes: Routes = [
    
    {   path: '',                       component: BonusComponent },
    {   path: 'add',                    component: BonusAddComponent },
    {   path: 'details:id',             component: BonusDetailsComponent },
   
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
        BonusComponent,
        BonusAddComponent,
        BonusDetailsComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class BonusModule {}