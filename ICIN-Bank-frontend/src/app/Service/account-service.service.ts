import { Message } from './../Model/message';
import { Accounts } from './../Model/accounts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../Model/users';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAccountByNumber(accountNumber: string) : Observable<Accounts> {
    return this.http.get<Accounts>(`${this.baseURL}/accounts/${accountNumber}`)
  }
  getAllAccounts():Observable<Array<Accounts>>{
    return this.http.get<Array<Accounts>>(`${this.baseURL}/accounts`); 
  }
  createAccount(account:Accounts): Observable<Message>{
    return this.http.post<Message>(`${this.baseURL}/accounts/add-account`,account);
  }
  enableNetBanking(status:Number, accountNumber:String): Observable<Message>{
    return this.http.get<Message>(`${this.baseURL}/accounts/netbankingenable/${status}/${accountNumber}`);
  }
  getAllUnregisteredUsers(status:number):Observable<Array<Accounts>>{
    return this.http.get<Array<Accounts>>(`${this.baseURL}/accounts/unregisteredUsers`);
  }
  depositPrimary(balance:number, accountNumber:String): Observable<Message>{
    return this.http.get<Message>(`${this.baseURL}/accounts/depositPrimary/${balance}/${accountNumber}`)
  }
  depositSavings(balance:number, accountNumber:String): Observable<Message>{
    return this.http.get<Message>(`${this.baseURL}/accounts/depositSavings/${balance}/${accountNumber}`)
  }
  withdrawPrimary(balance:number, accountNumber:String): Observable<Message>{
    return this.http.get<Message>(`${this.baseURL}/accounts/withdrawPrimary/${balance}/${accountNumber}`)
  }
  withdrawSavings(balance:number, accountNumber:String): Observable<Message>{
    return this.http.get<Message>(`${this.baseURL}/accounts/withdrawSavings/${balance}/${accountNumber}`)
  }

}
