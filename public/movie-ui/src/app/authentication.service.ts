import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private _jwtServiceHelper:JwtHelperService) { }

  get token() {
    return localStorage.getItem("token") as string;

  }

  set token(token: string) {
    localStorage.setItem("token", token);
  }

  get isLoggedIn() {
    return null !== this.token;
  }
  
  get name(){
    if(this.isLoggedIn){
      return this._jwtServiceHelper.decodeToken(this.token).name as string;
    }
    return "";
  }
  
  logout() {
    localStorage.clear();
  }
}
