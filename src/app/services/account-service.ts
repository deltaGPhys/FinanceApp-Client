import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
// import{Transactions} from '../transactions'



@Injectable({providedIn: 'root'})

export class AccountService {

  private accountsUrl: string;

  @Inject(apiUrl) private apiUrl: string;
  private accountUrl = `{this.apiUrl}/account`;
  accounts:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedAccounts:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  
  
  constructor(private http:HttpClient) { 
     this.accountUrl = 'http://localhost:8080/API';
  }

  public getCheckingAccount(userId:number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl +'/accounts/checking/id/' + userId);
  }
  public getSavingsAccount(userId:number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl +'/accounts/savings/id/' + userId);
  }
  public getCheckingAccountsForUser(userId: number): Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + '/accounts/checking/' + userId);
  }

  public getSavingsAccountsForUser(userId: number): Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + '/accounts/savings/' + userId);
  }
 
  public save(accounts: Account) {
    return this.http.post<Account>(this.accountsUrl +'/accounts/dummy_created', accounts);

  }
  public closeChecking(id: Number) {
    return this.http.delete<Account[]>(this.accountsUrl + '/accounts/'+ id);
  }

//   public closeSavings(id: Number) {
//     return this.http.delete<Account[]>(this.accountsUrl + '/accounts/'+ id);
// }
//   public accountDeposit(transaction:Transactions){
//     return this.http.put<Account>(this.accountsUrl+'/accounts/deposit/',transaction);
//   }
//   public accountWithdraw(transaction:Transactions){
//     return this.http.put<Account>(this.accountsUrl+'/accounts/withdraw/',transaction);
//   }
//   public transferSender(transaction:Transactions){
//     return this.http.put<Account>(this.accountsUrl+'/accounts/transferSender/',transaction);
//   }
//   public transferRecipient(transaction:Transactions){
//     return this.http.put<Account>(this.accountsUrl+'/accounts/transferRecipient/',transaction);
//   }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
  }

}