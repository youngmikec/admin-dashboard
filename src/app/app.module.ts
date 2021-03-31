import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionServiceModule } from 'ng-connection-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import { ComponentsModule } from './components/components.module';
import { LoginOtpComponent } from './pages/login-otp/login-otp.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import {
  ApiService, AuthGuard, AuthService, DEFAULT_TIMEOUT, EnvService, ErrorInterceptor,
  InternetService, JwtInterceptor, TimeoutInterceptor
} from './services';

import {
  Admins,
  Banks,
  Bonuses,
  Categories,
  Countries,
  Counties,
  Deposits,
  Liens,
  Mails,
  Notifications,
  Photos,
  Parcels,
  Pickups,
  Ratings,
  Schedules,
  Settings,
  Shipments,
  Royalties,
  Smses,
  States,
  Tickets,
  Tracks,
  Transfers,
  Transactions,
  Upgrades,
  Users,
  Vehicles,
  Withdraws,
} from './providers';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    NgxChartsModule,
    ChartsModule,
    ConnectionServiceModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    DataTablesModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LoginOtpComponent,
  ],
  providers: [
    AuthService,
    ApiService,
    AuthGuard,
    EnvService,
    InternetService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 60000 }],
    DatePipe,

    Admins,
    Banks,
    Bonuses,
    Categories,
    Countries,
    Counties,
    Deposits,
    Liens,
    Mails,
    Notifications,
    Parcels,
    Pickups,
    Photos,
    Ratings,
    Schedules,
    Settings,
    Shipments,
    Royalties,
    Smses,
    States,
    Tickets,
    Tracks,
    Transfers,
    Transactions,
    Upgrades,
    Users,
    Vehicles,
    Withdraws,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
