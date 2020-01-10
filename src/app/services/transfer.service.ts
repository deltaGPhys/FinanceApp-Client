import { Injectable, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';import { constructor } from 'q';
import { Observable, of, from,observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { Account } from 'src/app/models/Account';
 


export const apiUrl = environment.apiUrl;



@Injectable({
  providedIn: 'root'
})
export class TransferService {

  @Inject(apiUrl) private apiUrl: string;
  private transferFundsUrl: string = apiUrl+"/transfer";
  private withdrawFunds: string = apiUrl+"/withdraw";
  private depositFunds: string = apiUrl+"/deposit";
 
}


