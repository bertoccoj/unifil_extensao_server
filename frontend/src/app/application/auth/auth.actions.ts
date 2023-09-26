import { createAction, props } from '@ngrx/store';
import { User } from '../../domain/auth/user';
import { AuthFailure } from '../../domain/auth/auth-failures';

export abstract class AuthActions {
  static logOut = createAction('logOut');
  static logOutSuccess = createAction('logOutSuccess');
  static logOutFailed = createAction('logOutFailed', props<{ failure: AuthFailure }>());

  static loadUser = createAction('loadUser');
  static loadUserSuccess = createAction('loadUserSuccess', props<{ user: User }>());
  static loadUserFailed = createAction('loadUserFailed', props<{ failure: AuthFailure }>());
}
