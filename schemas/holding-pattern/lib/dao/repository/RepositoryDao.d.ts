import { IQNumberField, MappedEntityArray, RawFieldQuery } from '@airport/air-control';
import { TerminalName, TerminalSecondId } from '@airport/arrivals-n-departures';
import { UserUniqueId } from '@airport/travel-document-checkpoint';
import { ActorUuId, RepositoryId, RepositoryCreatedAt, RepositoryUuId, RepositoryTransactionHistoryId } from '../../ddl/ddl';
import { BaseRepositoryDao, IBaseRepositoryDao, IRepository } from '../../generated/generated';
export interface IRepositoryDao extends IBaseRepositoryDao {
    findReposWithDetailsByIds(repositoryIdsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }, dbName: TerminalName, userEmail: UserUniqueId): Promise<MappedEntityArray<IRepository>>;
    findLocalRepoIdsByGlobalIds(createdAts: RepositoryCreatedAt[], uuIds: RepositoryUuId[], ownerActorRandomIds: ActorUuId[], ownerUserUniqueIds: UserUniqueId[], ownerTerminalNames: TerminalName[], ownerTerminalSecondIds: TerminalSecondId[], ownerTerminalOwnerUserUniqueIds: UserUniqueId[]): Promise<RepositoryIdMap>;
    findReposWithGlobalIds(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, IRepository>>;
}
export declare type RepositoryIdMap = Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, Map<ActorUuId, Map<RepositoryCreatedAt, Map<RepositoryUuId, RepositoryId>>>>>>>;
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    findReposWithTransactionLogDetailsByIds(repositoryIds: RepositoryId[]): Promise<MappedEntityArray<IRepository>>;
    findReposWithDetailsAndSyncNodeIds(repositoryIds: RepositoryId[]): Promise<IRepository[]>;
    findReposWithDetailsByIds(repositoryIdsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }, dbName: TerminalName, userEmail: UserUniqueId): Promise<MappedEntityArray<IRepository>>;
    findReposWithGlobalIds(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, IRepository>>;
    findLocalRepoIdsByGlobalIds(createdAts: RepositoryCreatedAt[], uuIds: RepositoryUuId[], ownerActorRandomIds: ActorUuId[], ownerUserUniqueIds: UserUniqueId[], ownerTerminalNames: TerminalName[], ownerTerminalSecondIds: TerminalSecondId[], ownerTerminalOwnerUserUniqueIds: UserUniqueId[]): Promise<RepositoryIdMap>;
}
//# sourceMappingURL=RepositoryDao.d.ts.map