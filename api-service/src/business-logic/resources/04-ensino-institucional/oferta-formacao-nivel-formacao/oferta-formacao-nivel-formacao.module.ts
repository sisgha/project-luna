import { NivelFormacaoModule } from "@/business-logic/resources/04-ensino-institucional/nivel-formacao/nivel-formacao.module";
import { OfertaFormacaoModule } from "@/business-logic/resources/04-ensino-institucional/oferta-formacao/oferta-formacao.module";
import { Module } from "@nestjs/common";
import { OfertaFormacaoNivelFormacaoController } from "./oferta-formacao-nivel-formacao.controller";
import { OfertaFormacaoNivelFormacaoResolver } from "./oferta-formacao-nivel-formacao.resolver";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@Module({
  imports: [OfertaFormacaoModule, NivelFormacaoModule],
  controllers: [OfertaFormacaoNivelFormacaoController],
  providers: [OfertaFormacaoNivelFormacaoService, OfertaFormacaoNivelFormacaoResolver],
  exports: [OfertaFormacaoNivelFormacaoService],
})
export class OfertaFormacaoNivelFormacaoModule {}
