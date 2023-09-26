import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { PresentationModule } from '../presentation.module';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const components = [
  LoginPageComponent,
  RegisterPageComponent,
];

@NgModule({
  declarations: components,
  imports: [
    AuthRoutingModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    NbIconModule,
    PresentationModule,
  ],
  exports: [
    components,
  ]
})
export class AuthModule {
}
