import { IsFile, MemoryStoredFile } from 'nestjs-form-data';
import { ETipoSolicitacao } from '../../../domain/solicitacao/solicitacao';

export class CriarSolicitacaoPayload {
    tipo: ETipoSolicitacao;
    descricao: string;
    latitude: number;
    longitude: number;

    @IsFile()
    image: MemoryStoredFile;
}