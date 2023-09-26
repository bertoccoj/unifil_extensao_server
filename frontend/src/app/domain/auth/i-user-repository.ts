import { Either } from 'fp-ts/lib/Either';
import { AuthFailure } from './auth-failures';

export abstract class IUserRepository {
    abstract isAdmin(): Promise<Either<AuthFailure, boolean>>;
}