import { IContext } from '@airport/direction-indicator';
import { BaseSynchronizationConflictValuesDao, IBaseSynchronizationConflictValuesDao, ISynchronizationConflictValues } from '../../generated/generated';
export interface ISynchronizationConflictValuesDao extends IBaseSynchronizationConflictValuesDao {
    insert(terminals: ISynchronizationConflictValues[], context: IContext): Promise<void>;
}
export declare class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao implements ISynchronizationConflictValuesDao {
    insert(synchronizationConflictValues: ISynchronizationConflictValues[], context: IContext): Promise<void>;
}
//# sourceMappingURL=SynchronizationConflictValuesDao.d.ts.map