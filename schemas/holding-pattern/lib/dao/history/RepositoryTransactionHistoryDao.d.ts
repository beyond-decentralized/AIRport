import { IQNumberField, JSONLogicalOperation, RawFieldQuery } from '@airport/air-control';
import { EntityId, JSONBaseOperation } from '@airport/ground-control';
import { ActorId, RecordHistoryActorRecordId, RepositoryEntityActorRecordId, RepositoryId, RepositoryTransactionHistoryId } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDao, IRepositoryTransactionHistory, QActor, QOperationHistory, QRecordHistory, QRecordHistoryNewValue, QRepository, QRepositoryTransactionHistory, RepositoryTransactionHistoryESelect } from '../../generated/generated';
export interface IRepositoryTransactionHistoryDao {
    getSelectClauseWithRecordHistory(): RepositoryTransactionHistoryESelect;
    findWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, r: QRepository, oh?: QOperationHistory, rh?: QRecordHistory, rhnv?: QRecordHistoryNewValue): JSONLogicalOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWhereIdsIn(idsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findExistingRecordIdMap(recordIdMap: Map<RepositoryId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>): Promise<Map<RepositoryId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<RepositoryId, IChangedRecordIdsForRepository>): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>>;
}
export interface IChangedRecordIdsForRepository {
    ids: Map<EntityId, Map<ActorId, Set<RecordHistoryActorRecordId>>>;
    firstChangeTime: Date;
}
export declare class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao implements IRepositoryTransactionHistoryDao {
    private operHistoryDmo;
    private recHistoryDmo;
    constructor();
    getSelectClauseWithRecordHistory(): RepositoryTransactionHistoryESelect;
    findWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, r: QRepository, oh?: QOperationHistory, rh?: QRecordHistory): JSONBaseOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWhereIdsIn(idsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWithActorAndRepositoryWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, a: QActor, r: QRepository): JSONBaseOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWithActorAndRepositoryWherIdsIn(idsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<RepositoryId, IChangedRecordIdsForRepository>): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>>;
    findExistingRecordIdMap(recordIdMap: Map<RepositoryId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>): Promise<Map<RepositoryId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
}
