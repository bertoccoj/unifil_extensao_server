import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, left, right } from 'fp-ts/lib/Either';
import { Environment } from '../../core/common/config-reader.service';
import { Unit } from '../../core/common/unit';
import { AuthFailure, EmailPasswordCombinationNotFound, Unauthenticated } from '../../domain/auth/auth-failures';
import { IAuthFacade } from '../../domain/auth/i-auth.facade';
import { User } from '../../domain/auth/user';

@Injectable()
export class AuthFacadeImpl implements IAuthFacade {

    constructor(
        private http: HttpClient,
    ) { }

    async login(email: string, password: string): Promise<Either<AuthFailure, User>> {
        try {
            const user = await this.http.post<User>(
                Environment.getApiUrl('auth', 'log-in'),
                { email, password },
            ).toPromise();
            return right(user);
        } catch (error) {
            return left(new EmailPasswordCombinationNotFound());
        }
    }

    logout(): Promise<Either<AuthFailure, Unit>> {
        throw new Error('Method not implemented.');
    }

    async authenticate(): Promise<Either<AuthFailure, User>> {
        try {
            const user = await this.http.get<User>(
                Environment.getApiUrl('auth'),
            ).toPromise();
            return right(user);
        } catch (error) {
            return left(new Unauthenticated());
        }
    }

}
