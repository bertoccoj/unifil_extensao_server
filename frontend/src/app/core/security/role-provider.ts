import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { isLeft } from 'fp-ts/lib/Either';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthFacade } from '../../domain/auth/i-auth.facade';


@Injectable()
export class RoleProvider extends NbRoleProvider {
    constructor(
        private authFacade: IAuthFacade,
    ) {
        super();
    }

    getRole(): Observable<string> {
        return from(this.authFacade.authenticate()).pipe(
            map((result) => {
                if (isLeft(result)) {
                    return null;
                }
                return result.right.role;
            }),
        );
    }
}