import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IEstadoFindOneResultDto, IRequestContext } from '../../../../domain';
import {
  DtoOperationFindAll,
  DtoOperationFindOne,
  HttpDtoParam,
  ResolveRequestContextHttp,
} from '../../../../infrastructure';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';

@ApiTags('ambientes')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @DtoOperationFindAll(EstadoOperations.ESTADO_FIND_ALL)
  async findAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<IEstadoFindOneResultDto[]> {
    return this.estadoService.findAll(requestContext);
  }

  @Get('/uf/:uf')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  @ApiParam({
    name: 'uf',
    description: 'Sigla do estado.',
  })
  async findByUf(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpDtoParam(EstadoOperations.ESTADO_FIND_ONE_BY_UF, 'uf')
    uf: string,
  ) {
    return this.estadoService.findByUfStrict(requestContext, { uf });
  }

  @Get('/:id')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  @ApiParam({
    name: 'id',
    description: 'ID IBGE do estado.',
  })
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpDtoParam(EstadoOperations.ESTADO_FIND_ONE_BY_ID, 'id')
    id: number,
  ) {
    return this.estadoService.findByIdStrict(requestContext, { id });
  }
}
