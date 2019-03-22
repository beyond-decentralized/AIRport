import {DI}                       from '@airport/di'
import {SYNC_CONFLICT_VALUES_DAO} from '../../diTokens'
import {
	BaseSynchronizationConflictValuesDao,
	IBaseSynchronizationConflictValuesDao
}                                 from '../../generated/generated'

export interface ISynchronizationConflictValuesDao
	extends IBaseSynchronizationConflictValuesDao {
}

export class SynchronizationConflictValuesDao
	extends BaseSynchronizationConflictValuesDao
	implements ISynchronizationConflictValuesDao {

}

DI.set(SYNC_CONFLICT_VALUES_DAO, SynchronizationConflictValuesDao)
