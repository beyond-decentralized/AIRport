import { IContext } from '@airport/direction-indicator';
import { Terminal_GUID, User_GUID } from '@airport/travel-document-checkpoint';
import { Actor_GUID, Repository_Id, Repository_Source, Repository_GUID } from '../../ddl/ddl';
import { BaseRepositoryDao, IBaseRepositoryDao, IRepository } from '../../generated/generated';
export interface IRepositoryDao extends IBaseRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryGUID: Repository_GUID, context: IContext): Promise<IRepository>;
    findByIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findByGUIDs(repositoryGUIDs: Repository_GUID[]): Promise<IRepository[]>;
    insert(repositories: IRepository[], context: IContext): Promise<void>;
}
export declare type RepositoryIdMap = Map<User_GUID, Map<Terminal_GUID, Map<User_GUID, Map<Actor_GUID, Map<number, Map<Repository_GUID, Repository_Id>>>>>>;
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryGUID: Repository_GUID, context: IContext): Promise<IRepository>;
    findReposWithDetailsAndSyncNodeIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findByIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findByGUIDs(repositoryGUIDs: Repository_GUID[]): Promise<IRepository[]>;
    insert(repositories: IRepository[], context: IContext): Promise<void>;
}
//# sourceMappingURL=RepositoryDao.d.ts.map