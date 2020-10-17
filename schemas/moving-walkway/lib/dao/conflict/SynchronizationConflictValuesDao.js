import { DI } from '@airport/di';
import { SYNC_CONFLICT_VALUES_DAO } from '../../tokens';
import { BaseSynchronizationConflictValuesDao } from '../../generated/generated';
export class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao {
}
DI.set(SYNC_CONFLICT_VALUES_DAO, SynchronizationConflictValuesDao);
//# sourceMappingURL=SynchronizationConflictValuesDao.js.map