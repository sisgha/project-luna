import { IEntityDate } from 'application/business/(spec)';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AmbienteEntity } from '../ambientes/ambiente.entity';
import { CursoEntity } from './curso.entity';

@Entity('turma')
export class TurmaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'periodo', type: 'text', nullable: false })
  periodo!: string;

  @Column({ name: 'grupo', type: 'text', nullable: false })
  grupo!: string;

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: 'id_ambiente_padrao_aula_fk' })
  ambientePadraoAula!: AmbienteEntity | null;

  @ManyToOne(() => CursoEntity)
  @JoinColumn({ name: 'id_curso_fk' })
  curso!: CursoEntity;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
