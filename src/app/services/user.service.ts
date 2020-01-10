import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';import { map, catchError, tap } from 'rxjs/operators';
 export const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Inject(apiUrl) private apiUrl: string;
  private loginUrl : string = apiUrl +"/login";
  private updateUserProfileUrl: string = apiUrl + "/dashboard/user/update"; 
  currentUser$: BehaviorSubject<any> = new BehaviorSubject([]);
  isEmailAvailable$: BehaviorSubject<any> = new BehaviorSubject([]);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { 

  }

  verifyUser (email:string, password:string) : Observable<User> {
    let reqData: Object = {"email": email, "password": password};
    return this.http.post<User>(this.loginUrl+"/verify", reqData, this.httpOptions)
    .pipe(tap(data => {console.log(data);}),
    catchError(this.handleError<User>('verification', null)));
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    let reqData: Object = {"email": email};
    return this.http.post<boolean>(this.loginUrl+"/checkEmail", reqData, this.httpOptions);
      //.pipe(tap(data => console.log(data)));
  }
  
  updateCurrentUser(user : User) {
    console.log("user update in service",user);
    this.currentUser$.next(user);
  }

  // updateUserProfile(user: User): Observable<User>{
  //   //console.log(apiUrl);
  //   //console.log(this.registerUrl);
  //   return this.http.post<User>(this.registerUrl, user, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError<User>('addUser')));
  // }
  
  updateUserProfile(user: User) :Observable<User>{
    //let reqData: Object = {"id": userId, "firstName": firstName, "lastName": lastName};
    return this.http.post<User>(this.updateUserProfileUrl, user, this.httpOptions)
        .pipe(tap(data => {console.log(data);catchError(this.handleError<User>('updateProfile', null))}));
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
