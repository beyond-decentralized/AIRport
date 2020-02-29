import { DI } from '@airport/di';
import { SYNC_CONFLICT_DAO } from '../../tokens';
import { BaseSynchronizationConflictDao, } from '../../generated/generated';
export class SynchronizationConflictDao extends BaseSynchronizationConflictDao {
}
DI.set(SYNC_CONFLICT_DAO, SynchronizationConflictDao);
//# sourceMappingURL=SynchronizationConflictDao.js.map