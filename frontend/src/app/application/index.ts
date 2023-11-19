import { AuthEffects } from './auth/auth.effects';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { SolicitacaoDetailsEffect } from './solicitacao/details/solicitacao-details.effects';
import { SolicitacaoDetailsState, solicitacaoDetailsReducer } from './solicitacao/details/solicitacao-details.reducer';
import { SolicitacaoListEffect } from './solicitacao/list/solicitacao-list.effects';
import { SolicitacaoListState, solicitacaoListReducer } from './solicitacao/list/solicitacao-list.reducer';
import { TratativaEffects } from './solicitacao/tratativa/tratativa.effects';
import { TratativaState, tratativaReducer } from './solicitacao/tratativa/tratativa.reducer';
import { UsersEffects } from './users/users.effects';
import { usersReducer } from './users/users.reducer';
import { UsersState } from './users/users.state';

export const appReducers = {
  auth: authReducer,
  users: usersReducer,
  'solicitacao-details': solicitacaoDetailsReducer,
  'solicitacao-list': solicitacaoListReducer,
  'solicitacao-tratativa': tratativaReducer,
};

export const appEffects = [
  AuthEffects,
  UsersEffects,
  SolicitacaoDetailsEffect,
  SolicitacaoListEffect,
  TratativaEffects,
]

export const initialState = {
  auth: new AuthState(),
  users: new UsersState(),
  'solicitacao-details': new SolicitacaoDetailsState(),
  'solicitacao-list': new SolicitacaoListState(),
  'solicitacao-tratativa': new TratativaState(),
}
