import { IQNumberField, IQOrderableField, JSONLogicalOperation, RawFieldQuery } from '@airport/air-control';
import { EntityId, JSONBaseOperation } from '@airport/ground-control';
import { ActorId, RecordHistoryActorRecordId, RepositoryEntityActorRecordId, RepositoryId, RepositoryTransactionHistoryId } from '../../ddl/ddl';
import { IOperationHistoryDuo } from '../../duo/history/OperationHistoryDuo';
import { IRecordHistoryDuo } from '../../duo/history/RecordHistoryDuo';
import { BaseRepositoryTransactionHistoryDao, IRepositoryTransactionHistory, QActor, QOperationHistory, QRecordHistory, QRecordHistoryNewValue, QRepository, QRepositoryTransactionHistory, RepositoryTransactionHistoryESelect } from '../../generated/generated';
export interface IRepositoryTransactionHistoryDao {
    getSelectClauseWithRecordHistory(operHistoryDuo: IOperationHistoryDuo, recHistoryDuo: IRecordHistoryDuo): RepositoryTransactionHistoryESelect;
    findWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, r: QRepository, oh?: QOperationHistory, rh?: QRecordHistory, rhnv?: QRecordHistoryNewValue): JSONLogicalOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWhereIdsIn(idsInClause: RepositoryTransactionHistoryId[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findExistingRecordIdMap(recordIdMap: Map<RepositoryId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>): Promise<Map<RepositoryId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<RepositoryId, IChangedRecordIdsForRepository>): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>>;
    setBlockIdWhereId(getSetClause: {
        (id: IQNumberField): IQOrderableField<IQNumberField>;
    }): Promise<number>;
}
export interface IChangedRecordIdsForRepository {
    ids: Map<EntityId, Map<ActorId, Set<RecordHistoryActorRecordId>>>;
    firstChangeTime: Date;
}
export declare class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao implements IRepositoryTransactionHistoryDao {
    getSelectClauseWithRecordHistory(operHistoryDuo: IOperationHistoryDuo, recHistoryDuo: IRecordHistoryDuo): RepositoryTransactionHistoryESelect;
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
    setBlockIdWhereId(getSetClause: {
        (id: IQNumberField): IQNumberField;
    }): Promise<number>;
}
