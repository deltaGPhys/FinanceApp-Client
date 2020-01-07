import {Component, Input, OnInit} from '@angular/core';
import { Account } from '../models/account';
import {AccountService} from '../services/account-service';
import {Accounttype} from '../models/accounttype';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { User } from '../models/User';




@Component({
    selector: 'app-accounts',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
    private user: User;

    date:Date;
    @Input('userId') userId: number;
    accounts: Account[];
    selectedAccount: Account;
    createAccount: boolean;
    account: Account;
    accountTypes: Accounttype[];
    selectedAccountType: Accounttype;
    accountType: string;
    accountTypeId: number;

    constructor(private accountService: AccountService, private route: Router) {
    }

    ngOnInit() {
        this.accountService.showAllChecking().subscribe(data => this.accounts = data);
        this.accountService.showAllSavings().subscribe(data => this.accounts = data);

    }
    
    
    }

