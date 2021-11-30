import { Actor_Id, Repository_Id } from '../../ddl/ddl';
import { BaseRepositoryActorDao, IBaseRepositoryActorDao, IRepositoryActor } from '../../generated/generated';
export interface IRepositoryActorDao extends IBaseRepositoryActorDao {
    findAllForLocalActorsWhereRepositoryIdIn(repositoryIds: Repository_Id[]): Promise<IRepositoryActor[]>;
    findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds: Repository_Id[]): Promise<Map<Repository_Id, Set<Actor_Id>>>;
}
export declare class RepositoryActorDao extends BaseRepositoryActorDao implements IRepositoryActorDao {
    findAllForLocalActorsWhereRepositoryIdIn(repositoryIds: Repository_Id[]): Promise<IRepositoryActor[]>;
    findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds: Repository_Id[]): Promise<Map<Repository_Id, Set<Actor_Id>>>;
}
//# sourceMappingURL=RepositoryActorDao.d.ts.map