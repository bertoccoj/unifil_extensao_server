import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, left, right } from 'fp-ts/lib/Either';
import { Environment } from '../../core/common/config-reader.service';
import { Unit, unit } from '../../core/common/unit';
import { Unexpected } from '../../domain/auth/auth-failures';
import { User } from '../../domain/auth/user';
import { IFailure } from '../../domain/core/i-failure';
import { IUsersFacade } from '../../domain/users/i-users-facade';
import { RequestRolePayload } from '../../domain/users/request-role';
import { LowerPermissionRequested, PermissionAlreadyRequested } from '../../domain/users/users-failures';

enum ERequestRoleError {
    PERMISSION_PENDING = 1,
    ROLE_MUST_BE_HIGHER_THAN_CURRENT = 2,
}

@Injectable()
export class UsersFacadeImpl implements IUsersFacade {

    constructor(
        private http: HttpClient,
    ) { }

    async getUsersWithPendingRoleRequest(): Promise<Either<IFailure, User[]>> {
        try {
            const res = await this.http.get<User[]>(Environment.getApiUrl('users', 'with-pending-roles')).toPromise();
            console.log(res)
            return right(res);
        } catch (error) {
            return left(new Unexpected())
        }
    }

    async getAllUsers(): Promise<Either<IFailure, User[]>> {
        try {
            const res = await this.http.get<User[]>(Environment.getApiUrl('users', 'all')).toPromise();
            console.log(res)
            return right(res);
        } catch (error) {
            return left(new Unexpected())
        }
    }

    async requestRole(payload: RequestRolePayload): Promise<Either<IFailure, Unit>> {
        try {
            await this.http.post(Environment.getApiUrl('users', 'request-role'), payload).toPromise();
            await new Promise(resolve => setTimeout(resolve, 500));
            return right(unit);
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                const errorCode: ERequestRoleError = error.error.message;
                switch (errorCode) {
                    case ERequestRoleError.PERMISSION_PENDING:
                        return left(new PermissionAlreadyRequested());
                    case ERequestRoleError.ROLE_MUST_BE_HIGHER_THAN_CURRENT:
                        return left(new LowerPermissionRequested());
                }
            }
            return left(new Unexpected())
        }
    }

    async sendUserRoleDecision(userId: number, accept: boolean): Promise<Either<IFailure, Unit>> {
        try {
            +
                await this.http.post(Environment.getApiUrl('users', 'decide-role', userId), { accept }).toPromise();
            return right(unit);
        } catch (error) {
            return left(new Unexpected())
        }
    }


}