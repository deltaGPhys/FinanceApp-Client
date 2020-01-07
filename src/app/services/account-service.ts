import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import{TransactionService} from '../services/transaction.service'


@Injectable({providedIn: 'root'})

export class AccountService {
   

  private accountsUrl: string;

  @Inject(apiUrl) private apiUrl: string;
  private accountUrl: string = apiUrl+"/accounts";
  accounts:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedAccounts:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  
  
  constructor(private http:HttpClient) { 
     this.accountUrl = 'http://localhost:4200/API/accounts';
  }

  public getCheckingAccount(userId:number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl +'/accounts/checking/id/' + userId);
  }
  public getSavingsAccount(userId:number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl +'/accounts/savings/id/' + userId);
  }

  public showAllChecking(accountNumber:number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl +'/accounts/checking/id/' + accountNumber);
  }

  public showAllSavings(accountNumber:number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl +'/accounts/savings/id/' + accountNumber);
  }
  public getCheckingAccountsForUser(userId: number): Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + '/accounts/checking/' + userId);
  }

  public getSavingsAccountsForUser(userId: number): Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + '/accounts/savings/' + userId);
  }
 
  public save(accounts: Account) {
    return this.http.post<Account>(this.accountsUrl +'/accounts/createdAccount', accounts);
  }
  public closeChecking(id: Number) {
    return this.http.delete<Account[]>(this.accountsUrl + '/accounts/'+ id);
  }

  public closeSavings(id: Number) {
    return this.http.delete<Account[]>(this.accountsUrl + '/accounts/'+ id);
  }

  public createChecking(accounts:Account): Observable<Account>{
    return this.http.post<Account>(this.accountUrl + '/accounts/checking/', accounts);
  }

  public accountDeposit(transactionService:TransactionService){
    return this.http.put<Account>(this.accountsUrl+'/accounts/deposit/',transactionService);
  }
  public accountWithdraw(ransactionService:TransactionService){
    return this.http.put<Account>(this.accountsUrl+'/accounts/withdraw/',TransactionService);
  }
  public transferSender(ransactionService:TransactionService){
    return this.http.put<Account>(this.accountsUrl+'/accounts/transferSender/',TransactionService);
  }
  public transferRecipient(ransactionService:TransactionService){
    return this.http.put<Account>(this.accountsUrl+'/accounts/transferRecipient/',TransactionService);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
  }

}