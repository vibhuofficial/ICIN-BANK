import { DataServiceService } from './../../Service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{

  userName: string = '';

  constructor(private dataService: DataServiceService, private router:Router) { }

  ngOnInit(): void {
    this.userName = this.dataService.getUser().accountHolderName;
  }

  onLogout() {
    this.dataService.setIsSafe(false);
    this.dataService.setUser(null);
    this.router.navigate(['']);
  }

}
