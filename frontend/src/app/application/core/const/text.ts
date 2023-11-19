import { EStatusSolicitacao, ETipoSolicitacao } from '../../../domain/solicitacoes/solicitacao';

export const tipoSolicitacaoText = {
    [ETipoSolicitacao.buraco]: 'Buraco',
    [ETipoSolicitacao.esgoto]: 'Buraco',
    [ETipoSolicitacao.iluminacaoPublica]: 'Iluminação pública',
    [ETipoSolicitacao.outros]: 'outros',
};

export const statusSolicitacaoText = {
    [EStatusSolicitacao.aguardandoAnalise]: 'Aguardando analise',
    [EStatusSolicitacao.aguardandoReparo]: 'Aguardando reparo',
    [EStatusSolicitacao.concluido]: 'Concluído',
    [EStatusSolicitacao.reparoRecusado]: 'Reparo recusado',
}
