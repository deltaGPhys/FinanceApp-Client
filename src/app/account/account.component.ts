import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id: number;
  balance : number;
  openingDate : Date;
  accountNumber: number;
  accountType: string
  userid: number;
  acctName : string;

  
  constructor() { }

  ngOnInit() {
  }

}
