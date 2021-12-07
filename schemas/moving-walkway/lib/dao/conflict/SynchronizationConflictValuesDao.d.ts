import { BaseSynchronizationConflictValuesDao, IBaseSynchronizationConflictValuesDao, ISynchronizationConflictValues } from '../../generated/generated';
export interface ISynchronizationConflictValuesDao extends IBaseSynchronizationConflictValuesDao {
    insert(terminals: ISynchronizationConflictValues[]): Promise<void>;
}
export declare class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao implements ISynchronizationConflictValuesDao {
    insert(synchronizationConflictValues: ISynchronizationConflictValues[]): Promise<void>;
}
//# sourceMappingURL=SynchronizationConflictValuesDao.d.ts.map