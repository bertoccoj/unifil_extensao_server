import { User } from '../../domain/auth/user';
import { IFailure } from '../../domain/core/i-failure';

export class AuthState {
  isLoading: boolean = false;
  user: User;
  failure: IFailure = null;
}
