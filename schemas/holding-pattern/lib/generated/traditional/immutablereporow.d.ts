import { IRepositoryEntity } from '../repository/repositoryentity';
export interface IImmutableRepoRow extends IRepositoryEntity {
    createdAt?: Date;
}
