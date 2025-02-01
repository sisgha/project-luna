import { PerfilModule } from "@/business-logic/resources/autorizacao/perfil/perfil.module";
import { DisponibilidadeModule } from "@/business-logic/resources/horario-academico/disponibilidade/disponibilidade.module";
import { Module } from "@nestjs/common";
import { ProfessorDisponibilidadeController } from "./professor-disponibilidade.controller";
import { ProfessorDisponibilidadeResolver } from "./professor-disponibilidade.resolver";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@Module({
  imports: [PerfilModule, DisponibilidadeModule],
  controllers: [ProfessorDisponibilidadeController],
  providers: [
    ProfessorDisponibilidadeService,
    ProfessorDisponibilidadeResolver,
  ],
  exports: [ProfessorDisponibilidadeService],
})
export class ProfessorDisponibilidadeModule {}
