import { IUtils } from '@airport/air-control';
import { ActorId, RepositoryId } from '../../ddl/ddl';
import { BaseRepositoryActorDao, IBaseRepositoryActorDao, IRepositoryActor } from '../../generated/generated';
export interface IRepositoryActorDao extends IBaseRepositoryActorDao {
    findAllForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<IRepositoryActor[]>;
    findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, Set<ActorId>>>;
}
export declare class RepositoryActorDao extends BaseRepositoryActorDao implements IRepositoryActorDao {
    constructor(utils: IUtils);
    findAllForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<IRepositoryActor[]>;
    findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, Set<ActorId>>>;
}
