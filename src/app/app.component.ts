import { User } from './models/User';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from './services/authentication.service';
import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { configUrl } from './models/sharedModel';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trial';
  currentUser: User;


constructor(private authenticationService: AuthenticationServiceService,
            // tslint:disable-next-line: variable-name
            private _http: HttpClient, private router: Router, private httpClient: HttpClient, private userService: UserService) {


              const url = configUrl + 'serviceplace';

              this._http.get(url).subscribe(() => {
    console.log('Http Call is success from compoennt');
  }, (error) => {
    console.log('Http Call is failed from component');
  });
}
}
