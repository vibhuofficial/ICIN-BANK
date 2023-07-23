import { AdminDataService } from './../../Service/admin-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/Service/data-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  constructor(private adminService: AdminDataService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.adminService.setIsSafe(false);
    this.router.navigate(['admin']);
  }

}
