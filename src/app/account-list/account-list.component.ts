import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { AccountService } from '../services/account-service';
import { Accounttype } from '../models/accounttype';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { AccountFormComponent } from '../account-form/account-form.component';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  private user: User;

  date: Date;
  accounts: any = [];
  selectedAccount: Account;
  createAccount: boolean;
  account: Account;
  accountTypes: Accounttype[];
  selectedAccountType: Accounttype;
  accountType: string;
  accountNumber: number;
  showAccounts: Accounttype[];
  currentUser: User;

  constructor(private accountService: AccountService,
    private userService: UserService,
    private route: Router) {
  }

  ngOnInit() { 

    this.getUserAccounts();

  }
  getUserAccounts() {
    // this.accountService.getAllAccounts().subscribe(data => {this.accounts = data});
    this.userService.currentUser$.subscribe(data => {this.currentUser = data});
    this.accountService.getAccountsByUserId(this.currentUser.id).subscribe(data => { this.accounts = data });
    this.accountService.getSavingsAccountsForUser(this.currentUser.id).subscribe(data => { this.accounts = data; });
  }

  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
}
