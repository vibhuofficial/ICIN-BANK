import { AccountServiceService } from 'src/app/Service/account-service.service';
import { Accounts } from './../../Model/accounts';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-netbank-access',
  templateUrl: './admin-netbank-access.component.html',
  styleUrls: ['./admin-netbank-access.component.css']
})
export class AdminNetbankAccessComponent implements OnInit{

  accounts: Array<Accounts>;
  toShowAccounts: Array<Accounts>;
  allowBack: boolean = false;
  allowNext: boolean = false;
  current: number;
  status:number=1;
  accountNumber:string ='';

  constructor(private accountService: AccountServiceService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts()
      .subscribe(
        accounts => {
          if (accounts.length > 5) {
            this.allowNext = true;
          }
          this.accounts = accounts;
          this.current = 0;
          this.toShowAccounts = this.accounts.slice(this.current, this.current + 5);
        },
        error => console.log(error)
      )
  }

  enableNetBanking(status:number,accountNumber: string) {
    this.accountService.enableNetBanking(status,accountNumber)
      .subscribe(
        message => {
          alert(message.message)
          this.accountService.getAllAccounts()
            .subscribe(
              accounts => {
                if (accounts.length > 5) {
                  this.allowNext = true;
                }
                this.accounts = accounts;
                this.toShowAccounts = this.accounts.slice(this.current, this.current + 5);
              },
              error => console.log(error)
            )
        },
        error => console.log(error)
      )
  }


}
