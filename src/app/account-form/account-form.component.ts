import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from '../services/account-service';
import { Account } from '../models/account'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{AddAccountService} from '../services/add-account.service'


@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  
  account: Account;
  accountType:Account;
  createAccountForm: FormGroup;
  

  constructor(private route: ActivatedRoute, private accountService: AccountService) {
      this.createAccountForm = this.createFormGroup();
    } 
    
    ngOnInit() {


  }
    createFormGroup(){
      return new FormGroup({
        acctName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        balance: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')])
      });
    }

    revert(){
      this.createAccountForm.reset();
    }

    get acctName() {
      return this.createAccountForm.get('acctName');
    }

    get balance(){
      return this.createAccountForm.get('balance');
    }

 
 
 onSubmit() {
    // this.accountService.save(this.account).subscribe(data => this.gotoAccountsList());

  }
  // gotoAccountsList() {
  //   this.router.navigateByUrl('accounts');
  // }
}