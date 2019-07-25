import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MyInterceptor, ContentType} from './Httpinterceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatToolbarModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule,
  MatSnackBarModule, MatRadioModule, MatDatepickerModule,
  MatNativeDateModule, MatSelectModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { RegistrationComponent } from './registration/registration.component';
import { LoginModule } from './login/login.module';
import { ButtonFailedComponent } from './components/button-failed/button-failed.component';
import { AlertComponent } from './alert/alert.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegistrationComponent,
    ButtonFailedComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatCheckboxModule,
    MatDialogModule, MatToolbarModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule,
    MatSnackBarModule, MatRadioModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, FormsModule, MatTableModule,  HttpClientModule, FlexLayoutModule, LoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentType,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
