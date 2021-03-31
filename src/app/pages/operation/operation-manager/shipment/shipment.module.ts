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

import { ShipmentComponent } from './shipment.component';
import { ShipmentAddComponent } from './shipment-add/shipment-add.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';


const routes: Routes = [
    
    {   path: '',               component: ShipmentComponent },
    {   path: 'add',            component: ShipmentAddComponent },
    {   path: 'details:id',     component: ShipmentDetailsComponent },
   
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
        ShipmentComponent,
        ShipmentDetailsComponent,
        ShipmentAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class ShipmentModule {}