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

import { PickupComponent } from './pickup.component';
import { PickupAddComponent } from './pickup-add/pickup-add.component';
import { PickupDetailsComponent } from './pickup-details/pickup-details.component';


const routes: Routes = [
    
    {   path: '',               component: PickupComponent },
    {   path: 'add',            component: PickupAddComponent },
    {   path: 'details:id',     component: PickupDetailsComponent },
   
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
        PickupComponent,
        PickupDetailsComponent,
        PickupAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class PickupModule {}