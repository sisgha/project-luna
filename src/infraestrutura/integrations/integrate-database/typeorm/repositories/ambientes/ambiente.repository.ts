import { AmbienteEntity } from '../../entities/ambientes/ambiente.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createAmbienteRepository = createRepositoryFactory((ds) => ds.getRepository(AmbienteEntity).extend({}));

export type AmbienteRepository = IRepositoryFactoryOutput<typeof createAmbienteRepository>;
