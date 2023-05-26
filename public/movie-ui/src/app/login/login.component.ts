import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

export class Token {
  #token!: string;
  get token() {
    return this.#token;
  }
  set token(token: string) {
    this.#token = token;
  }
  constructor(token: string) {
    this.#token = token;
  }
}
export class Credentials {
  #username!: string;
  #password!: string;

  get username() {
    return this.#username;
  }
  get password() {
    return this.#password;
  }
  constructor(username: string, password: string) {
    this.#username = username;
    this.#password = password;
  }

  toJSON(): any {
    const user_json = '{"username":"' + this.username + '","password":"' + this.password + '"}'
    console.log(user_json);
    return JSON.parse(user_json);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  user!: Credentials;
  username!: string;
  password!: string;
  token!: Token;

  @ViewChild("loginForm")
  loginForm!: NgForm;

  constructor(private _userService: UserDataService, private _router: Router,
    private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {

  }

  public login() {
    const _user = new Credentials(this.loginForm.value.username, this.loginForm.value.password);
    this._userService.loginUser(_user).subscribe({
      next: (token) => this.OnLoginSuccess(token),
      error: (error) => this.OnLoginError(error),
      complete: () => { }
    });
  }
  get name(): string {
    return this._authenticationService.name;
  }
  OnLoginSuccess(token: Token) {
    this._authenticationService.token = token.token;
    this._router.navigate(["/profile"]);
  }

  OnLoginError(error: any) {
    console.log("error", error);
  }

  isLogin() {
    return this._authenticationService.isLoggedIn;
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigate([""]);
  }
}
