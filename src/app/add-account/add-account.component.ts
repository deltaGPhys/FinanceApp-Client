import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AccountService } from '../services/account-service';
import { Account } from '../models/Account';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  currentUser: User;
  newBalance: number;
  accountCreated: boolean = false;
  createdAccount: Account;
  acctName: string;

  constructor(private userService: UserService, private accountService: AccountService) { }


  ngOnInit() {
    this.userService.currentUser$.subscribe(data => this.currentUser = data);
  }

  makeNewCheckingAccount(){
    console.log("button pressed");
    this.accountService.createChecking(this.createdAccount).subscribe(
      account => this.createdAccount = account
      );
  }

  makeNewSavingsAccount(){
    console.log("button pressed");
    this.accountService.createSavings(this.createdAccount).subscribe(
      account => this.createdAccount = account);
  }

}
