// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseListComponent } from './expenses/expense-list.component';
import { ExpenseFormComponent } from './expenses/expense-form.component';

import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberFormComponent } from './members/member-form/member-form.component';

import { VendorListComponent } from './vendors/vendor-list/vendor-list.component';
import { VendorFormComponent } from './vendors/vendor-form/vendor-form.component';

import { BankaccountListComponent } from './bankaccounts/bankaccount-list/bankaccount-list.component';
import { BankaccountFormComponent } from './bankaccounts/bankaccount-form/bankaccount-form.component';

import { BillListComponent } from './bills/bill-list/bill-list.component';
import { BillFormComponent } from './bills/bill-form/bill-form.component';

import { BudgetListComponent } from './budgets/budget-list/budget-list.component';
import { BudgetFormComponent } from './budgets/budget-form/budget-form.component';

import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },

  // Expenses
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/create', component: ExpenseFormComponent },
  { path: 'expenses/edit/:id', component: ExpenseFormComponent },

  // Members
  { path: 'members', component: MemberListComponent },
  { path: 'members/create', component: MemberFormComponent },
  { path: 'members/edit/:id', component: MemberFormComponent },

  // Vendors
  { path: 'vendors', component: VendorListComponent },
  { path: 'vendors/create', component: VendorFormComponent },
  { path: 'vendors/edit/:id', component: VendorFormComponent },

  // Bank Accounts
  { path: 'bankaccounts', component: BankaccountListComponent },
  { path: 'bankaccounts/create', component: BankaccountFormComponent },
  { path: 'bankaccounts/edit/:id', component: BankaccountFormComponent },

  // Bills
  { path: 'bills', component: BillListComponent },
  { path: 'bills/create', component: BillFormComponent },
  { path: 'bills/edit/:id', component: BillFormComponent },

  // Budgets
  { path: 'budgets', component: BudgetListComponent },
  { path: 'budgets/create', component: BudgetFormComponent },
  { path: 'budgets/edit/:id', component: BudgetFormComponent },

  // Auth
  { path: 'login', component: LoginComponent },

  // Fallback
  { path: '**', redirectTo: '' }
];
