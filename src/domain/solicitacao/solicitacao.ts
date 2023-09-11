import { User } from 'src/domain/auth/user';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from 'typeorm';
// import { Bairro } from '../localizacao/bairro';
import { Cidade } from '../localizacao/cidade';
import { Estado } from '../localizacao/estado';

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

@Entity()
export class Solicitacao {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: ETipoSolicitacao,
    })
    tipo: ETipoSolicitacao;

    @Column({
        type: 'enum',
        enum: EStatusSolicitacao,
        default: EStatusSolicitacao.aguardandoAnalise,
    })
    status: EStatusSolicitacao;

    @Column('text', { default: '' })
    descricao: string;

    @Column('text')
    extensaoArquivo: string;

    @Column('real')
    latitude: number;

    @Column('real')
    longitude: number;

    @ManyToOne(() => Cidade, (cidade) => cidade.solicitacoes, {
        onDelete: "CASCADE",
    })
    cidade: Cidade;

    @ManyToOne(() => Estado, (estado) => estado.solicitacoes, {
        onDelete: "CASCADE",
    })
    estado: Estado;

    @Column('date', { nullable: true })
    dataPrevistaReparo: Date;

    @ManyToOne(() => User, (user) => user.solicitacoes, {
        onDelete: "CASCADE",
        nullable: true,
    })
    createdBy: User;
}

export abstract class SolicitacaoRepository extends Repository<Solicitacao> { }