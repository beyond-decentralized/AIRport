import { IQNumberField, JSONLogicalOperation, RawFieldQuery } from '@airport/air-control';
import { EntityId, JSONBaseOperation } from '@airport/ground-control';
import { Actor_Id, RecordHistoryActorRecordId, RepositoryEntity_ActorRecordId, Repository_Id, RepositoryTransactionHistory_Id } from '../../ddl/ddl';
import { IOperationHistoryDuo } from '../../duo/history/OperationHistoryDuo';
import { IRecordHistoryDuo } from '../../duo/history/RecordHistoryDuo';
import { BaseRepositoryTransactionHistoryDao, IRepositoryTransactionHistory, QActor, QOperationHistory, QRecordHistory, QRecordHistoryNewValue, QRepository, QRepositoryTransactionHistory, RepositoryTransactionHistoryESelect } from '../../generated/generated';
export interface IRepositoryTransactionHistoryDao {
    getSelectClauseWithRecordHistory(operHistoryDuo: IOperationHistoryDuo, recHistoryDuo: IRecordHistoryDuo): RepositoryTransactionHistoryESelect;
    findWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, r: QRepository, oh?: QOperationHistory, rh?: QRecordHistory, rhnv?: QRecordHistoryNewValue): JSONLogicalOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWhereIdsIn(idsInClause: RepositoryTransactionHistory_Id[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findExistingRecordIdMap(recordIdMap: Map<Repository_Id, Map<Actor_Id, Map<EntityId, Set<RepositoryEntity_ActorRecordId>>>>): Promise<Map<Repository_Id, Map<EntityId, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>>>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<Repository_Id, IChangedRecordIdsForRepository>): Promise<Map<Repository_Id, IRepositoryTransactionHistory[]>>;
}
export interface IChangedRecordIdsForRepository {
    ids: Map<EntityId, Map<Actor_Id, Set<RecordHistoryActorRecordId>>>;
    firstChangeTime: number;
}
export declare class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao implements IRepositoryTransactionHistoryDao {
    getSelectClauseWithRecordHistory(operHistoryDuo: IOperationHistoryDuo, recHistoryDuo: IRecordHistoryDuo): RepositoryTransactionHistoryESelect;
    findWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, r: QRepository, oh?: QOperationHistory, rh?: QRecordHistory): JSONBaseOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWhereIdsIn(idsInClause: RepositoryTransactionHistory_Id[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWithActorAndRepositoryWhere(whereClauseFunction: {
        (rth: QRepositoryTransactionHistory, a: QActor, r: QRepository): JSONBaseOperation;
    }): Promise<IRepositoryTransactionHistory[]>;
    findWithActorAndRepositoryWherIdsIn(idsInClause: RepositoryTransactionHistory_Id[] | RawFieldQuery<IQNumberField> | {
        (...args: any[]): RawFieldQuery<IQNumberField>;
    }): Promise<IRepositoryTransactionHistory[]>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<Repository_Id, IChangedRecordIdsForRepository>): Promise<Map<Repository_Id, IRepositoryTransactionHistory[]>>;
    findExistingRecordIdMap(recordIdMap: Map<Repository_Id, Map<EntityId, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>>): Promise<Map<Repository_Id, Map<EntityId, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>>>;
}
//# sourceMappingURL=RepositoryTransactionHistoryDao.d.ts.map