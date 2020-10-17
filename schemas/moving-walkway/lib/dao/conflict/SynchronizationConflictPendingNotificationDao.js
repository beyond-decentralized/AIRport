import { DI } from '@airport/di';
import { SYNC_CONFLICT_PENDING_NOTIFICATION_DAO } from '../../tokens';
import { BaseSynchronizationConflictPendingNotificationDao } from '../../generated/generated';
export class SynchronizationConflictPendingNotificationDao extends BaseSynchronizationConflictPendingNotificationDao {
}
DI.set(SYNC_CONFLICT_PENDING_NOTIFICATION_DAO, SynchronizationConflictPendingNotificationDao);
//# sourceMappingURL=SynchronizationConflictPendingNotificationDao.js.map