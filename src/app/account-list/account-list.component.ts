import {Component, Input, OnInit} from '@angular/core';
import { Account } from '../models/account';
import {AccountService} from '../services/account-service';
import {Accounttype} from '../models/accounttype';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { User } from '../models/User';




@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
    private user: User = new User(1,"Jim","Jones","aol@aol.com","salty",1000.0,2000.0);
    
    date:Date;
    accounts: any = []
    selectedAccount: Account;
    createAccount: boolean;
    account: Account;
    accountTypes: Accounttype[];
    selectedAccountType: Accounttype;
    accountType: string;
    accountNumber: number;
    showAccounts: Accounttype[];

    constructor(private accountService: AccountService, private route: Router) {
    }

    ngOnInit() {
        this.getUserAccounts();

    }
    getUserAccounts()  {

        this.accountService.getAccountsByUserId(1).subscribe(data => {this.accounts = data});
            this.accountService.getSavingsAccountsForUser(1).subscribe(data => {this.accounts = data;});
      }

      onSelect(account: Account): void {
        this.selectedAccount = account;
      }
    }
