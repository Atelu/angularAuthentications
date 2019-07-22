import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../models/sharedModel';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}authentication/login`, { username, password })
      .pipe(
        map(user => {
          localStorage.setItem('token', user.data[0].accessToken.token);
          this.currentUserSubject.next(user);
          return user as User;
        }));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
