import { Either } from 'fp-ts/lib/Either';
import { IFailure } from '../core/i-failure';
import { AddTratativaSolicitacaoPayload, Solicitacao } from './solicitacao';

export abstract class ISolicitacaoRepository {
    abstract index(): Promise<Either<IFailure, Solicitacao[]>>;
    abstract details(id: Solicitacao['id']): Promise<Either<IFailure, Solicitacao>>;
    abstract addTratativa(tratativa: AddTratativaSolicitacaoPayload): Promise<Either<IFailure, { id: Solicitacao['id'] }>>;
} 
