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

import { UpgradeComponent } from './upgrade.component';
import { UpgradeAddComponent } from './upgrade-add/upgrade-add.component';
import { UpgradeDetailsComponent } from './upgrade-details/upgrade-details.component';


const routes: Routes = [
    
    {   path: '',               component: UpgradeComponent },
    {   path: 'add',            component: UpgradeAddComponent },
    {   path: 'details:id',     component: UpgradeDetailsComponent },
   
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
        UpgradeComponent,
        UpgradeDetailsComponent,
        UpgradeAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class UpgradeModule {}