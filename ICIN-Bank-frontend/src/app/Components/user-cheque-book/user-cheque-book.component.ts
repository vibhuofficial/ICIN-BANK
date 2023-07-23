import { UsersService } from 'src/app/Service/users.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChequeBooks } from 'src/app/Model/cheque-books';
import { DataServiceService } from 'src/app/Service/data-service.service';

@Component({
  selector: 'app-user-cheque-book',
  templateUrl: './user-cheque-book.component.html',
  styleUrls: ['./user-cheque-book.component.css']
})
export class UserChequeBookComponent implements OnInit{

  chequeBooks: Array<ChequeBooks>;
  toShowChequeBooks: Array<ChequeBooks>;
  allowBack: boolean = false;
  allowNext: boolean = false;
  current: number;

  constructor(
    private dataService: DataServiceService,
    private userService: UsersService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userService.getChequeBooks(this.dataService.getUser().accountNumber)
      .subscribe(
        chequeBooks => {
          if (chequeBooks.length > 5) {
            this.allowNext = true;
          }
          this.chequeBooks = chequeBooks;
          this.current = 0;
          this.toShowChequeBooks = this.chequeBooks.slice(this.current, this.current + 5);
        },
        error => console.log(error)
      )
  }

  onPrev() {
    this.allowNext = true;
    this.current = this.current - 5;
    this.toShowChequeBooks = this.chequeBooks.slice(this.current, this.current + 5);
    if (this.current - 5 < 0) {
      this.allowBack = false;
    } else {
      this.allowBack = true;
    }
  }

  onNext() {
    this.allowBack = true;
    this.current = this.current + 5;
    this.toShowChequeBooks = this.chequeBooks.slice(this.current, this.current + 5);
    if (this.current + 5 >= this.chequeBooks.length) {
      this.allowNext = false;
    } else {
      this.allowNext = true;
    }
  }

  generateDate(date: Date): string {
    let myDate = `${date}`.slice(0, 10);
    return myDate;
  }

  generateStatus(code: number): string {
    if (code === 1) {
      return 'Success';
    }
    return 'Pending';
  }

  requestChequeBookPrimary() {
    this.userService.requestChequeBook(this.dataService.getUser().accountNumber, 'Primary')
      .subscribe(
        message => {
          alert(message.message);
          this.userService.getChequeBooks(this.dataService.getUser().accountNumber)
            .subscribe(
              chequeBooks => {
                if (chequeBooks.length > 5) {
                  this.allowNext = true;
                }
                this.chequeBooks = chequeBooks;
                this.toShowChequeBooks = this.chequeBooks.slice(this.current, this.current + 5);
              },
              error => console.log(error)
            )
        },
        error => console.log(error)
      )
  }
  requestChequeBookSavings() {
    this.userService.requestChequeBook(this.dataService.getUser().accountNumber, 'Savings')
      .subscribe(
        message => {
          alert(message.message);
          this.userService.getChequeBooks(this.dataService.getUser().accountNumber)
            .subscribe(
              chequeBooks => {
                if (chequeBooks.length > 5) {
                  this.allowNext = true;
                }
                this.chequeBooks = chequeBooks;
                this.toShowChequeBooks = this.chequeBooks.slice(this.current, this.current + 5);
              },
              error => console.log(error)
            )
        },
        error => console.log(error)
      )
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      if (result === 'Primary') {
        this.requestChequeBookPrimary();
      } else {
        this.requestChequeBookSavings();
      }
    }, (reason) => {
    });
  }

}
