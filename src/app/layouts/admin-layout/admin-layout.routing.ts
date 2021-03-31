import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ResetPasswordComponent} from '../../pages/reset-password/reset-password.component';
import { PeopleManagerComponent } from '../../pages/people/people-manager/people-manager.component';
import { CrmManagerComponent } from '../../pages/crm/crm-manager/crm-manager.component';
import { LocationManagerComponent } from '../../pages/location/location-manager/location-manager.component';
import { OperationManagerComponent } from '../../pages/operation/operation-manager/operation-manager.component';
import { SetupManagerComponent } from '../../pages/setup/setup-manager/setup-manager.component';

export const AdminLayoutRoutes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',        component: DashboardComponent,   canActivate: [AuthGuard] },
    { path: 'people',           component: PeopleManagerComponent,
      children: [{ path: '',    loadChildren: '../../pages/people/people.module#PeopleModule' }]
    },
    { path: 'crm',              component: CrmManagerComponent,
      children: [{ path: '',    loadChildren: '../../pages/crm/crm.module#CrmModule' }]
    },
    { path: 'location',         component: LocationManagerComponent,
      children: [{ path: '',    loadChildren: '../../pages/location/location.module#LocationModule' }]
    },
    { path: 'operation',        component: OperationManagerComponent,
      children: [{ path: '',    loadChildren: '../../pages/operation/operation.module#OperationModule' }]
    },
    { path: 'setup',            component: SetupManagerComponent,
      children: [{ path: '',    loadChildren: '../../pages/setup/setup.module#SetupModule' }]
    },

    { path: 'notification',     loadChildren: '../../pages/crm/crm-manager/notification/notification.module#NotificationModule' },
    { path: 'setting',          loadChildren: '../../pages/setup/setup-manager/setting/setting.module#SettingModule' },

    { path: 'dashboard',        component: DashboardComponent,              canActivate: [AuthGuard] },
    { path: 'user-profile',     component: UserProfileComponent,            canActivate: [AuthGuard] },
    { path: 'reset-password',   component: ResetPasswordComponent,          canActivate: [AuthGuard] },

  ];
