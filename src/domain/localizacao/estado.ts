import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Solicitacao } from '../solicitacao/solicitacao';
import { Cidade } from './cidade';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @OneToMany(() => Cidade, (cidade) => cidade.estado)
    cidades: Cidade[];

    @OneToMany(() => Solicitacao, (solicitacao) => solicitacao.estado)
    solicitacoes: Solicitacao[];
}

export abstract class EstadoRepository extends Repository<Estado> { }