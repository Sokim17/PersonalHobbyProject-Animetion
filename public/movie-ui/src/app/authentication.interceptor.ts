import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthenticationToken(request));
  }

  addAuthenticationToken(request: HttpRequest<unknown>){
    const token = this._authenticationService.token;
    if(token){
      return request.clone({
        setHeaders:{authorization: "Bearer " + token}
      })
    } else {
      return request;
    }
  }
}
