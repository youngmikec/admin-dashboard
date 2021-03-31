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

import { TicketComponent } from './ticket.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';


const routes: Routes = [
    
    {   path: '',               component: TicketComponent },
    {   path: 'add',            component: TicketAddComponent },
    {   path: 'details:id',     component: TicketDetailsComponent },
   
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
        TicketComponent,
        TicketDetailsComponent,
        TicketAddComponent,
    ],

    exports: [
        RouterModule
    ]

})

export class TicketModule {}