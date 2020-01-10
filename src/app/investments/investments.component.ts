import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';

import { User } from '../models/User';
import { InvestmentService } from '../services/investment.service';
import { Investment } from '../models/Investment';
import { SecurityHolding } from '../models/SecurityHolding';
import { Security } from '../models/Security';


@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  user: User = new User(1,"Jim","Jones","aol@aol.com","salty",1000.0,2000.0);
  account: Investment;
  securities: Security[];
  holdings: SecurityHolding[];
  numbers: number[];
  selectedStock: Security;

  constructor(private investmentService: InvestmentService) { 
    // this.investmentService.numsChange.subscribe(value => this.numbers= value);
    this.investmentService.hldgsChange.subscribe(value => {this.holdings= value;});
  }

  ngOnInit() {
    console.log("investments init");
    this.investmentService.getAccountForUser(1)
      .subscribe(account => {
        this.account = account; 
      });
    this.investmentService.getSecurities()
      .subscribe(x => this.securities = x);
    
    
  }

  // acctTest():void {
  //   if (this.numbers == null) {
  //     console.log('null');
  //     this.numbers = [1];
  //   }
  //   this.numbers = [...this.numbers, this.numbers.length+1];
  //   this.investmentService.numbersChange(this.numbers);
  // }


}
