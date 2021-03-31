import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataTablesModule } from 'angular-datatables';

import { ComponentsModule } from '../../components/components.module';
import { CustomFormsFieldModule } from '../../components/appanalyst/custom-forms-field/custom-forms-field.module';

const routes: Routes = [
  { path: '',             redirectTo: 'parcel', pathMatch: 'full' },
  { path: 'parcel',       loadChildren: './operation-manager/parcel/parcel.module#ParcelModule' },
  { path: 'pickup',       loadChildren: './operation-manager/pickup/pickup.module#PickupModule' },  
  { path: 'rating',       loadChildren: './operation-manager/rating/rating.module#RatingModule' },  
  { path: 'schedule',     loadChildren: './operation-manager/schedule/schedule.module#ScheduleModule' },  
  { path: 'shipment',     loadChildren: './operation-manager/shipment/shipment.module#ShipmentModule' },
  { path: 'vehicle',      loadChildren: './operation-manager/vehicle/vehicle.module#VehicleModule' },

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    ComponentsModule,
    CustomFormsFieldModule,
  ],
  exports: [RouterModule],
  declarations: []
})
export class OperationModule { }
