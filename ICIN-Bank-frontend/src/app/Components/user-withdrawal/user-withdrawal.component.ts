import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/Model/accounts';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { DataServiceService } from 'src/app/Service/data-service.service';

@Component({
  selector: 'app-user-withdrawal',
  templateUrl: './user-withdrawal.component.html',
  styleUrls: ['./user-withdrawal.component.css']
})
export class UserWithdrawalComponent implements OnInit{

  depositAccountNumber: string = ''; 
  primaryBalance: number = 0;
  savingsBalance: number = 0;
  primaryWithdrawalAmount: number = 0;
  savingsWithdrawalAmount: number = 0;
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

  withDrawMoneyfromPrimary(){
    this.balance = this.primaryBalance - this.primaryWithdrawalAmount;
    this.accountService.withdrawPrimary(this.balance,this.depositAccountNumber)
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

  withdrawMoneyfromSavings(){
    this.balance = this.savingsBalance - this.savingsWithdrawalAmount;
    this.accountService.withdrawSavings(this.balance,this.depositAccountNumber)
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
