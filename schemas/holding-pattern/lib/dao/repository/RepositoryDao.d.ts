import { Terminal_UuId, User_UuId } from '@airport/travel-document-checkpoint';
import { Actor_UuId, Repository_Id, Repository_CreatedAt, Repository_Source, Repository_UuId } from '../../ddl/ddl';
import { BaseRepositoryDao, IBaseRepositoryDao, IRepository } from '../../generated/generated';
export interface IRepositoryDao extends IBaseRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryUuId: Repository_UuId): Promise<IRepository>;
    findLocalRepoIdsByGlobalIds(createdAts: Repository_CreatedAt[], uuIds: Repository_UuId[], ownerActorRandomIds: Actor_UuId[], ownerUserUniqueIds: User_UuId[], ownerTerminalUuids: Terminal_UuId[], ownerTerminalOwnerUserUniqueIds: User_UuId[]): Promise<RepositoryIdMap>;
    findReposWithGlobalIds(repositoryIds: Repository_Id[]): Promise<Map<Repository_Id, IRepository>>;
    findByUuIds(uuIds: Repository_UuId[]): Promise<IRepository[]>;
    insert(repositories: IRepository[]): Promise<void>;
}
export declare type RepositoryIdMap = Map<User_UuId, Map<Terminal_UuId, Map<User_UuId, Map<Actor_UuId, Map<number, Map<Repository_UuId, Repository_Id>>>>>>;
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryUuId: Repository_UuId): Promise<IRepository>;
    findReposWithDetailsAndSyncNodeIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findReposWithGlobalIds(repositoryIds: Repository_Id[]): Promise<Map<Repository_Id, IRepository>>;
    findLocalRepoIdsByGlobalIds(createdAts: Repository_CreatedAt[], uuIds: Repository_UuId[], ownerActorRandomIds: Actor_UuId[], ownerUserUniqueIds: User_UuId[], ownerTerminalUuids: Terminal_UuId[], ownerTerminalOwnerUserUniqueIds: User_UuId[]): Promise<RepositoryIdMap>;
    findByUuIds(uuIds: Repository_UuId[]): Promise<IRepository[]>;
    insert(repositories: IRepository[]): Promise<void>;
}
//# sourceMappingURL=RepositoryDao.d.ts.map