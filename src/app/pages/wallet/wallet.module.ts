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
  { path: '',             redirectTo: 'royalty', pathMatch: 'full' },
  { path: 'bonus',         loadChildren: './wallet-manager/bonus/bonus.module#BonusModule' }, 
  { path: 'lien',         loadChildren: './wallet-manager/lien/lien.module#LienModule' }, 
  { path: 'royalty',      loadChildren: './wallet-manager/royalty/royalty.module#RoyaltyModule' },  
  { path: 'deposit',      loadChildren: './wallet-manager/deposit/deposit.module#DepositModule' },
  { path: 'royalty',      loadChildren: './wallet-manager/royalty/royalty.module#RoyaltyModule' }, 
  { path: 'transfer',     loadChildren: './wallet-manager/transfer/transfer.module#TransferModule' },
  { path: 'withdraw',     loadChildren: './wallet-manager/withdraw/withdraw.module#WithdrawModule' },
  { path: 'transaction',  loadChildren: './wallet-manager/transaction/transaction.module#TransactionModule' },

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
export class WalletModule { }
