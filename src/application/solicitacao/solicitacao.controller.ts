import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { Solicitacao } from 'src/domain/solicitacao/solicitacao';
import RequestWithUser from 'src/infrastructure/auth/models/request-with-user';
import { CriarSolicitacaoPayload } from 'src/infrastructure/solicitacao/models/criar-solicitacao-payload';
import { FiltroSolicitacao } from 'src/infrastructure/solicitacao/models/filtro-solicitacao';
import { TratativaPayload } from 'src/infrastructure/solicitacao/models/tratativa';
import { SolicitacaoService } from 'src/infrastructure/solicitacao/solicitacao.service';
import BackofficeGuard from '../core/guards/backoffice.guard';
import JwtAuthenticationGuard from '../core/guards/jwt-authentication.guard';

@UseGuards(JwtAuthenticationGuard)
@Controller('solicitacao')
export class SolicitacaoController {

    constructor(
        private solicitacaoService: SolicitacaoService,
    ) { }

    @Get()
    list(
        @Req() request: RequestWithUser,
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
            request.user,
        );
    }

    @Get(':id')
    details(@Param('id', ParseIntPipe) id: number, @Req() request: RequestWithUser) {
        return this.solicitacaoService.details(id, request.user);
    }

    @Post()
    @FormDataRequest()
    add(@Body() payload: CriarSolicitacaoPayload, @Req() request: RequestWithUser) {
        return this.solicitacaoService.add(payload, request.user);
    }

    @Post('tratativa/:id')
    @UseGuards(BackofficeGuard)
    addTratativa(@Body() payload: TratativaPayload, @Param('id') id: Solicitacao['id'], @Req() { user }: RequestWithUser) {
        return this.solicitacaoService.addtratativa(id, payload, user);
    }

    @Post('watch/:id')
    watcj(@Body() payload: { token: string }, @Param('id') id: Solicitacao['id'], @Req() { user }: RequestWithUser) {
        return this.solicitacaoService.watch(id, user, payload.token);
    }

}