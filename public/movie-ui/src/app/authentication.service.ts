import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor() { }

  get token() {
    return localStorage.getItem("token") as string;
  }

  set token(token: string) {
    localStorage.setItem("token", token);
  }

  get isLoggedIn() {
    return null !== this.token;
  }
  
  logout() {
    localStorage.clear();
  }
}
