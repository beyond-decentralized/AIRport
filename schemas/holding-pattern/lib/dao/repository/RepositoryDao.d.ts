import { IQNumberField, MappedEntityArray, RawFieldQuery } from '@airport/air-control';
import { ApplicationSignature } from '@airport/ground-control';
import { Terminal_UuId, User_Email, User_PrivateId } from '@airport/travel-document-checkpoint';
import { ActorUuId, Repository_Id, Repository_CreatedAt, Repository_Source, Repository_UuId, RepositoryTransactionHistoryId } from '../../ddl/ddl';
import { BaseRepositoryDao, IBaseRepositoryDao, IRepository } from '../../generated/generated';
export interface IRepositoryDao extends IBaseRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryUuId: Repository_UuId): Promise<IRepository>;
    findReposWithDetailsByIds(repositoryIdsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }, uuId: Terminal_UuId, userEmail: User_Email): Promise<MappedEntityArray<IRepository>>;
    findLocalRepoIdsByGlobalIds(createdAts: Repository_CreatedAt[], uuIds: Repository_UuId[], ownerActorRandomIds: ActorUuId[], ownerUserUniqueIds: User_PrivateId[], ownerTerminalUuids: Terminal_UuId[], ownerTerminalOwnerUserUniqueIds: User_PrivateId[]): Promise<RepositoryIdMap>;
    findReposWithGlobalIds(repositoryIds: Repository_Id[]): Promise<Map<Repository_Id, IRepository>>;
    findReposForAppSignature(applicationSignature: ApplicationSignature): Promise<IRepository[]>;
}
export declare type RepositoryIdMap = Map<User_PrivateId, Map<Terminal_UuId, Map<User_PrivateId, Map<ActorUuId, Map<number, Map<Repository_UuId, Repository_Id>>>>>>;
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    getRepositoryLoadInfo(repositorySource: Repository_Source, repositoryUuId: Repository_UuId): Promise<IRepository>;
    findReposWithTransactionLogDetailsByIds(repositoryIds: Repository_Id[]): Promise<MappedEntityArray<IRepository>>;
    findReposWithDetailsAndSyncNodeIds(repositoryIds: Repository_Id[]): Promise<IRepository[]>;
    findReposWithDetailsByIds(repositoryIdsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }, uuId: Terminal_UuId, userEmail: User_Email): Promise<MappedEntityArray<IRepository>>;
    findReposWithGlobalIds(repositoryIds: Repository_Id[]): Promise<Map<Repository_Id, IRepository>>;
    findLocalRepoIdsByGlobalIds(createdAts: Repository_CreatedAt[], uuIds: Repository_UuId[], ownerActorRandomIds: ActorUuId[], ownerUserUniqueIds: User_PrivateId[], ownerTerminalUuids: Terminal_UuId[], ownerTerminalOwnerUserUniqueIds: User_PrivateId[]): Promise<RepositoryIdMap>;
    findReposForAppSignature(applicationSignature: ApplicationSignature): Promise<IRepository[]>;
}
//# sourceMappingURL=RepositoryDao.d.ts.map