import * as Spec from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VinculoEntity } from '../autenticacao/vinculo.entity';
import { CampusPossuiModalidadeEntity } from '../ensino/campus_possui_modalidade.entity';
import { ModalidadeEntity } from '../ensino/modalidade.entity';
import { EnderecoEntity } from './endereco.entity';

@Entity('campus')
export class CampusEntity implements Spec.ICampusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome_fantasia', type: 'text', nullable: false })
  nomeFantasia!: string;

  @Column({ name: 'razao_social', type: 'text', nullable: false })
  razaoSocial!: string;

  @Column({ name: 'apelido', type: 'text', nullable: false })
  apelido!: string;

  @Column({ name: 'cnpj', type: 'text', nullable: false })
  cnpj!: string;

  //

  @ManyToOne(() => EnderecoEntity)
  @JoinColumn({ name: 'id_endereco_fk' })
  endereco!: Spec.IEnderecoModel;

  //

  @OneToMany(() => VinculoEntity, (vinculo) => vinculo.campus)
  vinculos!: VinculoEntity[];

  @OneToMany(() => CampusPossuiModalidadeEntity, (campusPossuiModalidade) => campusPossuiModalidade.campus)
  campusPossuiModalidade!: CampusPossuiModalidadeEntity[];

  modalidades!: ModalidadeEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Spec.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Spec.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Spec.IEntityDate;
}
