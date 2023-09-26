import { IFailure } from '../core/i-failure';

export abstract class AuthFailure implements IFailure {
    abstract title: string;
    abstract description: string;
}

export class EmailPasswordCombinationNotFound extends AuthFailure {
    title = 'Combinação de usuario e senha não encontrada';
    description = 'Não foi possível encotnrar um usuário com as credenciais fornecidas';
}

export class Unauthenticated extends AuthFailure {
    title = 'Não autenticado';
    description = 'É necessário estar autenticado para acessar está funcionalidade';
}

export class Unexpected extends AuthFailure {
    title = 'Erro inesperado';
    description = 'Um erro inesperado ocorreu';
}
