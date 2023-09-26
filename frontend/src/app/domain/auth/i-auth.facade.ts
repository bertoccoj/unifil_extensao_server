import { Either } from 'fp-ts/lib/Either';
import { Unit } from '../../core/common/unit';
import { AuthFailure } from './auth-failures';
import { User } from './user';

export abstract class IAuthFacade {
    abstract login(email: string, password: string): Promise<Either<AuthFailure, User>>;
    abstract logout(): Promise<Either<AuthFailure, Unit>>;
    abstract authenticate(): Promise<Either<AuthFailure, User>>;
}
