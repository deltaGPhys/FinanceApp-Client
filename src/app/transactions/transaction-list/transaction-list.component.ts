import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../services/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {

  closeResult: string;
  transactions: Transaction[];
  transTypes: string[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private transactionService: TransactionService, private modalService: NgbModal) { 
    this.transactions = this.transactionService.transactions;
    this.transactionService.transTypes$.subscribe(data => this.transTypes = data);
  }


  ngOnInit() {
    this.transactionService.getTransactions().subscribe(transactions => this.transactions = transactions);
    
    
  }

  openScrollableContent(transactionReport) {
    this.modalService.open(transactionReport, { windowClass : "transactionModalClass", scrollable: true });
  }

  // getTransactions() {
  //   this.transactions = [
  //     new Transaction(2,"DEPOSIT",123.45,"Jar of coins"),
  //     new Transaction(7,"WITHDRAWAL",45.67,"Online purchase from catsweaters.com")
  //   ];
  //   return this.transactions;

  // }

}
