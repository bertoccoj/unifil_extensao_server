import { NgModule } from '@angular/core';
import { IAuthFacade } from '../domain/auth/i-auth.facade';
import { IUserRepository } from '../domain/auth/i-user-repository';
import { IUsersFacade } from '../domain/users/i-users-facade';
import { AuthFacadeImpl } from './auth/auth-facade';
import { UserRepository } from './auth/user-repository';
import { UsersFacadeImpl } from './users/users-facade';

@NgModule({
  providers: [
    {
      provide: IAuthFacade,
      useClass: AuthFacadeImpl,
    },
    {
      provide: IUsersFacade,
      useClass: UsersFacadeImpl,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ]
})
export class InfrastructureModule { }
