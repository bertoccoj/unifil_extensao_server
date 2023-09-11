import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { CriarSolicitacaoPayload } from 'src/infrastructure/solicitacao/models/criar-solicitacao-payload';
import { FiltroSolicitacao } from 'src/infrastructure/solicitacao/models/filtro-solicitacao';
import { SolicitacaoService } from 'src/infrastructure/solicitacao/solicitacao.service';
import JwtAuthenticationGuard from '../core/guards/jwt-authentication.guard';

@UseGuards(JwtAuthenticationGuard)
@Controller('solicitacao')
export class SolicitacaoController {

    constructor(
        private solicitacaoService: SolicitacaoService,
    ) { }

    @Get()
    list(
        @Query('tipo') tipo?: number,
        @Query('status') status?: number,
        @Query('latitude') latitude?: number,
        @Query('longitude') longitude?: number,
        @Query('bairroId') bairroId?: number,
        @Query('cidadeId') cidadeId?: number,
        @Query('estadoId') estadoId?: number,
        @Query('userId') userId?: number,
    ) {
        return this.solicitacaoService.list(
            new FiltroSolicitacao({
                tipo: (tipo && Number(tipo)) ?? null,
                status: (status && Number(status)) ?? null,
                latitude: (latitude && Number(latitude)) ?? null,
                longitude: (longitude && Number(longitude)) ?? null,
                bairroId: (bairroId && Number(bairroId)) ?? null,
                cidadeId: (cidadeId && Number(cidadeId)) ?? null,
                estadoId: (estadoId && Number(estadoId)) ?? null,
                userId: (userId && Number(userId)) ?? null,
            }),
        );
    }

    @Get(':id')
    details(@Param('id', ParseIntPipe) id: number) {
        return this.solicitacaoService.details(id);
    }

    @Post()
    @FormDataRequest()
    add(@Body() payload: CriarSolicitacaoPayload) {
        return this.solicitacaoService.add(payload);
    }

}