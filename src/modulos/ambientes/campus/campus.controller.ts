import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { CampusService } from './campus.service';

@ApiTags('Campi')
@Controller('/campi')
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get('/')
  @Operacao(Spec.CampusFindAllOperator())
  async campusFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CampusFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.ICampusFindAllResultDto> {
    return this.campusService.campusFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.CampusFindOneByIdOperator())
  async campusFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CampusFindOneByIdOperator())
    { id }: Spec.ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.CampusCreateOperator())
  async campusCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.CampusCreateOperator()) dto: Spec.ICampusInputDto) {
    return this.campusService.campusCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.CampusUpdateOperator())
  async campusUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CampusUpdateOperator())
    { id, ...dto }: Spec.ICampusUpdateDto,
  ) {
    const dtoUpdate: Spec.ICampusUpdateDto = {
      ...dto,
      id,
    };

    return this.campusService.campusUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.CampusDeleteOperator())
  async campusDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CampusFindOneByIdOperator())
    { id }: Spec.ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
