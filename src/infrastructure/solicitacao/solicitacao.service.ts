import { BadRequestException, Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { EUserRole, User, UserRepository } from 'src/domain';
import { TratativaSolicitacao, TratativaSolicitacaoRepository } from 'src/domain/solicitacao/tratativa';
import { Readable } from 'stream';
import { Environment } from '../../core/constants/environment';
import { FSystem } from '../../core/file/file-system';
import { CidadeRepository } from '../../domain/localizacao/cidade';
import { EStatusSolicitacao, Solicitacao, SolicitacaoRepository } from '../../domain/solicitacao/solicitacao';
import { Geocoder } from '../core/geocoder.service';
import { PushService } from '../core/push.service';
import { CriarSolicitacaoPayload } from './models/criar-solicitacao-payload';
import { FiltroSolicitacao } from './models/filtro-solicitacao';
import { ETratativaErrors, TratativaPayload } from './models/tratativa';

@Injectable()
export class SolicitacaoService {
    novaTratativa$ = new Subject<Solicitacao['id']>();

    constructor(
        private solicitacaoRepository: SolicitacaoRepository,
        private cidadeRepository: CidadeRepository,
        private tratativaSolicitacaoRepository: TratativaSolicitacaoRepository,
        private geocoder: Geocoder,
        private fs: FSystem,
        private pushService: PushService,
        private userRepository: UserRepository,
    ) { }

    async list(filtro: FiltroSolicitacao, user: User): Promise<Solicitacao & { acompanhando: boolean }[]> {
        const solicitacoes = await this.solicitacaoRepository.find({
            where: filtro.toWhere(),
            relations: {
                cidade: true,
                estado: true,
                usuariosAcompanhando: true,
            },
        });
        const result = solicitacoes.map((s) => ({
            ...s,
            usuariosAcompanhando: [],
            acompanhando: s.usuariosAcompanhando.some(u => u.id === user.id),
        }));
        return result as any;
    }

    async details(id: Solicitacao['id'], user: User): Promise<Solicitacao> {
        return this.solicitacaoRepository.findOne({
            where: { id },
            select: {
                tratativas: {
                    mensagem: true,
                    createdAt: true,
                    id: true,
                    statusAnterior: true,
                    novoStatus: true,
                    dataReparo: true,
                    responsavel: {
                        id: true,
                        email: true,
                        displayName: true,
                        password: false,
                        createdAt: false,
                        updatedAt: false,
                        role: false,
                        requestedRole: false,
                    }
                }
            },
            relations: {
                cidade: true,
                estado: true,
                tratativas: [EUserRole.BACKOFFICE, EUserRole.ADMIN].includes(user.role) ? {
                    responsavel: true,
                } : false,
            },
        });
    }

    async add(payload: CriarSolicitacaoPayload, user: User): Promise<void> {
        const geocodeData = await this.geocoder.lookUp(payload.latitude, payload.longitude);
        const cidade = await this.cidadeRepository.findOne({
            where: { nome: 'Londrina' },
            relations: {
                estado: true,
            }
        });
        let solicitacao = new Solicitacao();
        solicitacao.tipo = Number(payload.tipo);
        solicitacao.descricao = payload.descricao;
        solicitacao.latitude = Number(payload.latitude);
        solicitacao.longitude = Number(payload.longitude);
        solicitacao.cidade = cidade;
        solicitacao.estado = cidade.estado;
        solicitacao.extensaoArquivo = payload.image.extension;
        solicitacao.usuariosAcompanhando = [user];

        solicitacao = await this.solicitacaoRepository.save(solicitacao);

        await this.fs.writeStreamToFile({
            data: Readable.from(payload.image.buffer),
            destination: this.fs.path.join(
                Environment.fotoSolicitacaoFolder,
                solicitacao.id.toString() + '.' + payload.image.extension,
            ),
            replace: false,
        });
    }

    async addtratativa(id: Solicitacao['id'], tratativa: TratativaPayload, user: User) {
        const solicitacao = await this.solicitacaoRepository.findOneBy({ id });

        if (solicitacao.status === EStatusSolicitacao.concluido) {
            throw new BadRequestException(ETratativaErrors.SOLICITACAO_FINALIZADA);
        }


        const tratativaSolicitacao = new TratativaSolicitacao();

        tratativaSolicitacao.mensagem = tratativa.mensagem;
        tratativaSolicitacao.solicitacao = solicitacao;
        tratativaSolicitacao.responsavel = user;
        tratativaSolicitacao.statusAnterior = solicitacao.status;
        tratativaSolicitacao.novoStatus = tratativa.novoStatus ?? solicitacao.status;

        if (tratativa.dataReparo) {
            tratativaSolicitacao.dataReparo = new Date(tratativa.dataReparo)
            solicitacao.dataPrevistaReparo = new Date(tratativa.dataReparo);
        }

        if (tratativa.novoStatus !== solicitacao.status) {
            solicitacao.status = tratativa.novoStatus;
        }

        await this.tratativaSolicitacaoRepository.save(tratativaSolicitacao);
        await this.solicitacaoRepository.save(solicitacao);

        this.enviarNotificacaoNovidades(id);
    }

    async enviarNotificacaoNovidades(id: Solicitacao['id']) {
        const solicitacao = await this.solicitacaoRepository.findOne({
            where: { id },
            select: {
                usuariosAcompanhando: true,
            },
            relations: {
                usuariosAcompanhando: true,
            },
        });
        await this.pushService.sendPush(
            {
                title: 'Atualização de solicitação',
                message: 'Há uma atualização para uma solicitação que você está acompanhando',
            },
            solicitacao.usuariosAcompanhando.map(u => u.id),
        );
    }

    async watch(id: Solicitacao['id'], user: User, token: string) {
        user.fcmToken = token;
        await this.userRepository.save(user);
        const solicitacao = await this.solicitacaoRepository.findOneBy({ id });
        solicitacao.usuariosAcompanhando.push(user);
        await this.solicitacaoRepository.save(user);
        this.pushService.sendPush(
            {
                title: 'Acompanhando uma nova solicitação',
                message: 'Te notificaremos sobre novidades',
            },
            [user.id],
        );
    }

}