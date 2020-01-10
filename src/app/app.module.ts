import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TransactionService } from './services/transaction.service';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';

import { LoginComponent } from './login/loginComponent/login.component';

import { GoalsComponent } from './goals/goalsComponent/goals.component';

import { AccountListComponent } from './account-list/account-list.component';

import { InvestmentsComponent } from './investments/investments.component';
import { InvestmentHeaderComponent } from './investments/investment-header/investment-header.component';
import { HoldingsListComponent } from './investments/holdings-list/holdings-list.component';
import { InvestmentBuyFormComponent } from './investments/investment-buy-form/investment-buy-form.component';
import { SecurityGraphComponent } from './investments/security-graph/security-graph.component';

import { TransactionViewComponent } from './transactions/transaction-view/transaction-view.component';

import { AddGoalComponent } from './goals/add-goal/add-goal.component';
import { GoalServiceService } from './services/goal-service.service';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransfersComponent } from './transfers/transfers/transfers.component';

import { RegisterUserComponent } from './login/register-user/register-user.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { ExampleReportComponent } from './transactions/example-report/example-report.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import { AccountComponent } from './account/account.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    TransactionViewComponent,
    LoginComponent,
    GoalsComponent,
    AccountListComponent,
    InvestmentsComponent,
    TransactionFormComponent,
    InvestmentHeaderComponent,
    HoldingsListComponent,
    RegisterUserComponent,
    InvestmentBuyFormComponent,
    SecurityGraphComponent,
    AddGoalComponent,
    TransfersComponent,
    AddAccountComponent,
    ExampleReportComponent,
    AccountFormComponent,
    AccountOverviewComponent,
    AccountComponent,
    UpdateUserComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RxReactiveFormsModule,
  ],
  providers: [TransactionService, GoalServiceService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
