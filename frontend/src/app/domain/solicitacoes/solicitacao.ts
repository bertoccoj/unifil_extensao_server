import { User } from '../auth/user';

export enum ETipoSolicitacao {
    buraco = 1,
    iluminacaoPublica = 2,
    esgoto = 3,
    outros = 4,
}

export enum EStatusSolicitacao {
    aguardandoAnalise = 1,
    aguardandoReparo = 2,
    concluido = 3,
    reparoRecusado = 4,
}

export class Estado {
    id: number;
    nome: string;
    cidades: Cidade[];
}

export class Cidade {
    id: number;
    nome: string;
    estado: Estado;
}

export interface Solicitacao {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    tipo: ETipoSolicitacao;
    status: EStatusSolicitacao;
    descricao: string;
    extensaoArquivo: string;
    dataPrevistaReparo: Date;
    createdBy: User;
    latitude: number;
    longitude: number;
    cidade: Cidade;
    estado: Estado;
    tratativas: TratativaSolicitacao[];
}

export class TratativaSolicitacao {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    solicitacao: Solicitacao;
    responsavel: User;
    mensagem: string;
    statusAnterior: EStatusSolicitacao;
    novoStatus: EStatusSolicitacao;
    dataReparo: string;
}

export type AddTratativaSolicitacaoPayload = Partial<Pick<TratativaSolicitacao, 'mensagem' | 'novoStatus' | 'dataReparo'> & { solicitacaoId: Solicitacao['id'] }>;
