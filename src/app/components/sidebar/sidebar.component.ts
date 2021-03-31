import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  sub: any[];
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'business_chart-bar-32', class: '', sub: null },

  {
    path: 'people', title: 'People', icon: 'users_single-02', class: 'parent-nav',
    sub: [
      { path: '/people/admin', title: 'Admins', icon: 'users_single-02', class: '' },
      { path: '/people/user', title: 'Users', icon: 'users_single-02', class: '' },
      { path: '/people/upgrade', title: 'Upgrade', icon: 'users_single-02', class: '' },
    ]
  },

  {
    path: 'crm', title: 'CRM', icon: 'users_single-02', class: 'parent-nav',
    sub: [
      { path: '/crm/mail', title: 'Mail', icon: 'users_single-02', class: '' },
      { path: '/crm/sms', title: 'SMS', icon: 'users_single-02', class: '' },
      { path: '/crm/ticket', title: 'Ticket', icon: 'users_single-02', class: '' },
      { path: '/crm/notification', title: 'Notification', icon: 'users_single-02', class: '' },
    ]
  },

  {
    path: '/wallet', title: 'Wallet', icon: 'business_money-coins', class: 'parent-nav',
    sub: [
      { path: '/wallet/bonus', title: 'Bonus', icon: 'shopping_cart-simple', class: '' },
      { path: '/wallet/deposit', title: 'Deposit', icon: 'business_bank', class: '' },
      { path: '/wallet/lien', title: 'Lien', icon: 'business_bank', class: '' },
      { path: '/wallet/royalty', title: 'Royalty', icon: 'business_bank', class: '' },
      { path: '/wallet/transaction', title: 'Transaction', icon: 'files_single-copy-04', class: '' },
      { path: '/wallet/transfer', title: 'Transfer', icon: 'files_single-copy-04', class: '' },
      { path: '/wallet/withdraw', title: 'Withdraw', icon: 'files_single-copy-04', class: '' },
    ]
  },

  {
    path: 'operation', title: 'Operations', icon: 'transportation_bus-front-12', class: 'parent-nav',
    sub: [
      { path: '/operation/parcel', title: 'Parcel', icon: 'location_map-big', class: '' },
      { path: '/operation/pickup', title: 'Pickup', icon: 'location_map-big', class: '' },
      { path: '/operation/rating', title: 'Rating', icon: 'location_compass-05', class: '' },
      { path: '/operation/schedule', title: 'Schedule', icon: 'location_world', class: '' },
      { path: '/operation/shipment', title: 'Shipment', icon: 'location_world', class: '' },
      { path: '/operation/vehicle', title: 'Vehicle', icon: 'location_world', class: '' },
    ]
  },

  {
    path: 'location', title: 'Locations', icon: 'location_pin', class: 'parent-nav',
    sub: [
      { path: '/location/track', title: 'Track', icon: 'location_world', class: '' },
      // { path: '/location/terminal', title: 'Terminals', icon: 'location_map-big', class: '' },
      { path: '/location/state', title: 'State', icon: 'location_compass-05', class: '' },
      { path: '/location/county', title: 'County', icon: 'location_world', class: '' },
      { path: '/location/country', title: 'Country', icon: 'location_world', class: '' },
    ]
  },

  { path: '/media/photo', title: 'Media', icon: 'users_single-02', class: '', sub: null },

  {
    path: '', title: 'General', icon: 'design_app', class: 'parent-nav',
    sub: [
      { path: '/message', title: 'Messages', icon: 'ui-1_email-85', class: '', sub: null },
      { path: '/user-profile', title: 'User Profile', icon: 'users_circle-08', class: '', sub: null },
      { path: '/ticket', title: 'Support Ticket', icon: 'users_circle-08', class: '', sub: null },
      { path: '/setting', title: 'Settings', icon: 'ui-1_settings-gear-63', class: '', sub: null },
      { path: '/reset-password', title: 'Reset Password', icon: 'ui-1_lock-circle-open', class: '', sub: null },
    ]
  },

  {
    path: 'setup', title: 'Setup', icon: 'location_pin', class: 'parent-nav',
    sub: [
      { path: '/setup/bank', title: 'Bank', icon: 'location_world', class: '' },
      { path: '/setup/category', title: 'Category', icon: 'location_compass-05', class: '' },
      { path: '/setup/setting', title: 'Setting', icon: 'location_world', class: '' },
    ]
  },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout() {
    this.authService.userLogOut();
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
