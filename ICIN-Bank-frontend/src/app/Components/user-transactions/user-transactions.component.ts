import { DataServiceService } from 'src/app/Service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transactions } from 'src/app/Model/transactions';
import { TransactionsService } from 'src/app/Service/transactions.service';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css']
})
export class UserTransactionsComponent implements OnInit{

  transactions: Array<Transactions>
  toShowTransactions: Array<Transactions>
  allowBack: boolean = false;
  allowNext: boolean = false;
  current: number;
  amountColor: string = '';
  startDate: Date = null;
  endDate: Date = null;

  constructor(
    private dataService: DataServiceService,
    private transactionsService: TransactionsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.transactionsService.getTransactions(this.dataService.getUser().accountNumber)
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

  generateStatus(code: number): string {
    if (code === 1) {
      return 'Success';
    }
    return 'Pending';
  }

  checkSelf(accountNumber: string): string {
    if (this.dataService.getUser().accountNumber === accountNumber) {
      return 'Self'
    }
    return accountNumber;
  }

  generateRemarks(
    fromAN: string,
    toAN: string,
    from: string,
    to: string,
    fromAT: string,
    toAT: string,
    message: string
  ): string {
    let type = this.generateType(fromAN, toAN);
    if (type === 'Debit') {
      this.amountColor = 'text-danger';
      return `from:${fromAT} | to:${to} | message:${message}`;
    } else if (type === 'Credit') {
      this.amountColor = 'text-success';
      return `from:${from} | to:${toAT} | message:${message}`;
    }
    this.amountColor = '';
    return `from:${fromAT} | to:${toAT} | self-transfer/message:${message}`;
  }

  generateTransferAmount(amount: number, from: string, to: string): string {
    let type = this.generateType(from, to);
    if (type === 'Debit') {
      return `${amount} (Dr)`;
    } else if (type === 'Credit') {
      return `${amount} (Cr)`;
    }
    return `${amount}`;
  }

  generateType(from: string, to: string): string {
    let curr_acc = this.dataService.getUser().accountNumber;
    if (to === curr_acc && from === curr_acc) {
      return '-';
    }
    if (to === curr_acc) {
      return 'Credit';
    }
    return 'Debit';
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      if (result === 'Filter') {
        if (!(this.startDate === null || this.endDate === null)) {
          this.transactionsService
            .getFilteredTransactions(
              this.dataService.getUser().accountNumber,
              this.startDate,
              this.endDate
            ).subscribe(
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
      } else {
        this.startDate = null;
        this.endDate = null;
        this.transactionsService.getTransactions(this.dataService.getUser().accountNumber)
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

    }, (reason) => {
    });
  }

}
