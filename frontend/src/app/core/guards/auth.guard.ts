import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isRight } from 'fp-ts/lib/Either';
import { IAuthFacade } from '../../domain/auth/i-auth.facade';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private http: HttpClient,
        private authFacade: IAuthFacade,
    ) { }

    async canActivate(): Promise<boolean | UrlTree> {
        try {
            const res = await this.authFacade.authenticate();

            const valid = isRight(res);

            if (!valid) {
                await this.router.navigate(['/auth/login']);
            }

            return valid;

        } catch (error) {
            await this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
