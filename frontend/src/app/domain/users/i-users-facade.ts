import { Either } from 'fp-ts/lib/Either';
import { Unit } from '../../core/common/unit';
import { User } from '../auth/user';
import { IFailure } from '../core/i-failure';
import { RequestRolePayload } from './request-role';

export abstract class IUsersFacade {
    abstract getUsersWithPendingRoleRequest(): Promise<Either<IFailure, User[]>>;
    abstract getAllUsers(): Promise<Either<IFailure, User[]>>;
    abstract requestRole(payload: RequestRolePayload): Promise<Either<IFailure, Unit>>;
    abstract sendUserRoleDecision(userId: User['id'], accept: boolean): Promise<Either<IFailure, Unit>>;
}
