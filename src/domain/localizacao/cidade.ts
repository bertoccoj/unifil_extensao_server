import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Solicitacao } from '../solicitacao/solicitacao';
import { Estado } from './estado';

@Entity()
export class Cidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @ManyToOne(() => Estado, (estado) => estado.cidades, {
        onDelete: "CASCADE"
    })
    estado: Estado;

    @OneToMany(() => Solicitacao, (solicitacao) => solicitacao.cidade)
    solicitacoes: Solicitacao[];
}

export abstract class CidadeRepository extends Repository<Cidade> { }