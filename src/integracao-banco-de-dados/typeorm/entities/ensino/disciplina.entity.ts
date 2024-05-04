import * as Spec from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImagemEntity } from '../base/imagem.entity';

@Entity('disciplina')
export class DisciplinaEntity implements Spec.IDisciplinaModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'nome_abreviado', type: 'text', nullable: false })
  nomeAbreviado!: string;

  @Column({ name: 'carga_horaria', type: 'int', nullable: false })
  cargaHoraria!: number;

  //

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Spec.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Spec.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Spec.IEntityDate;
}
