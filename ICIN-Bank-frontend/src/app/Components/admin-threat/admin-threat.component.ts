import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Model/users';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-admin-threat',
  templateUrl: './admin-threat.component.html',
  styleUrls: ['./admin-threat.component.css']
})
export class AdminThreatComponent {

  users: Array<Users>;
  toShowAllUsers: Array<Users>;
  allowBack: boolean = false;
  allowNext: boolean = false;
  current: number;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(
        users => {
          if (users.length > 5) {
            this.allowNext = true;
          }
          this.users = users;
          this.current = 0;
          this.toShowAllUsers = this.users.slice(this.current, this.current + 5);
        },
        error => console.log(error)
      )
  }

  block(loginUserId: string) {
    this.userService.blockUser(loginUserId)
      .subscribe(
        message => {
          alert('Account blocked successfully')
          this.userService.getAllUsers()
            .subscribe(
              users => {
                if (users.length > 5) {
                  this.allowNext = true;
                }
                this.users = users;
                this.toShowAllUsers = this.users.slice(this.current, this.current + 5);
              },
              error => console.log(error)
            )
        },
        error => console.log(error)
      )
  }

}
