import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, left, right } from 'fp-ts/lib/Either';
import { Environment } from '../../core/common/config-reader.service';
import { Unexpected } from '../../domain/auth/auth-failures';
import { IFailure } from '../../domain/core/i-failure';
import { ISolicitacaoRepository } from '../../domain/solicitacoes/i-solicitacao-repository';
import { AddTratativaSolicitacaoPayload, Solicitacao } from '../../domain/solicitacoes/solicitacao';

@Injectable()
export class SolicitacaoRepositoryImpl implements ISolicitacaoRepository {

    constructor(private http: HttpClient) { }

    async index(): Promise<Either<IFailure, Solicitacao[]>> {
        try {
            const response = await this.http.get<Solicitacao[]>(Environment.getApiUrl('solicitacao')).toPromise();
            return right(response);
        } catch (error) {
            return left(new Unexpected());
        }
    }

    async details(id: Solicitacao['id']): Promise<Either<IFailure, Solicitacao>> {
        try {
            const response = await this.http.get<Solicitacao>(Environment.getApiUrl('solicitacao', id)).toPromise();
            return right(response);
        } catch (error) {
            return left(new Unexpected());
        }
    }

    async addTratativa(tratativa: AddTratativaSolicitacaoPayload): Promise<Either<IFailure, { id: Solicitacao['id'] }>> {
        try {
            await this.http.post<Solicitacao>(
                Environment.getApiUrl('solicitacao', 'tratativa', tratativa.solicitacaoId),
                tratativa,
            ).toPromise();
            return right({ id: tratativa.solicitacaoId });
        } catch (error) {
            return left(new Unexpected());
        }
    }

}