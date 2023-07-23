import { Injectable } from '@angular/core';
import { Users } from '../Model/users';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private user: Users = null;
  private isSafe: boolean = false;

  constructor() { }

  public getUser() : Users {
    return this.user;
  }

  public setUser(user: Users) {
    this.user = user;
  }

  public getIsSafe() : boolean {
    return this.isSafe;
  }

  public setIsSafe(isSafe: boolean) {
    this.isSafe = isSafe;
  }
}
