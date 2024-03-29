import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';
import { BlocoService } from './bloco.service';
import { BlocoOperations } from './dtos/bloco.operations';

@ApiTags('Blocos')
@Controller('/blocos')
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get('/')
  @DtoOperationFindAll(BlocoOperations.BLOCO_FIND_ALL)
  async blocoFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IBlocoFindAllResultDto> {
    return this.blocoService.blocoFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(BlocoOperations.BLOCO_FIND_ONE_BY_ID)
  async blocoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(BlocoOperations.BLOCO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(BlocoOperations.BLOCO_CREATE)
  async blocoCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(BlocoOperations.BLOCO_CREATE) dto: Dto.IBlocoInputDto) {
    return this.blocoService.blocoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(BlocoOperations.BLOCO_UPDATE)
  async blocoUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(BlocoOperations.BLOCO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(BlocoOperations.BLOCO_UPDATE)
    dto: Omit<Dto.IBlocoUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IBlocoUpdateDto = {
      ...dto,
      id,
    };

    return this.blocoService.blocoUpdate(contextoDeAcesso, dtoUpdate);
  }

  @Put('/:id/imagens/capa')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024, files: 1 } }))
  async blocoImagemCapaSave(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string, @UploadedFile() file: Express.Multer.File) {
    return this.blocoService.blocoUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(BlocoOperations.BLOCO_DELETE_ONE_BY_ID)
  async blocoDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(BlocoOperations.BLOCO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.blocoService.blocoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
