import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/Service/admin-data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  adminUsername: string = '';
  adminPassword: string = '';

  constructor(private router: Router, private adminDataService: AdminDataService) { }

  ngOnInit(): void {
  }

  loginAdmin() {
    if(this.adminUsername === 'admin' && this.adminPassword === 'icinbank' || this.adminUsername === 'nandan' && this.adminPassword === 'bank123') {
      this.adminDataService.setIsSafe(true);
      this.router.navigate(['admin-dashboard']);
      return;
    }
    alert('Please check your credentials and try again!');
  }

}
