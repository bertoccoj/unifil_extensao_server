import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeLogger } from 'ngrx-store-logger';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appEffects, appReducers, initialState } from './application';
import { Environment } from './core/common/config-reader.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SecurityModule } from './core/security/security.module';
import { LayoutService } from './core/utils/layout.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    ThemeModule.forRoot(),
    StoreModule.forRoot(appReducers, { metaReducers, initialState }),
    EffectsModule.forRoot(appEffects),
    PresentationModule,
    InfrastructureModule,
    StoreDevtoolsModule.instrument(),
    NbToastrModule.forRoot({}),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'emailAndPassword',
          baseEndpoint: Environment.apiUrl,
          token: {
            class: NbAuthJWTToken,
          },
          login: {
            endpoint: 'auth/log-in',
            method: 'post',
            redirect: {
              success: '/home',
            },
            // TODO traduzir mensagem de erro
          },
          register: {
            endpoint: 'auth/register',
            method: 'post',
            redirect: {
              success: '/pending-admin-aproval'
            }
          },
          logout: {
            endpoint: 'auth/log-out',
            method: 'post',
          },
        }),
      ],
      forms: {
        validation: {
          password: {
            required: true,
            minLength: 3,
            maxLength: 50,
          },
          email: {
            minLength: 6,
            maxLength: 16,
            required: true,
          },
          displayName: {
            required: true,
            minLength: 6,
            maxLength: 20,
          },
        },
      }
    }),
    SecurityModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    LayoutService,
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AppModule {
}
