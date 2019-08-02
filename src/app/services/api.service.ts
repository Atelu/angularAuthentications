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

  constructor(private myRoute: Router, private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
        return this.http.post(`${this.configUrl}serviceplace`, user);
  }
  updateUser(data): Observable<any> {
    console.log('Updating', data.id);
    const url = `${this.configUrl}/serviceplace/${data.id}`;
    return this.http.put(url, data);

    // return this.http.put(`${this.configUrl}serviceplace/${id}`, id );
  }
}
