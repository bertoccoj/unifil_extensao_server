import { NgModule } from '@angular/core';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './role-provider';

@NgModule({
    imports: [
        NbSecurityModule.forRoot({
            accessControl: {
                guest: {
                    view: [],
                },
                USER: {
                    parent: 'guest',
                    view: 'posts',
                    create: 'tags',
                    edit: 'tags',
                },
                ADMIN: {
                    parent: 'user',
                    create: '*',
                    edit: '*',
                    remove: '*',
                    view: '*',
                },
            },
        }),
    ],
    providers: [
        {
            provide: NbRoleProvider, useClass: RoleProvider,
        },
    ]
})
export class SecurityModule { }