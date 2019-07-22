import { AuthenticationServiceService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';


@Injectable()
export class ContentType implements HttpInterceptor {
  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

    return next.handle(req);
  }
}

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationServiceService) { }
  // function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // const currentUser = this.authenticationService.currentUserValue;

    // if (currentUser && currentUser.token) {
    //   request = request.clone({
    //     headers: request.headers.set('Authorization', `Bearer ${currentUser.token}`)
    //   });
    // }
    const token = this.authenticationService.getToken();
    if (token) {
      const req = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}



