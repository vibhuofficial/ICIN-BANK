import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/Model/transactions';
import { TransactionsService } from 'src/app/Service/transactions.service';

@Component({
  selector: 'app-admin-transact',
  templateUrl: './admin-transact.component.html',
  styleUrls: ['./admin-transact.component.css']
})
export class AdminTransactComponent implements OnInit{

  transactions: Array<Transactions>;
  toShowTransactions: Array<Transactions>;
  allowBack: boolean = false;
  allowNext: boolean = false;
  current: number;

  constructor(
    private transactionService: TransactionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.transactionService.getAllPendingTransaction()
      .subscribe(
        transactions => {
          if (transactions.length > 5) {
            this.allowNext = true;
          }
          this.transactions = transactions;
          this.current = 0;
          this.toShowTransactions = this.transactions.slice(this.current, this.current + 5);
        },
        error => console.log(error)
      )
  }

  onPrev() {
    this.allowNext = true;
    this.current = this.current - 5;
    this.toShowTransactions = this.transactions.slice(this.current, this.current + 5);
    if (this.current - 5 < 0) {
      this.allowBack = false;
    } else {
      this.allowBack = true;
    }
  }

  onNext() {
    this.allowBack = true;
    this.current = this.current + 5;
    this.toShowTransactions = this.transactions.slice(this.current, this.current + 5);
    if (this.current + 5 >= this.transactions.length) {
      this.allowNext = false;
    } else {
      this.allowNext = true;
    }
  }

  generateDate(date: Date): string {
    let myDate = `${date}`.slice(0, 10);
    return myDate;
  }

  approveTransaction(id: number) {
    this.transactionService.permitTransaction(id)
      .subscribe(
        message => {
          this.transactionService.getAllPendingTransaction()
            .subscribe(
              chequeBooks => {
                alert(message.message);
                if (chequeBooks.length > 5) {
                  this.allowNext = true;
                }
                this.transactions = chequeBooks;
                this.toShowTransactions = this.transactions.slice(this.current, this.current + 5);
              },
              error => console.log(error)
            )
        },
        error => console.log(error)
      )
  }

  onBack() {
    this.router.navigate(['admin/options']);
  }

  onRefresh() {
    this.transactionService.getAllPendingTransaction()
      .subscribe(
        chequeBooks => {
          if (chequeBooks.length > 5) {
            this.allowNext = true;
          }
          this.transactions = chequeBooks;
          this.toShowTransactions = this.transactions.slice(this.current, this.current + 5);
        },
        error => console.log(error)
      )
  }

}
