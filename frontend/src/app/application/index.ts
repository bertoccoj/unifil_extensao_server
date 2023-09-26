import { AuthEffects } from './auth/auth.effects';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { UsersEffects } from './users/users.effects';
import { usersReducer } from './users/users.reducer';
import { UsersState } from './users/users.state';

export const appReducers = {
  auth: authReducer,
  users: usersReducer,
};

export const appEffects = [
  AuthEffects,
  UsersEffects,
]

export const initialState = {
  auth: new AuthState(),
  users: new UsersState(),
}
