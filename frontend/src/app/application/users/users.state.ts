import { User } from '../../domain/auth/user';
import { IFailure } from '../../domain/core/i-failure';

export class UsersState {
    isLoading: boolean = false;
    users: User[];
    failure: IFailure = null;
}
