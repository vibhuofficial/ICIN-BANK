import { UsersService } from 'src/app/Service/users.service';
import { DataServiceService } from './../../Service/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  loginUserId: string = '';
  loginUserPassword: string = '';
  userAccountNumber: string = '';
  userAccountHolderName: string = '';

  constructor(private dataService: DataServiceService, private userService: UsersService) { }

  ngOnInit(): void {
    let user = this.dataService.getUser();
    this.loginUserId = user.accountLoginUserId;
    this.loginUserPassword = user.accountLoginPassword;
    this.userAccountNumber = user.accountNumber;
    this.userAccountHolderName = user.accountHolderName;
  }

  updateLoginPassword() {
    if (this.loginUserPassword === '') {
      alert('Please enter a new password!');
      return;
    }
    this.userService
      .updateLoginPassword(this.loginUserPassword, this.userAccountNumber)
      .subscribe(
        message => {
          let user = this.dataService.getUser();
          user.accountLoginPassword = this.loginUserPassword
          this.dataService.setUser(user);
          alert(message.message)
        },
        error => console.log(error)
      )
  }

}
