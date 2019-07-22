import { Serviceplace } from './../models/Serviceplace';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { configUrl } from '../models/sharedModel';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private serviceUrl = configUrl + 'serviceplace?size=1000';

  private storageId = 'LoggedInUser';

  constructor(private myRoute: Router, private http: HttpClient) {}


  getUser(): Observable<any> {
    return this.http.get<any>(this.serviceUrl);
  }

  getGenderGroup(): Observable<any> {
    return this.http.get(configUrl + 'gendergroup');
  }

  getAgeGroup(): Observable<any> {
    return this.http.get(configUrl + 'agegroup');
  }

  getServiceTypes(): Observable<any> {
    return this.http.get(configUrl + 'servicetypes');
  }

  getServicePlaceType(): Observable<any> {
    return this.http.get(configUrl + 'serviceplacetype');
  }

  getPatientCategoryType(): Observable<any> {
    return this.http.get(configUrl + 'patientcategorytype');
  }

  getClinicsAll(): Observable<any> {
    return this.http.get(configUrl + 'clinics/all');
  }

  getFacilityBranch(): Observable<any> {
    return this.http.get(configUrl + 'facility/branch');
  }

  getPatientStatus(): Observable<any> {
    return this.http.get(configUrl + 'patient/status');
  }

  getFormOptions(): Observable<any> {
    return forkJoin([
      this.getGenderGroup(),
      this.getAgeGroup(),
      this.getServiceTypes(),
      //  this.getServicePlaceType(),
      // this.getPatientCategoryType(),
      this.getClinicsAll(),
      this.getFacilityBranch(),
      this.getPatientStatus()
    ]);
  }

  // sendToken(token: string) {
    // localStorage.setItem(this.storageId, token);
  }
  // getToken() {
    // return localStorage.getItem(this.storageId);
  // }
  // isLoggednIn() {
    // return this.getToken() !== null;
  // }

  // }
