import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { Environment } from '../../core/constants/environment';
import { FSystem } from '../../core/file/file-system';
import { CidadeRepository } from '../../domain/localizacao/cidade';
import { Solicitacao, SolicitacaoRepository } from '../../domain/solicitacao/solicitacao';
import { Geocoder } from '../core/geocoder.service';
import { CriarSolicitacaoPayload } from './models/criar-solicitacao-payload';
import { FiltroSolicitacao } from './models/filtro-solicitacao';

@Injectable()
export class SolicitacaoService {

    constructor(
        private solicitacaoRepository: SolicitacaoRepository,
        private cidadeRepository: CidadeRepository,
        private geocoder: Geocoder,
        private fs: FSystem
    ) { }


    async list(filtro: FiltroSolicitacao): Promise<Solicitacao[]> {
        return this.solicitacaoRepository.find({
            where: filtro.toWhere(),
            relations: {
                cidade: true,
                estado: true,
            },
        });
    }

    async details(id: Solicitacao['id']): Promise<Solicitacao> {
        return this.solicitacaoRepository.findOne({
            where: { id },
            relations: {
                cidade: true,
                estado: true,
            },
        });
    }

    async add(payload: CriarSolicitacaoPayload): Promise<void> {
        const geocodeData = await this.geocoder.lookUp(payload.latitude, payload.longitude);
        const cidade = await this.cidadeRepository.findOne({
            where: { nome: geocodeData.cityName },
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
}