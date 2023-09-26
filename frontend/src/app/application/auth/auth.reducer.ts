import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

export const initialState = new AuthState();

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.logOut,
    (state) => ({
      ...state,
      isLoading: true,
      failure: null,
    }),
  ),
  on(
    AuthActions.logOutSuccess,
    (state) => ({
      ...state,
      isLoading: false,
      failure: null,
      user: null,
    }),
  ),
  on(
    AuthActions.logOutFailed,
    (state, action) => ({
      ...state,
      isLoading: false,
      failure: action.failure,
    }),
  ),

  on(
    AuthActions.loadUser,
    (state) => ({
      ...state,
      isLoading: true,
      failure: null,
      user: null,
    }),
  ),
  on(
    AuthActions.loadUserSuccess,
    (state, action) => ({
      ...state,
      isLoading: false,
      failure: null,
      user: action.user,
    }),
  ),
  on(
    AuthActions.loadUserFailed,
    (state, action) => ({
      ...state,
      isLoading: false,
      user: null,
      failure: action.failure,
    }),
  ),

);
