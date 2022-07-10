import { ApplicationEntity_LocalId } from '@airport/ground-control';
import { Actor_LocalId, RecordHistory_ActorRecordId } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDao, IRepositoryTransactionHistory } from '../../generated/generated';
import { Repository_LocalId } from '../../types';
export interface IRepositoryTransactionHistoryDao {
    findWhereGUIDsIn(GUIDs: string[]): Promise<IRepositoryTransactionHistory[]>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>>;
    updateSyncTimestamp(repositoryTransactionHistory: IRepositoryTransactionHistory): Promise<void>;
}
export interface IChangedRecordIdsForRepository {
    actorRecordIdsByLocalIds: Map<ApplicationEntity_LocalId, Map<Actor_LocalId, Set<RecordHistory_ActorRecordId>>>;
    firstChangeTime: number;
}
export declare class RepositoryTransactionHistoryDao extends BaseRepositoryTransactionHistoryDao implements IRepositoryTransactionHistoryDao {
    findWhereGUIDsIn(GUIDs: string[]): Promise<IRepositoryTransactionHistory[]>;
    findAllLocalChangesForRecordIds(changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>>;
    updateSyncTimestamp(repositoryTransactionHistory: IRepositoryTransactionHistory): Promise<void>;
}
//# sourceMappingURL=RepositoryTransactionHistoryDao.d.ts.map