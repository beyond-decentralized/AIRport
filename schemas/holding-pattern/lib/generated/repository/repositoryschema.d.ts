import { IRepository } from './repository';
export interface IRepositorySchema {
    id: number;
    repository: IRepository;
    schemaIndex?: number;
}
