import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User} from '../models/User';


@Injectable({
  providedIn: 'root'
})

export class CreateAccountService {
  
  @Inject(apiUrl) private apiUrl: string;
  private registerUrl: string = apiUrl+"/login/register";
  private getEmailsUrl: string = apiUrl+"/login/users/email";
  private getAllUsersUrl: string = apiUrl+"/login/users";
  private checkEmailExists: string = apiUrl + "/login/users/{userName}"
  private emailObservable: Observable<string[]>;
  private allEmails : string[];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }


  //Add a new user to the database
  addUser(user: User): Observable<User>{
    //console.log(apiUrl);
    //console.log(this.registerUrl);
    return this.http.post<User>(this.registerUrl, user, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError<User>('addUser')));
  }



  getUserEmails(): Observable<string[]>{
    return this.http.get<string[]>(this.getEmailsUrl).pipe(tap(data => console.log('fetched emails')),catchError(this.handleError<string[]>('getUserEmails', [])));
  }

  getAllEmails() : Observable<string[]>{
    return this.http.get<string[]>(this.getEmailsUrl, this.httpOptions)
            .pipe(tap(data => console.log(data)), 
            catchError(this.handleError<string[]>('getAllUserEmails', [])));
  }

  getAllUsers(){
    return this.http.get(this.getAllUsersUrl, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError<string>('getAllUsers')));
  }

// allTheEmails(){
//   return this.http.get(this.getEmailsUrl).subscribe(data => {this.data = data.results})

// }



// getUser(id:number):Observable<User>{

// }

//saveUser()

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
