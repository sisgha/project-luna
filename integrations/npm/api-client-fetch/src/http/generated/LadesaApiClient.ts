import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import { FetchHttpRequest } from "./core/FetchHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { Interceptors } from "./core/OpenAPI";

import { AmbientesService } from "./sdk.gen";
import { ArquivosService } from "./sdk.gen";
import { AulasService } from "./sdk.gen";
import { AutenticacaoService } from "./sdk.gen";
import { BaseService } from "./sdk.gen";
import { BlocosService } from "./sdk.gen";
import { CalendariosLetivosService } from "./sdk.gen";
import { CampiService } from "./sdk.gen";
import { CidadesService } from "./sdk.gen";
import { CursosService } from "./sdk.gen";
import { DiariosService } from "./sdk.gen";
import { DiariosPreferenciaAgrupamentoService } from "./sdk.gen";
import { DiariosProfessoresService } from "./sdk.gen";
import { DiasCalendariosService } from "./sdk.gen";
import { DisciplinasService } from "./sdk.gen";
import { DisponibilidadesService } from "./sdk.gen";
import { EstadosService } from "./sdk.gen";
import { EtapasService } from "./sdk.gen";
import { EventosService } from "./sdk.gen";
import { GradesHorariosOfertasFormacoesService } from "./sdk.gen";
import { GradesHorariosOfertasFormacoesIntervalosDeTempoService } from "./sdk.gen";
import { HorariosGeradosService } from "./sdk.gen";
import { HorariosGeradosAulaService } from "./sdk.gen";
import { ModalidadesService } from "./sdk.gen";
import { NiveisFormacoesService } from "./sdk.gen";
import { OfertasFormacoesService } from "./sdk.gen";
import { OfertasFormacoesNiveisFormacoesService } from "./sdk.gen";
import { PerfisService } from "./sdk.gen";
import { ProfessoresDisponibilidadesService } from "./sdk.gen";
import { ReservasService } from "./sdk.gen";
import { TurmasService } from "./sdk.gen";
import { TurmasDisponibilidadesService } from "./sdk.gen";
import { UsuariosService } from "./sdk.gen";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class LadesaApiClient {
  public readonly ambientes: AmbientesService;
  public readonly arquivos: ArquivosService;
  public readonly aulas: AulasService;
  public readonly autenticacao: AutenticacaoService;
  public readonly base: BaseService;
  public readonly blocos: BlocosService;
  public readonly calendariosLetivos: CalendariosLetivosService;
  public readonly campi: CampiService;
  public readonly cidades: CidadesService;
  public readonly cursos: CursosService;
  public readonly diarios: DiariosService;
  public readonly diariosPreferenciaAgrupamento: DiariosPreferenciaAgrupamentoService;
  public readonly diariosProfessores: DiariosProfessoresService;
  public readonly diasCalendarios: DiasCalendariosService;
  public readonly disciplinas: DisciplinasService;
  public readonly disponibilidades: DisponibilidadesService;
  public readonly estados: EstadosService;
  public readonly etapas: EtapasService;
  public readonly eventos: EventosService;
  public readonly gradesHorariosOfertasFormacoes: GradesHorariosOfertasFormacoesService;
  public readonly gradesHorariosOfertasFormacoesIntervalosDeTempo: GradesHorariosOfertasFormacoesIntervalosDeTempoService;
  public readonly horariosGerados: HorariosGeradosService;
  public readonly horariosGeradosAula: HorariosGeradosAulaService;
  public readonly modalidades: ModalidadesService;
  public readonly niveisFormacoes: NiveisFormacoesService;
  public readonly ofertasFormacoes: OfertasFormacoesService;
  public readonly ofertasFormacoesNiveisFormacoes: OfertasFormacoesNiveisFormacoesService;
  public readonly perfis: PerfisService;
  public readonly professoresDisponibilidades: ProfessoresDisponibilidadesService;
  public readonly reservas: ReservasService;
  public readonly turmas: TurmasService;
  public readonly turmasDisponibilidades: TurmasDisponibilidadesService;
  public readonly usuarios: UsuariosService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    });

    this.ambientes = new AmbientesService(this.request);
    this.arquivos = new ArquivosService(this.request);
    this.aulas = new AulasService(this.request);
    this.autenticacao = new AutenticacaoService(this.request);
    this.base = new BaseService(this.request);
    this.blocos = new BlocosService(this.request);
    this.calendariosLetivos = new CalendariosLetivosService(this.request);
    this.campi = new CampiService(this.request);
    this.cidades = new CidadesService(this.request);
    this.cursos = new CursosService(this.request);
    this.diarios = new DiariosService(this.request);
    this.diariosPreferenciaAgrupamento = new DiariosPreferenciaAgrupamentoService(this.request);
    this.diariosProfessores = new DiariosProfessoresService(this.request);
    this.diasCalendarios = new DiasCalendariosService(this.request);
    this.disciplinas = new DisciplinasService(this.request);
    this.disponibilidades = new DisponibilidadesService(this.request);
    this.estados = new EstadosService(this.request);
    this.etapas = new EtapasService(this.request);
    this.eventos = new EventosService(this.request);
    this.gradesHorariosOfertasFormacoes = new GradesHorariosOfertasFormacoesService(this.request);
    this.gradesHorariosOfertasFormacoesIntervalosDeTempo = new GradesHorariosOfertasFormacoesIntervalosDeTempoService(this.request);
    this.horariosGerados = new HorariosGeradosService(this.request);
    this.horariosGeradosAula = new HorariosGeradosAulaService(this.request);
    this.modalidades = new ModalidadesService(this.request);
    this.niveisFormacoes = new NiveisFormacoesService(this.request);
    this.ofertasFormacoes = new OfertasFormacoesService(this.request);
    this.ofertasFormacoesNiveisFormacoes = new OfertasFormacoesNiveisFormacoesService(this.request);
    this.perfis = new PerfisService(this.request);
    this.professoresDisponibilidades = new ProfessoresDisponibilidadesService(this.request);
    this.reservas = new ReservasService(this.request);
    this.turmas = new TurmasService(this.request);
    this.turmasDisponibilidades = new TurmasDisponibilidadesService(this.request);
    this.usuarios = new UsuariosService(this.request);
  }
}
