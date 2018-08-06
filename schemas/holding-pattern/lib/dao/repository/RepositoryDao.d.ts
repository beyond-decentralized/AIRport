import { MappedEntityArray } from "@airport/air-control";
import { IQNumberField } from "@airport/air-control/lib/lingo/core/field/NumberField";
import { RawFieldQuery } from "@airport/air-control/lib/lingo/query/facade/FieldQuery";
import { IUtils } from "@airport/air-control/lib/lingo/utils/Utils";
import { TerminalName, TerminalSecondId } from '@airport/arrivals-n-departures';
import { RepositoryId, UserUniqueId } from "../../ddl/ddl";
import { BaseRepositoryDao, IRepository } from "../../generated/generated";
import { ActorRandomId, RepositoryOrderedId, RepositoryRandomId, RepositoryTransactionHistoryId } from "../../index";
export interface IRepositoryDao {
    findReposWithDetailsByIds(repositoryIdsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }, dbName: TerminalName, userEmail: UserUniqueId): Promise<MappedEntityArray<IRepository>>;
    findLocalRepoIdsByGlobalIds(orderedIds: RepositoryOrderedId[], randomIds: RepositoryRandomId[], ownerActorRandomIds: ActorRandomId[], ownerUserUniqueIds: UserUniqueId[], ownerTerminalNames: TerminalName[], ownerTerminalSecondIds: TerminalSecondId[], ownerTerminalOwnerUserUniqueIds: UserUniqueId[]): Promise<RepositoryIdMap>;
    findReposWithGlobalIds(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, IRepository>>;
}
export declare type RepositoryIdMap = Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, Map<ActorRandomId, Map<RepositoryOrderedId, Map<RepositoryRandomId, RepositoryId>>>>>>>;
export declare class RepositoryDao extends BaseRepositoryDao implements IRepositoryDao {
    constructor(utils: IUtils);
    findReposWithTransactionLogDetailsByIds(repositoryIds: RepositoryId[]): Promise<MappedEntityArray<IRepository>>;
    findReposWithDetailsAndSyncNodeIds(repositoryIds: RepositoryId[]): Promise<IRepository[]>;
    findReposWithDetailsByIds(repositoryIdsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }, dbName: TerminalName, userEmail: UserUniqueId): Promise<MappedEntityArray<IRepository>>;
    findReposWithGlobalIds(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, IRepository>>;
    findLocalRepoIdsByGlobalIds(orderedIds: RepositoryOrderedId[], randomIds: RepositoryRandomId[], ownerActorRandomIds: ActorRandomId[], ownerUserUniqueIds: UserUniqueId[], ownerTerminalNames: TerminalName[], ownerTerminalSecondIds: TerminalSecondId[], ownerTerminalOwnerUserUniqueIds: UserUniqueId[]): Promise<RepositoryIdMap>;
}
