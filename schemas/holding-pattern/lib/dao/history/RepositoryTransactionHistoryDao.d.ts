import { EntityId } from '@airport/ground-control';
import { Actor_Id, RecordHistoryActorRecordId, Repository_Id } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDao, IRepositoryTransactionHistory } from '../../generated/generated';
export interface IRepositoryTransactionHistoryDao {
    findWhereGUIDsIn(GUIDs: string[]): Promise<IRepositoryTransactionHistory[]>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<Repository_Id, IChangedRecordIdsForRepository>): Promise<Map<Repository_Id, IRepositoryTransactionHistory[]>>;
    updateSyncTimestamp(repositoryTransactionHistory: IRepositoryTransactionHistory): Promise<void>;
}
export interface IChangedRecordIdsForRepository {
    ids: Map<EntityId, Map<Actor_Id, Set<RecordHistoryActorRecordId>>>;
    firstChangeTime: number;
}
export declare class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao implements IRepositoryTransactionHistoryDao {
    findWhereGUIDsIn(GUIDs: string[]): Promise<IRepositoryTransactionHistory[]>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<Repository_Id, IChangedRecordIdsForRepository>): Promise<Map<Repository_Id, IRepositoryTransactionHistory[]>>;
    updateSyncTimestamp(repositoryTransactionHistory: IRepositoryTransactionHistory): Promise<void>;
}
//# sourceMappingURL=RepositoryTransactionHistoryDao.d.ts.map