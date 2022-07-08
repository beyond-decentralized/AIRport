import { IContext } from '@airport/direction-indicator';
import { BaseSynchronizationConflictDao, IBaseSynchronizationConflictDao, ISynchronizationConflict } from '../../generated/generated';
export interface ISynchronizationConflictDao extends IBaseSynchronizationConflictDao {
    insert(terminals: ISynchronizationConflict[], context: IContext): Promise<void>;
}
export declare class SynchronizationConflictDao extends BaseSynchronizationConflictDao implements ISynchronizationConflictDao {
    insert(synchronizationConflicts: ISynchronizationConflict[], context: IContext): Promise<void>;
}
//# sourceMappingURL=SynchronizationConflictDao.d.ts.map