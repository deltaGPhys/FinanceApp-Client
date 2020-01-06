import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Account } from '../models/account';
import {environment } from 'src/environments/environment';
import { Accounttype } from '../models/accounttype';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/User';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser: User;

  [x: string]: any;
  apiUrl = environment.apiUrl;
  private accountUrl = `${this.apiUrl}/account`;
  constructor(private http:HttpClient) { 
    // this.accountUrl = """;
    // this.accountUrl = '';
  }

  public getAccount(): Observable<Account>{
    return this.http.get<Account>(this.accountUrl + "/1")
  }

  getAccounts(userId: number): Observable<Account[]> {
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.get<Account[]>(url)
        .pipe(
            tap(_ => this.log('Account Data')),
            catchError(this.handleError<Account[]>('getAccounts', []))
        );
}

  public getAccountsByUser(userid: string
    
    ): Observable<Account[]>{
    return this.http.get<Account[]>(this.apiUrl + "/api/accounts/user/" + userid);
  }

  public createAccount(id:number, balance: number, openingDate:Date, accountTypeId:number,  userid: number, owner:string, acctName: string): Observable<Account>{
    let newAccount: Account = {id: 0, balance: balance, openingDate:openingDate, accountTypeId:accountTypeId,  userid: userid, owner:owner, acctName:acctName}
    console.log("creating new account with userid:" + newAccount.id);
   return this.http.post<Account>(this.apiUrl + "/api/accounts", newAccount);
  }

  getAccountTypes(): Observable<Accounttype[]> {
    const url = `${this.apiUrl}/accounttype`;
    this.http.get(url).subscribe(data => {
        console.log(data);
    });
    return this.http.get<Accounttype[]>(url);
  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
  };
}

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, httpOptions).pipe(
        tap((newAccount: Account) => this.log(`added account`)),
        catchError(this.handleError<Account>('addAccount')));
}

  public deleteAccount(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.apiUrl + "/api/accounts/" + id);
  }


}