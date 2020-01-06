import {Component, Input, OnInit} from '@angular/core';
import { Account } from '../models/account';
import {AccountService} from '../services/account-service';
import {Accounttype} from '../models/accounttype';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { User } from '../models/User';




@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    private createAccountForm: FormGroup;
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
      this.createAccountForm = this.createFormGroup();
    }

    ngOnInit() {
        // this.userId = +this.route.snapshot.paramMap.get('id');
        console.log('init called');
        this.getAccounts();
        this.accountType = 'Type';
        this.accountService.getAccountTypes().subscribe(accountType => this.accountTypes = accountType);
    }
    createFormGroup() {
        return new FormGroup({
            name: new FormControl(''),
            accountType: new FormControl(''),
            balance: new FormControl(''),
            description: new FormControl('')
      });
      }
    
    getAccounts(): void {
        this.accountService.getAccounts(this.userId).subscribe(accounts => this.accounts = accounts);
    }

    onSelect(account: Account): void {
        this.selectedAccount = account;
    }

    onClick(): void {
      this.createAccount = !this.createAccount;
    }

    // add(id: number, balance: number, openingDate: number, accountTypeId: number, accountType: string, userId: number, owner: string, acctName: string): void {

    //     if (!this.validDeposit(name, accountType, balance)) {
    //         return;
    //     }
       
    //     accountTypeId = this.accountTypeId;
    //     userId = this.userId;
    //     this.accountService.addAccount()
    //         .subscribe(account => {this.accounts.push(account);}
    //         );
    //     this.createAccount = false;
    // }


    onSelectAccountType(accountType: Accounttype) {
        this.selectedAccountType = accountType;
        this.accountType = this.selectedAccountType.description;
        this.accountTypeId = this.selectedAccountType.id;
    }

    private validDeposit(name: string, accountType: string, balance: number) {
        if (!name) {
            return false;
        }
        if (!balance) {
            return false;
        }
        if (!this.userId) {
            return false;
        }
        if (!this.accountTypeId) {
            return false;
        }
        return true;
    }
}
