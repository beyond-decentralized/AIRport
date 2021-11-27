import {DI}                from '@airport/di'
import {SYNC_CONFLICT_DAO} from '../../tokens'
import {
	BaseSynchronizationConflictDao,
	IBaseSynchronizationConflictDao,
}                          from '../../generated/generated'

export interface ISynchronizationConflictDao
	extends IBaseSynchronizationConflictDao {
}

export class SynchronizationConflictDao
	extends BaseSynchronizationConflictDao
	implements ISynchronizationConflictDao {

}

DI.set(SYNC_CONFLICT_DAO, SynchronizationConflictDao)
