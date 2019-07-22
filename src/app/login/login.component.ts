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
import { first, take, map, filter, switchMap, exhaustMap, concatMap, mergeMap, takeWhile } from 'rxjs/operators';
import { invalid } from '@angular/compiler/src/render3/view/util';

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

  private isAlive = false;

  constructor(private authenticationService: AuthenticationServiceService,
              private fb: FormBuilder, private router: Router, ) {

 if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
 }
               }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    // interval(2000)
    //   .pipe(
    //     take(5),
    //     map(value => {
    //       return 2 * value;
    //     }),
    //     filter(value => {
    //       return value % 2 === 0;
    //     }),
    //     switchMap(value => {
    //       return interval(1000);
    //     })
    //   )
  //   fromEvent(document, 'click')
  //     .pipe(
  //       take(5),
  //        takeWhile(() => this.isAlive),
  //        exhaustMap(x => interval(1000)
  //         .pipe(

  //         )
  //       )
  //      )
  //     .subscribe(
  //       value => console.log('value', value),
  //       err => {},
  //       () => console.log('completed')
  //     );
  // }

  // ngOnDestroy(): void {
  //   this.isAlive = false;
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginform.controls; }


onSubmit() {
  this.submitted = true;
  if (this.loginform.invalid) {
    return;
  }
  this.loading = true;
  this.authenticationService.login(this.f.username.value, this.f.password.value)
  .pipe(first())
  .subscribe(
    data => {
      this.router.navigate(['/dashboard']);
    },
  );

    }
  }
