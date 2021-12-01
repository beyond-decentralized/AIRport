import { BaseSynchronizationConflictDao, IBaseSynchronizationConflictDao, ISynchronizationConflict } from '../../generated/generated';
export interface ISynchronizationConflictDao extends IBaseSynchronizationConflictDao {
    insert(terminals: ISynchronizationConflict[]): Promise<void>;
}
export declare class SynchronizationConflictDao extends BaseSynchronizationConflictDao implements ISynchronizationConflictDao {
    insert(terminals: ISynchronizationConflict[]): Promise<void>;
}
//# sourceMappingURL=SynchronizationConflictDao.d.ts.map