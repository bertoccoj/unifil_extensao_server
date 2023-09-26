import { Either, right, left } from 'fp-ts/lib/Either';
import { unit, Unit } from '../../core/common/unit';
import { AuthFailure, Unexpected } from '../../domain/auth/auth-failures';
import { IUserRepository } from '../../domain/auth/i-user-repository';
import { EUserRole, User } from '../../domain/auth/user';

export class UserRepository implements IUserRepository {
    private user: User;

    async setUser(user: User): Promise<Either<AuthFailure, Unit>> {
        try {
            this.user = user;
            return right(unit);
        } catch (error) {
            return left(new Unexpected());
        }
    }

    async getUser(): Promise<Either<AuthFailure, User>> {
        try {
            return right(this.user);
        } catch (error) {
            return left(new Unexpected());
        }
    }

    async isAdmin(): Promise<Either<AuthFailure, boolean>> {
        const isAdmin = this.user.role.includes(EUserRole.ADMIN);
        try {
            return right(isAdmin);
        } catch (error) {
            return left(new Unexpected());
        }
    }

}
