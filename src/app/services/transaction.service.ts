import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Transaction } from '../models/Transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService {
    
    @Inject(apiUrl) private apiUrl: string;
    private transactionsUrl: string = apiUrl+"/transactions";
    transTypes$: Observable<string[]>; 
    transactions: Transaction[];

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { 
      this.getTransactions().subscribe(transactions => {this.transactions = transactions});
      this.transTypes$ = this.getTransTypes();
    }

    /** GET Transactions from the server */
    getTransactions (): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(this.transactionsUrl)
          .pipe(
              tap(_ => console.log('fetched Transactions')),
              catchError(this.handleError<Transaction[]>('getTransactions', []))
          );
    }

    /** GET Transaction types from the server */
    getTransTypes(): Observable<string[]> {
      return this.http.get<string[]>(apiUrl+"/transactiontypes")
      .pipe(
          tap(_ => console.log('fetched Transaction Types')),
          catchError(this.handleError<string[]>('getTransactionTypes', []))
      );
    }

  /** POST: add a new Transaction to the server */
  addTransaction (transaction: Transaction): Observable<Transaction> {

    console.log(transaction);
    
    return this.http.post<Transaction>(this.transactionsUrl, transaction, this.httpOptions)
    .pipe(
      catchError(this.handleError('addTransaction', transaction))
    );

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('error');
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
