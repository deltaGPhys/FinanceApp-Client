import { Injectable, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'; export const apiUrl = environment.apiUrl;

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Investment } from '../models/Investment';
import { Security } from '../models/Security';
import { SecurityHolding } from '../models/SecurityHolding';
import { PriceHistory } from '../models/PriceHistory';

import { PortfolioValues } from '../models/portfolio-values';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
    
    @Inject(apiUrl) private apiUrl: string;
    private investmentUrl: string = apiUrl+"/investment/";
    acctChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    hldgsChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    secChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    portValsChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    stkChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    histChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    currentUser: User;
    account: Account;
    graphWidth$: BehaviorSubject<any> = new BehaviorSubject([]);
    graphHeight$: BehaviorSubject<any> = new BehaviorSubject([]);
    infoWindow$: BehaviorSubject<any> = new BehaviorSubject([]);

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  
    constructor(private http: HttpClient, private userService: UserService) { 
      this.infoWindow$.next('portfolio');
      this.acctChange.subscribe(data => {this.account = data; console.log("inv service gets account",data, !(data));});
      this.userService.currentUser$
        .subscribe(data => {
          this.currentUser = data; 
          this.getSecurities();
          this.historyChange(null);
          console.log('getting account for user',this.currentUser.id);
          if (this.currentUser.id) {
            this.getAccountForUser(this.currentUser.id).subscribe(data => this.accountChange(data));
          }
        });
      
    }

  

    initialHoldings(): void {
      let holdingsInit: SecurityHolding[] = [];
      console.log('getting holdings for user ',this.account.id);
      if (this.account != null) {
        this.getHoldings(this.account.id).subscribe(data => {
          console.log("get holdings data",data);
          this.hldgsChange.next(data);
        });
      }
    }

    holdingsChange(data: SecurityHolding[]) {
      console.log('hchange');
      let newH = this.calculateHoldingValues(data);
      this.hldgsChange.next(newH);

      this.portfolioValuesChange(newH);
    }

    securitiesChange(data: Security[]) {
      this.secChange.next(data);
    }

    portfolioValuesChange(data: SecurityHolding[]) {
      let portData: PortfolioValues = {
        'current':this.calculatePortfolioValue(data),
        'dayChange':this.calculatePortfolioValueChange(data),
        'cumChange':this.calculatePortfolioGains(data)
      };
      this.portValsChange.next(portData);
    }

    stockChange(data: [Security,string]) {
      let date = (data[1] != null) ? this.parseDate(data[1]): null;
      if (data[0] != null) {
        this.getSecurityHistory(data[0], date).subscribe(data => {this.historyChange(new PriceHistory(data.id,data.dates,data.prices,data.startDate));});
        this.stkChange.next(data);
      } 
    }

    parseDate(array) : string {
      let result: string = array[0] + "-";
      result += (array[1] >= 10) ? array[1] : ("0" + array[1]);
      result += "-";
      result += (array[2] >= 10) ? array[2] : ("0" + array[2]);
      return result;
    }

    historyChange(data: PriceHistory) {
      this.histChange.next(data);
    }

    accountChange(data: Investment) {
      this.acctChange.next(data);
      if (data) {
        this.initialHoldings();
      }
    }

    toggleDisplay(view: string) {
      this.infoWindow$.next(view);
    }

    // /** GET Account from the server */
    // getAccount (id): Observable<Investment> {
    //     return this.http.get<Investment>(this.investmentUrl+id)
    //         .pipe(
    //             tap(_ => console.log('fetched InvAcct')),
    //             catchError(this.handleError<Investment>('getAcct'))
    //         );
    // }

    /** GET Account from the server for user*/
    getAccountForUser (userId): Observable<Investment> {
      console.log("GET FOR USER,", userId, this.investmentUrl+"user/"+userId);
      return this.http.get<Investment>(this.investmentUrl+"user/"+userId, this.httpOptions)
          .pipe(
              tap(data => console.log('fetched InvAcct', data)),
              catchError(this.handleError<Investment>('getAcct'))
          );
    }

    /** GET Securities from the server */
    getSecurities (): Observable<Security[]> {
      return this.http.get<Security[]>(this.investmentUrl+"securities")
          .pipe(
              tap(data => {console.log('fetched Securities');this.securitiesChange(data);}),
              catchError(this.handleError<Security[]>('getSec'))
          );
    }

    /** GET history for this security from the server */
    getSecurityHistory (security: Security, startDate: string): Observable<PriceHistory> {
      let data: Object = {"startDate": startDate};
      let params = new HttpParams()
        .set('startDate', startDate);
      return this.http.get<PriceHistory>(apiUrl+"/security/"+security.id, {params: params})
          .pipe(
              tap(data => {console.log('fetched Security history', data);}),
              catchError(this.handleError<PriceHistory>('getSecH'))
          );
    }

    /** GET holding for this user from the server */
    getHoldings (accountId): Observable<SecurityHolding[]> {
      return this.http.get<SecurityHolding[]>(this.investmentUrl+"holdings/"+accountId)
          .pipe(
              tap(data => {console.log('fetched Holdings');}),
              tap(data => this.calculateHoldingValues(data)),
              tap(data => {this.portfolioValuesChange(data);}),
              catchError(this.handleError<SecurityHolding[]>('getHold'))
          );
    }

    /** Calculate current values of each stock holding */
    calculateHoldingValues (holdings: SecurityHolding[]): SecurityHolding[] {
      for (let holding of holdings) {
          holding.purchaseValue = holding.purchaseCost * holding.numShares;
          holding.value = holding.security.currentPrice * holding.numShares;
      }
      return holdings;
    }

    /** Calculate total value of current holdings */
    calculatePortfolioValue(holdings: SecurityHolding[]) {
      let total = 0;
      for (let holding of holdings) {
        total += holding.value;
      }
      return total;
    }

    /** PUT modify investment account balance */
    updateInvestmentBalance(acctId: number, balance: number) {
      return
    }

    /** Calculate change from previous values for portfolio */
    calculatePortfolioValueChange(holdings: SecurityHolding[]) {
      let total = 0;
      for (let holding of holdings) {
        total += holding.numShares * holding.security.dayChange;
      }
      return total;
    }

    /** Calculate change from purchase values for portfolio */
    calculatePortfolioGains(holdings: SecurityHolding[]) {
      let total = 0;
      for (let holding of holdings) {
        total += holding.value - holding.purchaseValue;
      }
      return total;
    }

//   //////// Save methods //////////

  /** POST: add a new SecurityHolding to the server */
  addHolding (securityId: number, numShares: number, accountId: number): Observable<SecurityHolding> {
    let data: Object = {"securityId": securityId, "numShares": numShares.toString(), "accountId": accountId};
    return this.http.post<SecurityHolding>(this.investmentUrl+"holdings", data, this.httpOptions).pipe(
      tap((newHolding: SecurityHolding) => {console.log(`added Holding w/ id=${newHolding.id}`);}),

      catchError(this.handleError<SecurityHolding>('addHolding'))
    );
  }

  /** PUT: sell a SecurityHolding */
  sellHolding (holdingId: number): Observable<SecurityHolding> {
    return this.http.put<SecurityHolding>(this.investmentUrl+"holdings/"+holdingId, null, this.httpOptions).pipe(
      catchError(this.handleError<SecurityHolding>('addHolding'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
