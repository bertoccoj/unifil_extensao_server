import { EntityAndRepository } from './../core/database/entity-and-repository';
import { User, UserRepository } from './auth/user';
import { Cidade, CidadeRepository } from './localizacao/cidade';
import { Estado, EstadoRepository } from './localizacao/estado';
import { Solicitacao, SolicitacaoRepository } from './solicitacao/solicitacao';

export * from './auth/user';

export const entitiesAndRepositories: EntityAndRepository[] = [
    [User, UserRepository],
    [Solicitacao, SolicitacaoRepository],
    [Cidade, CidadeRepository],
    [Estado, EstadoRepository],
];

export const entities = entitiesAndRepositories.map(([entity]) => entity);
