import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { AccountService } from '../services/account-service';
import { User } from '../models/User';
import { Account } from '../models/account';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  currentUser: User;
  userAccounts: Account[];
  selectedAccount: Account;
  accountDeleted: boolean = false;

  constructor(private userService: UserService, private accountService: AccountService, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.userToDisplay$.subscribe(data => this.currentUser = data);
    this.accountService.getAccountsById(this.currentUser.id)
    .subscribe(accounts => this.userAccounts = accounts);
  }

  deleteAccount(){
    this.accountService.deleteAccount(this.selectedAccount.id).
    subscribe(result => {this.accountDeleted = result; 
      this.accountService.getAccountsById(this.currentUser.id)
      .subscribe(accounts => this.userAccounts = accounts)});
    delete this.selectedAccount;
  }

}
