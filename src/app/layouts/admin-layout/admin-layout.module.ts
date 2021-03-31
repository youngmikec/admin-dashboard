import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { ComponentsModule } from '../../components/components.module';
import { CustomFormsFieldModule } from '../../components/appanalyst/custom-forms-field/custom-forms-field.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ResetPasswordComponent} from '../../pages/reset-password/reset-password.component';
import { PeopleManagerComponent } from '../../pages/people/people-manager/people-manager.component';
import { CrmManagerComponent } from '../../pages/crm/crm-manager/crm-manager.component';
import { LocationManagerComponent } from '../../pages/location/location-manager/location-manager.component';
import { MediaManagerComponent } from '../../pages/media/media-manager/media-manager.component';
import { OperationManagerComponent } from '../../pages/operation/operation-manager/operation-manager.component';
import { SetupManagerComponent } from '../../pages/setup/setup-manager/setup-manager.component';
import { WalletManagerComponent } from '../../pages/wallet/wallet-manager/wallet-manager.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        NgbModule,
        NgSelectModule,
        ToastrModule.forRoot(),
        DataTablesModule,
        ComponentsModule,
        CustomFormsFieldModule,
        NgxChartsModule,
    ],
  declarations: [
    DateAgoPipe,
    DashboardComponent,
    PeopleManagerComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    CrmManagerComponent,
    LocationManagerComponent,
    MediaManagerComponent,
    OperationManagerComponent,
    SetupManagerComponent,
    WalletManagerComponent,
  ]
})

export class AdminLayoutModule {}
