import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;
import{TransactionService} from '../services/transaction.service'
import { catchError, tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})

export class AccountService {
   

  

  @Inject(apiUrl) private apiUrl: string;
  accountsUrl: string = apiUrl+"/accounts";
  accounts:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedAccounts:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentUser$: BehaviorSubject<any> = new BehaviorSubject([]);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  
  
  constructor(private http:HttpClient) { 
  }
  public getAllAccounts():Observable<Account[]>{
    return this.http.get<Account[]>(this.accountsUrl + '/accounts');
  }

  // public getCheckingAccount(userId:number): Observable<Account[]> {
  //   return this.http.get<Account[]>(this.accountsUrl +'/checking/' + this.currentUser$);
  // }
  // public getSavingsAccount(userId:number): Observable<Account[]> {
  //   return this.http.get<Account[]>(this.accountsUrl +'/savings/' + this.currentUser$);
  // }

  // public showAllChecking(accountNumber:number): Observable<Account[]> {
  //   return this.http.get<Account[]>(this.accountsUrl +'/checkingForUser/' + this.currentUser$);
  // }

  // public showAllSavings(accountNumber:number): Observable<Account[]> {
  //   return this.http.get<Account[]>(this.accountsUrl +'/savingsForUser/' + this.currentUser$);
  // }
  // public getCheckingAccountsForUser(userId: number): Observable<Account> {
  //   return this.http.get<Account>(this.accountsUrl + '/checkingByUser/' + this.currentUser$);
  // }

  // public getSavingsAccountsForUser(userId: number): Observable<Account> {
  //   return this.http.get<Account>(this.accountsUrl + '/savingsByUser/' + this.currentUser$);
  // }
 
  // public save(accounts: Account) {
  //   return this.http.post<Account>(this.accountsUrl +'/accounts/createdAccount', accounts);
  // }
  // public closeChecking(id: Number) {
  //   return this.http.delete<Account[]>(this.accountsUrl + '/checkingClosed/'+ id);
  // }

  // public closeSavings(id: Number) {
  //   return this.http.delete<Account[]>(this.accountsUrl + '/savingsClosed/'+ id);
  // }

  public createChecking(accounts:Account): Observable<Account>{
    return this.http.post<Account>(this.accountsUrl + '/checkingCreated/', accounts);
  }
  public createSavings(accounts:Account): Observable<Account>{
    return this.http.post<Account>(this.accountsUrl + '/savingsCreated/', accounts);
  }

  // public accountDeposit(transactionService:TransactionService){
  //   return this.http.put<Account>(this.accountsUrl+'/deposit/',transactionService);
  // }
  // public accountWithdraw(ransactionService:TransactionService){
  //   return this.http.put<Account>(this.accountsUrl+'/withdraw/',TransactionService);
  // }
  // public transferSender(ransactionService:TransactionService){
  //   return this.http.put<Account>(this.accountsUrl+'/transfer/',TransactionService);
  // }
  // public transferRecipient(ransactionService:TransactionService){
  //   return this.http.put<Account>(this.accountsUrl+'/transfer/',TransactionService);
  // }
  public getAccountsByUserId(id:number){
    return this.http.get<Account[]>(this.accountsUrl+'/userAccounts/'+id, this.httpOptions)
      .pipe(
        tap(data => console.log('fetched InvAcct', data)),
        catchError(this.handleError<Account[]>('getAcct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
  }

}