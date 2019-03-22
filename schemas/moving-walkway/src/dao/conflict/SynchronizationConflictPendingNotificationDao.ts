import {DI}                                     from '@airport/di'
import {SYNC_CONFLICT_PENDING_NOTIFICATION_DAO} from '../../diTokens'
import {
	BaseSynchronizationConflictPendingNotificationDao,
	IBaseSynchronizationConflictPendingNotificationDao
}                                               from '../../generated/generated'

export interface ISynchronizationConflictPendingNotificationDao
	extends IBaseSynchronizationConflictPendingNotificationDao {
}

export class SynchronizationConflictPendingNotificationDao
	extends BaseSynchronizationConflictPendingNotificationDao
	implements ISynchronizationConflictPendingNotificationDao {

}

DI.set(SYNC_CONFLICT_PENDING_NOTIFICATION_DAO, SynchronizationConflictPendingNotificationDao)
