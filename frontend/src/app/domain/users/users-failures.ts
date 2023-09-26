import { IFailure } from '../core/i-failure';

export abstract class UsersFailure implements IFailure {
    abstract title: string;
    abstract description: string;
}

export class PermissionAlreadyRequested extends UsersFailure {
    title = 'Permissão já solicitada';
    description = 'Solicitação de permissão pendente de aprovação do ADM do sistema';
}

export class LowerPermissionRequested extends UsersFailure {
    title = 'Permissão solicitada inferior';
    description = 'A permissão atual é igual ou superior a solicitada';
}

