import { AlertService } from './../services/alert.service';
import { AuthenticationServiceService } from './../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
  FormControl,
  FormControlName
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { interval, of, fromEvent } from 'rxjs';
import { first, take, map, filter, switchMap, exhaustMap, concatMap, mergeMap, takeWhile, delay } from 'rxjs/operators';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message: any;
  invalidPassword =  false;
  invalidUsername = false;

  private isAlive = false;

  constructor(private authenticationService: AuthenticationServiceService,
              private fb: FormBuilder, private router: Router, private alertService: AlertService, private route: ActivatedRoute) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.alertService.alert$
      .pipe()
      .subscribe(
        alert => console.log('alert', alert)
      );
  }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.loginform.controls; }

  onSubmit() {
    this.invalidPassword =  false;
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    if (this.loginform.invalid) {
      // this.invalidPassword = true;

      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(
        first(),
        delay(2000),
        )
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);

        },
          // tslint:disable-next-line:no-shadowed-variable
          (error: any) => {
            console.log('err', error);
            if (error instanceof HttpErrorResponse) {
              console.log(error.status);
              if (error.status === 401 || error.status === 403) {
                // invalid username or password
                 this.invalidPassword = true;
              }
            }

            // this.alertService.error(error);
            this.loading = false;
          });
        }

      }
