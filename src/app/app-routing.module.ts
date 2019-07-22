import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [

 {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
 {
   path: 'login',
   loadChildren: './login/login.module#LoginModule',
 },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
