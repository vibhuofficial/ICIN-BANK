import { DataServiceService } from './data-service.service';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoutingService implements CanActivateChild{

  constructor(private router: Router, private dataService: DataServiceService) { }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.dataService.getIsSafe() == true) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
