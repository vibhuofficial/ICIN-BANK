import { DataServiceService } from 'src/app/Service/data-service.service';
import { UsersService } from 'src/app/Service/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChequeBooks } from 'src/app/Model/cheque-books';

@Component({
  selector: 'app-admin-cheque',
  templateUrl: './admin-cheque.component.html',
  styleUrls: ['./admin-cheque.component.css']
})
export class AdminChequeComponent implements OnInit{

  chequeBooks: Array<ChequeBooks>;
  toShowChequeBooks: Array<ChequeBooks>;
  allowBack: boolean = false;
  allowNext: boolean = false;
  current: number;

  constructor(
    private userService: UsersService,
    private dataService: DataServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllChequeBookRequests()
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

  allow(chequeBookNumber: string) {
    this.userService.acceptChequeBookRequest(chequeBookNumber)
      .subscribe(
        message => {
          this.userService.getAllChequeBookRequests()
            .subscribe(
              chequeBooks => {
                alert(message.message);
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

  onBack() {
    this.router.navigate(['admin/options']);
  }

  onRefresh() {
    this.userService.getAllChequeBookRequests()
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
  }

}
