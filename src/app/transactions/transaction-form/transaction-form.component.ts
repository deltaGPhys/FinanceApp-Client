import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../services/transaction.service';
import { Form } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit{

  @Input() transTypes: string[];
  newTransactionForm;
  @Input() transactions: Transaction[];

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder) {
    
    
    this.newTransactionForm = this.formBuilder.group({
      id: null,
      account: 2,
      comment: "",
      amount: 0,
      type: ""
    });
  }

  ngOnInit () {
  }

  submitTransactionForm(form): void {
    console.log(form);
    this.transactionService.addTransaction(form).subscribe(trans => {this.transactions.push(trans);});
  }
  

}
