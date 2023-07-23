import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/Model/accounts';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { DataServiceService } from 'src/app/Service/data-service.service';

@Component({
  selector: 'app-user-deposit',
  templateUrl: './user-deposit.component.html',
  styleUrls: ['./user-deposit.component.css']
})
export class UserDepositComponent implements OnInit{

  depositAccountNumber: string = ''; 
  depositAccountType:string = '';
  primaryBalance: number = 0;
  savingsBalance: number = 0;
  primaryDepositAmount: number = 0;
  savingsDepositAmount: number = 0;
  myAccount: Accounts;
  balance:number=0;

  constructor(private dataService: DataServiceService, private accountService: AccountServiceService) { }

  ngOnInit(): void {
    this.accountService.getAccountByNumber(this.dataService.getUser().accountNumber)
      .subscribe(
        account => {
          this.myAccount = account;
          this.primaryBalance = this.myAccount.accountBalancePrimary;
          this.savingsBalance = this.myAccount.accountBalanceSavings;
        },
        error => console.log(error)
      )
  }

  depositMoneytoPrimary(){
    this.balance = this.primaryDepositAmount + this.primaryBalance;
    this.accountService.depositPrimary(this.balance,this.depositAccountNumber)
    .subscribe(
      message => {
        alert(message.message);
      },
      error => console.log(error),
      () => {
        this.depositAccountNumber = '';
      }
    )
  }

  depositMoneytoSavings(){
    this.balance = this.savingsDepositAmount + this.savingsBalance;
    this.accountService.depositSavings(this.balance,this.depositAccountNumber)
    .subscribe(
      message => {
        alert(message.message);
      },
      error => console.log(error),
      () => {
        this.depositAccountNumber = '';
      }
    )
  }
  

}
