import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Unexpected } from '../../domain/auth/auth-failures';
import { IAuthFacade } from '../../domain/auth/i-auth.facade';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {

  logOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logOut),
    switchMap(() => this.authService.logout('emailAndPassword')),
    map((result) => {
      if (result.isSuccess()) {
        return AuthActions.logOutSuccess();
      } else {
        return AuthActions.logOutFailed({ failure: new Unexpected() });
      }
    }),
  ));

  backToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.logOutSuccess,
      AuthActions.loadUserFailed,
    ),
    tap(() => this.router.navigate(['/auth/login'])),
  ), { dispatch: false });

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadUser),
    switchMap(() => from(this.authFacade.authenticate())),
    map(
      (result) => {
        return pipe(
          result,
          E.foldW(
            (failure) => AuthActions.loadUserFailed({ failure }),
            (user) => AuthActions.loadUserSuccess({ user }),
          ),
        )
      },
    )
  ));

  loadUserFailed$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadUserFailed),
    tap(() => this.router)
  ), { dispatch: false })

  failToast$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.logOutFailed,
      AuthActions.loadUserFailed,
    ),
    tap((action) => {
      this.toastService.danger(action.failure.description, action.failure.title);
    }),
  ), { dispatch: false });

  constructor(
    private router: Router,
    private actions$: Actions,
    private authFacade: IAuthFacade,
    private authService: NbAuthService,
    private toastService: NbToastrService,
  ) { }

}
