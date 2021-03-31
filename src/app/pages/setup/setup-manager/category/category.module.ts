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
import { ToastrModule } from 'ngx-toastr';
import {AuthGuard} from '../../../../services';
import { ComponentsModule } from '../../../../components/components.module';
import { CateoryAddComponent } from './cateory-add/cateory-add.component';
import { CateoryEditComponent } from './cateory-edit/cateory-edit.component';
import { CategoryComponent } from './category.component';
import { CateoryDetailsComponent } from './cateory-details/cateory-details.component';





const routes: Routes = [
    
    {   path: '',                       component: CategoryComponent },
    {   path: 'add',                    component: CateoryAddComponent },
    {   path: 'edit',                   component: CateoryEditComponent },
    {   path: 'detail',                 component: CateoryDetailsComponent },
    // {   path: 'map',          component: MapComponent },
   
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
    CateoryAddComponent,     
    CateoryEditComponent,
    CategoryComponent,
    CateoryDetailsComponent
],
        
        
    exports: [
        RouterModule
    ]
})

export class CategoryModule {}