import { AccountServiceService } from './../../Service/account-service.service';
import { DataServiceService } from './../../Service/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit{

  accountNumber: string = '';
  accountHolderName: string = '';
  accountCIFNumber: string = '';
  accountBranch: string = '';
  accountBalancePrimary: number = 0;
  accountBalanceSavings: number = 0;

  constructor(private dataService: DataServiceService, private accountService: AccountServiceService) { }

  ngOnInit(): void {
    this.accountService.getAccountByNumber(this.dataService.getUser().accountNumber)
    .subscribe(
      account => {
        this.accountNumber = account.accountNumber;
        this.accountHolderName = account.accountHolderName;
        this.accountCIFNumber = account.accountCIFNumber;
        this.accountBranch = account.accountBranch;
        this.accountBalancePrimary = account.accountBalancePrimary;
        this.accountBalanceSavings = account.accountBalanceSavings;
      },
      error => console.log(error)
    )
  }

}
