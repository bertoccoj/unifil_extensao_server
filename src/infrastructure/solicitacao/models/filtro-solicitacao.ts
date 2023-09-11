import { ETipoSolicitacao, Solicitacao } from 'src/domain/solicitacao/solicitacao';
import { FindOptionsWhere } from 'typeorm';

export class FiltroSolicitacao {
    tipo?: number;
    status?: number;
    latitude?: number;
    longitude?: number;
    bairroId?: number;
    cidadeId?: number;
    estadoId?: number;
    userId?: number;
    constructor(filtro: Partial<FiltroSolicitacao>) {
        Object.assign(this, filtro);
    }

    toWhere(): FindOptionsWhere<Solicitacao> {
        const where: FindOptionsWhere<Solicitacao> = {};

        if (this.tipo) {
            where.tipo = this.tipo;
        }

        if (this.status) {
            where.status = this.status;
        }

        if (this.latitude) {
            where.latitude = this.latitude;
        }
        if (this.longitude) {
            where.longitude = this.longitude;
        }
        // if (this.bairroId) {
        //     where.bairro = { id: this.bairroId };
        // }

        if (this.cidadeId) {
            where.cidade = { id: this.cidadeId };
        }
        if (this.estadoId) {
            where.estado = { id: this.estadoId };
        }
        if (this.userId) {
            where.createdBy = { id: this.userId };
        }

        return where;
    }
}