import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../Model/message';
import { Transactions } from '../Model/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private baseURL = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  putTransaction(transaction: Transactions) : Observable<Message> {
    return this.http.post<Message>(`${this.baseURL}/transactions/putTransaction`, transaction);
  }

  getTransactions(accountNumber: string) : Observable<Array<Transactions>> {
    return this.http.get<Array<Transactions>>(`${this.baseURL}/transactions/${accountNumber}`);
  }

  getFilteredTransactions(accountNumber: string, startDate: Date, endDate: Date) : Observable<Array<Transactions>> {
    return this.http.get<Array<Transactions>>(`${this.baseURL}/transactions/${accountNumber}/${startDate}/${endDate}`);
  }

  getAllPendingTransaction() : Observable<Array<Transactions>> {
    return this.http.get<Array<Transactions>>(`${this.baseURL}/admin/get-all-pending-transactions`)
  }

  permitTransaction(id: number) : Observable<Message> {
    return this.http.get<Message>(`${this.baseURL}/admin/allow/transaction/${id}`)
  }
}
