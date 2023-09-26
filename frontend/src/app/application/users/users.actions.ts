import { createAction, props } from '@ngrx/store';
import { EUserRole, User } from '../../domain/auth/user';
import { IFailure } from '../../domain/core/i-failure';

export abstract class UsersActions {
    static getUsersWithPendingRoleRequest = createAction('getUsersWithPendingRoleRequest');
    static getUsersWithPendingRoleRequestSuccess = createAction('getUsersWithPendingRoleRequestSuccess', props<{ users: User[] }>());
    static getUsersWithPendingRoleRequestFailed = createAction('getUsersWithPendingRoleRequestFailed', props<{ failure: IFailure }>());

    static getAllUsers = createAction('getAllUsers');
    static getAllUsersSuccess = createAction('getAllUsersSuccess', props<{ users: User[] }>());
    static getAllUsersFailed = createAction('getAllUsersFailed', props<{ failure: IFailure }>());

    static requestRole = createAction('requestRole', props<{ role: EUserRole }>());
    static requestRoleSuccess = createAction('requestRoleSuccess');
    static requestRoleFailed = createAction('requestRoleFailed', props<{ failure: IFailure }>());

    static sendUserRoleDecision = createAction('sendUserRoleDecision', props<{ userId: User['id'], accept: boolean }>());
    static sendUserRoleDecisionSuccess = createAction('sendUserRoleDecisionSuccess');
    static sendUserRoleDecisionFailed = createAction('sendUserRoleDecisionFailed', props<{ failure: IFailure }>());
}
