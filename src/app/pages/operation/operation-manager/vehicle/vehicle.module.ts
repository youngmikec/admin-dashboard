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

import { VehicleComponent } from './vehicle.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';


const routes: Routes = [
    
    {   path: '',               component: VehicleComponent },
    {   path: 'add',            component: VehicleAddComponent },
    {   path: 'details:id',     component: VehicleDetailsComponent },
   
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
        VehicleComponent,
        VehicleDetailsComponent,
        VehicleAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class VehicleModule {}