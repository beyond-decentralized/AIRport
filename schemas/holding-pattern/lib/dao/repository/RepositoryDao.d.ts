import { IContext } from '@airport/direction-indicator';
import { Terminal_UuId, User_UuId } from '@airport/travel-document-checkpoint-runtime';
import { Actor_UuId, Repository_Id, Repository_Source, Repository_UuId } from '../../ddl/ddl';
import { BaseRepositoryDao, IBaseRepositoryDao, IRepository } from '../../generated/generated';
export interface IRepositoryDao extends IBaseRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryUuId: Repository_UuId, context: IContext): Promise<IRepository>;
    findByIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findByUuIds(uuIds: Repository_UuId[]): Promise<IRepository[]>;
    insert(repositories: IRepository[]): Promise<void>;
}
export declare type RepositoryIdMap = Map<User_UuId, Map<Terminal_UuId, Map<User_UuId, Map<Actor_UuId, Map<number, Map<Repository_UuId, Repository_Id>>>>>>;
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryUuId: Repository_UuId, context: IContext): Promise<IRepository>;
    findReposWithDetailsAndSyncNodeIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findByIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findByUuIds(uuIds: Repository_UuId[]): Promise<IRepository[]>;
    insert(repositories: IRepository[]): Promise<void>;
}
//# sourceMappingURL=RepositoryDao.d.ts.map