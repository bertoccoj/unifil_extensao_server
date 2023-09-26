import { DataClass } from '../../application/core/models/data-class';

export enum EUserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    BACKOFFICE = 'BACKOFFICE',
}

export class User extends DataClass<User> {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    displayName: string;
    apiKey: string;
    role: EUserRole;
    requestedRole: EUserRole;
}
