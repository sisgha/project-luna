import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import jetpack, { createReadStream } from 'fs-jetpack';
import { writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { v4 } from 'uuid';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { DatabaseContextService } from '../../../../infrastructure';
import { ArquivoEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/base/arquivo.entity';

type IGetFileAcesso = null | {
  recurso: string;
  id: string;
};

@Injectable()
export class ArquivoService {
  constructor(private databaseContextService: DatabaseContextService) {}

  get arquivoRepository() {
    return this.databaseContextService.arquivoRepository;
  }

  private get dataFileBasePath() {
    // TODO: path from env
    return `/tmp/data/arquivos`;
  }

  private datGetFilePath(id: Dto.IArquivoModel['id']) {
    jetpack.dir(this.dataFileBasePath);
    return `${this.dataFileBasePath}/${id}`;
  }

  async dataExists(id: Dto.IArquivoModel['id']) {
    const fileFullPath = this.datGetFilePath(id);
    return jetpack.exists(fileFullPath);
  }

  async dataReadAsStream(id: Dto.IArquivoModel['id']) {
    if (await this.dataExists(id)) {
      const fileFullPath = this.datGetFilePath(id);
      const fileReadStream = createReadStream(fileFullPath);
      return fileReadStream;
    }

    return null;
  }

  async getFile(contextoDeAcesso: IContextoDeAcesso, id: Dto.IArquivoModel['id'], acesso: IGetFileAcesso | null) {
    const qb = this.arquivoRepository.createQueryBuilder('arquivo');

    if (acesso) {
      if (acesso.recurso === 'bloco') {
        qb
          //
          .innerJoin('arquivo.imagemArquivo', 'imagemArquivo')
          .innerJoin('imagemArquivo.imagem', 'imagem', 'imagem.id = :imagemId', { imagemId: acesso.id })
          .leftJoin('imagem.blocoCapa', 'blocoCapa');

        qb.andWhere('blocoCapa.id is not null');

        await contextoDeAcesso.aplicarFiltro('bloco:find', qb, 'blocoCapa', null);
      }
    }

    const arquivo = await qb.getOne();

    if (!arquivo) {
      throw new NotFoundException();
    }

    if (!(await this.dataExists(id))) {
      throw new ServiceUnavailableException();
    }

    const stream = await this.dataReadAsStream(id);

    return {
      id: arquivo.id,
      nome: arquivo.nome,
      mimeType: arquivo.mimeType,
      stream,
    };
  }

  async dataSave(id: Dto.IArquivoModel['id'], data: NodeJS.ArrayBufferView | Readable) {
    const fileFullPath = this.datGetFilePath(id);
    await writeFile(fileFullPath, data);
    return true;
  }

  async arquivoCreate(dto: Pick<Dto.IArquivoModel, 'nome' | 'mimeType'>, data: NodeJS.ArrayBufferView | Readable): Promise<Pick<ArquivoEntity, 'id'>> {
    let id: string;

    do {
      id = v4();
    } while (await this.dataExists(id));

    await this.dataSave(id, data);

    // TODO: sizeBytes
    const sizeBytes = null;
    // TODO: mimeType
    const mimeType = dto.mimeType;

    await this.arquivoRepository.save(<ArquivoEntity>{
      id,
      //
      nome: dto.nome,
      mimeType: mimeType,
      sizeBytes: sizeBytes,
      storageType: 'filesystem',
      //
    });

    return {
      id,
    };
  }
}
