import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends NbLoginComponent {
  strategy = 'emailAndPassword'
  user = {
    email: '',
    password: '',
    rememberMe: true,
  }
}
