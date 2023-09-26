import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthFacade } from '../../domain/auth/i-auth.facade';
import { EUserRole } from '../../domain/auth/user';

@Injectable()
export class BackofficeGuard implements CanActivate {
    constructor(
        private authFacade: IAuthFacade,
        private toastService: NbToastrService,
        private router: Router,
    ) { }

    canActivate() {
        return from(this.authFacade.authenticate()).pipe(
            map((result) => {
                if (isLeft(result)) {
                    this.toastService.danger(result.left.description, result.left.title);
                    return false;
                }

                const isBackoffice = isRight(result) && [EUserRole.BACKOFFICE, EUserRole.ADMIN].includes(result.right.role);
                if (isBackoffice) {
                    return true;
                } else {
                    this.router.navigate(['/auth/insuficient-role'], { queryParams: { requiredRole: EUserRole.BACKOFFICE } });
                    return false;
                }
            })
        );
    }
}
