import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from '../services/account-service';
import{TransactionService} from '../services/transaction.service'
import { Account } from '../models/account'


@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {

  @Input() account: Account;
  accounts:Account[];
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService:TransactionService,
  ){}

  ngOnInit() {
    this.getChecking();
    this.getSavings();
    
  }
  getChecking(): void {
    this.transactionService.getTransactions();
    const id = +this.route.snapshot.paramMap.get('accountId');
    this.accountService.getCheckingAccount(id).subscribe(accounts => this.accounts = accounts)
  }

  getSavings(): void {
    this.transactionService.getTransactions();
    const id = +this.route.snapshot.paramMap.get('accountId');
    this.accountService.getSavingsAccount(id).subscribe(accounts => this.accounts = accounts)
  }
  remove(id: Number) {
    this.accountService.closeChecking(id).subscribe(data => { this.gotoAccountsList() });
    this.accountService.closeSavings(id).subscribe(data => { this.gotoAccountsList() });

  }
  gotoAccountsList() {
    this.router.navigateByUrl('accounts');
  }
}
