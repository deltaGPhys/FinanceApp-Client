import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  currentUser: User;
  
  @Inject(apiUrl) private apiUrl: string;
  private registerUrl: string = apiUrl+"/login";
  private getUserByEmail : string = apiUrl + "/login/users/";
  private getuserById: string = apiUrl + "/login/users/id/{id}"


  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { 
  
  }

  getUser(userEmail: string) : Observable<any>{
    return this.http.get<any>(this.getUserByEmail, this.httpOptions).pipe(map(userData => {sessionStorage
        .setItem('userId', userData.userId)}));
    }
       

  displayUser(): Observable<User>{
    return null
  }

//Add a new user to the database
//addUser(user: User): Observable<User>{
  //console.log(apiUrl);
  //console.log(this.registerUrl);
//   return this.http.post<User>(this.registerUrl, user, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError<User>('addUser')));
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