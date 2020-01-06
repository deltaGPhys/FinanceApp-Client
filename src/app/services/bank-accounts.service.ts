import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { apiUrl } from './user-service.service';
import { tap, catchError } from 'rxjs/operators';
import { SavingGoal } from '../models/Saving-goal.model';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  @Inject(apiUrl) private apiUrl: string;
  private allCheckingAccountsUrl : string;
  savingGoals$ : BehaviorSubject<any> = new BehaviorSubject<any>([]);  

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getAllCheckingAccounts() : Observable<any[]>{
    return this.http.get<Account[]>(this.allCheckingAccountsUrl, this.httpOptions)
        .pipe(tap(data => console.log(data)),
        catchError(this.handleError<Account[]>('getAllCheckingInDB', [])));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
