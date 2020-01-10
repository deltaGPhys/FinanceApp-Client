import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/loginComponent/login.component';
import { GoalsComponent } from './goals/goalsComponent/goals.component';
import { AccountListComponent } from './account-list/account-list.component';
import { InvestmentsComponent } from './investments/investments.component';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';
import { AddGoalComponent } from './goals/add-goal/add-goal.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransfersComponent } from './transfers/transfers/transfers.component';
import { RegisterUserComponent } from './login/register-user/register-user.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'transactions', component: TransactionListComponent },
    { path: 'goals', component: GoalsComponent },
    { path: 'accounts', component: AccountListComponent },
    { path: 'transfers', component: TransfersComponent },
    { path: 'investments', component: InvestmentsComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: 'transactions', component: TransactionFormComponent },
    { path: 'createGoal', component: AddGoalComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
