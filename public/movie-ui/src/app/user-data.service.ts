import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './register/register.component';
import { Credentials } from './login/login.component';
import { Token } from './login/login.component';



@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.USER_URL;
  public registerUser(user: User): Observable<User> {
    const url: string = this.baseUrl;
    return this.http.post<User>(url, user.toJSON());
  }

  public loginUser(user: Credentials): Observable<Token> {
    const url: string = this.baseUrl + environment.USER_LOGIN_ENDPOINT;
    return this.http.post<Token>(url, user.toJSON());
  }
}
