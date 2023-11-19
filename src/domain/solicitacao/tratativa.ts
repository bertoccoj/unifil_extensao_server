import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from 'typeorm';
import { User } from '../auth/user';
import { Solicitacao } from './solicitacao';

export enum EStatusSolicitacao {
    aguardandoAnalise = 1,
    aguardandoReparo = 2,
    concluido = 3,
    reparoRecusado = 4,
}

@Entity()
export class TratativaSolicitacao {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Solicitacao, (solicitacao) => solicitacao.tratativas, {
        onDelete: "CASCADE",
    })
    solicitacao: Solicitacao;

    @ManyToOne(() => User, (user) => user.tratativas, {
        onDelete: "CASCADE",
    })
    @JoinTable()
    responsavel: User;

    @Column('text', { default: '' })
    mensagem: string;

    @Column('date', { nullable: true })
    dataReparo: Date;

    @Column({
        type: 'enum',
        enum: EStatusSolicitacao,
        nullable: true,
    })
    statusAnterior: EStatusSolicitacao;

    @Column({
        type: 'enum',
        enum: EStatusSolicitacao,
        nullable: true,
    })
    novoStatus: EStatusSolicitacao;
}


export abstract class TratativaSolicitacaoRepository extends Repository<TratativaSolicitacao> { }