import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from '../services/account-service';
import{TransactionService} from '../services/transaction.service'
import { Account } from '../models/Account'


@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {

  @Input() account: Account;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService:TransactionService,
    private transactions:TransactionListByAccountComponent
  ){}

  ngOnInit() {
    this.getChecking();
    this.getSavings();
    
  }
  getChecking(): void {
    this.transactions.getTransactions();
    const id = +this.route.snapshot.paramMap.get('accountId');
    this.accountService.getCheckingAccount(id).subscribe(account => this.account = account)
  }

  getSavings(): void {
    this.transactions.getTransactions();
    const id = +this.route.snapshot.paramMap.get('accountId');
    this.accountService.getSavingsAccount(id).subscribe(account => this.account = account)
  }
  remove(id: Number) {
    this.accountService.closeChecking(id).subscribe(data => { this.gotoAccountsList() });
    this.accountService.closeSavings(id).subscribe(data => { this.gotoAccountsList() });

  }
  gotoAccountsList() {
    this.router.navigateByUrl('accounts');
  }
}
