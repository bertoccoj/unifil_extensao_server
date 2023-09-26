import { User } from '../auth/user';
import { RequestRolePayload } from './request-role';

export abstract class IUsersFacade {
    abstract getUsersWithPendingRoleRequest(): Promise<User[]>;
    abstract getAllUsers(): Promise<User[]>;
    abstract requestRole(user: User, payload: RequestRolePayload): Promise<any>;
    abstract decideRole(userId: User['id'], accept: boolean): Promise<any>;
}
