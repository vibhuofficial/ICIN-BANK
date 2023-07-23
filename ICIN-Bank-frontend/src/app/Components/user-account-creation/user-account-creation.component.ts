import { Accounts } from './../../Model/accounts';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account-creation',
  templateUrl: './user-account-creation.component.html',
  styleUrls: ['./user-account-creation.component.css']
})
export class UserAccountCreationComponent implements OnInit{

  accountNumber: string = '';
  accountBalancePrimary: number = 1000;
  accountBalanceSavings: number = 1000;
  accountBranch: string = '';
  accountCIFNumber: string = '';
  accountHolderName: string = '';
  accountIsNetBankingReg: number = 0;

  constructor(
    private accService: AccountServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getCifNumber(){
    if (this.accountBranch === 'Rajajinagar'){
      this.accountCIFNumber = 'ICINRAJ01'
    }else if(this.accountBranch === 'Jayanagar'){
      this.accountCIFNumber = 'ICINJAY02'
    }else if(this.accountBranch === 'Girinagar'){
      this.accountCIFNumber = 'ICINGIR03'
    }else{
      alert('Please choose one of the 3 available branches - Rajajinagar, Jayanagar or Girinagar')
    }
  }

  createAccount(){
    if (this.accountNumber === '' ||
      this.accountBranch === '' ||
      this.accountCIFNumber === '' ||
      this.accountHolderName === ''){
      alert('Please enter the required details!');
      return;
  }

  let account = {
    accountNumber: this.accountNumber,
    accountHolderName: this.accountHolderName,
    accountCIFNumber: this.accountCIFNumber,
    accountBranch: this.accountBranch,
    accountIsNetBankingReg: this.accountIsNetBankingReg,
    accountBalancePrimary: this.accountBalancePrimary,
    accountBalanceSavings: this.accountBalanceSavings,
  } as Accounts

  this.accService.createAccount(account).subscribe(
    message => {
      if (message.message === 'Account created successfully!') {
        let mySuccessMessage = message.message + '\n' + 'Press OK to proceed to the registration page!'
        if (confirm(mySuccessMessage)) {
          this.router.navigate(['registration']);
        }
      } else {
        alert(message.message);
      }
    },
  )

}
}
