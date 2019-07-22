import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatFormFieldModule,  MatCardModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule,
  MatInputModule, MatButtonModule } from '@angular/material/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class LoginModule { }
