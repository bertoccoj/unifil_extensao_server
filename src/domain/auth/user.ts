import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from 'typeorm';
import { Solicitacao } from '../solicitacao/solicitacao';

export enum EUserRole {
    USER = 'USER',
    BACKOFFICE = 'BACKOFFICE',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    displayName: string;

    @Column('text')
    password: string;

    @Column({
        type: 'enum',
        enum: EUserRole,
        default: EUserRole.USER,
    })
    role: EUserRole;

    @Column({
        type: 'enum',
        enum: EUserRole,
        nullable: true,
    })
    requestedRole: EUserRole;

    @OneToMany(() => Solicitacao, (solicitacao) => solicitacao.createdBy)
    solicitacoes: Solicitacao[];
}

const extensions = {
    getByEmail(email: User['email']) {
        return this.findOneBy({ email });
    },
    getById(id: User['id']) {
        return this.findOneBy({ id });
    },
    async hasAdmin() {
        const admins = await this.countBy({ role: EUserRole.ADMIN });
        return admins > 0;
    }
}

export abstract class UserRepository extends Repository<User> {
    static extensions = extensions;
    abstract getByEmail(email: User['email']): Promise<User>;
    abstract getById(id: User['id']): Promise<User>;
    abstract hasAdmin(): Promise<boolean>;
}
