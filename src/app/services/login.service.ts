import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  @Inject(apiUrl) private apiUrl: string;
  //private registerUrl: string = apiUrl+"/account/"+id;
  private verifyUrl : string = apiUrl +"/login/verify/";
  private getUserByEmail : string = apiUrl + "/login/users/";
  loggedIn : boolean = false;
  user: User;
  userToDisplay$: BehaviorSubject<any> = new BehaviorSubject([]);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  verifyUser (email:string, password:string) : Observable<boolean> {
    return this.http.get<boolean>(this.verifyUrl+email+"/"+password, this.httpOptions)
    .pipe(tap(data => console.log(data)),
    catchError(this.handleError<boolean>('verification', false)));
  }

  findUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(this.getUserByEmail+email, this.httpOptions)
    .pipe(tap(data => console.log(data)),
    catchError(this.handleError<User>('verification', null)));
  }


  //This ties in with the userToDisplay Behavior Subject Above
  updateLoggedInUser(user : User) {
    this.userToDisplay$.next(user);
    console.log(status)
  }

// getUser(id:number):Observable<User>{

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