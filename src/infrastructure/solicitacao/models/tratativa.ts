import { EStatusSolicitacao } from 'src/domain/solicitacao/solicitacao';

export interface TratativaPayload {
    mensagem: string;
    novoStatus: EStatusSolicitacao;
    dataReparo: string;
}

export enum ETratativaErrors {
    SOLICITACAO_FINALIZADA = 1,
}