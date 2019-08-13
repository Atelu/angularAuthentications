import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://192.168.1.106:3000/';
  configUrl = this.baseUrl + 'configuration';
  addedOrUpdated$$: any;

  constructor(private myRoute: Router, private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
        return this.http.post(`${this.configUrl}serviceplace`, user);
  }

  updateUser(value): Observable<any> {
    return this.http.put(`${this.configUrl}/serviceplace/${value.id}`, value);
  }
}

    // return this.http.put(`${this.configUrl}serviceplace/${id}`, id );
    // const url = `${this.configUrl}/serviceplace/${value.id}`;
