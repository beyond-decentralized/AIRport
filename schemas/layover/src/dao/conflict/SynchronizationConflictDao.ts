import { IContext, Injected } from '@airport/direction-indicator';
import {
	BaseSynchronizationConflictDao,
	IBaseSynchronizationConflictDao,
	ISynchronizationConflict,
	QSynchronizationConflict
} from '../../generated/generated'
import Q from '../../generated/qApplication'

export interface ISynchronizationConflictDao
	extends IBaseSynchronizationConflictDao {

	insert(
		terminals: ISynchronizationConflict[],
		context: IContext
	): Promise<void>

}

@Injected()
export class SynchronizationConflictDao
	extends BaseSynchronizationConflictDao
	implements ISynchronizationConflictDao {

	async insert(
		synchronizationConflicts: ISynchronizationConflict[],
		context: IContext
	): Promise<void> {
		let sc: QSynchronizationConflict;
		const VALUES = []
		for (const synchronizationConflict of synchronizationConflicts) {
			VALUES.push([
				synchronizationConflict.type,
				synchronizationConflict.acknowledged,
				synchronizationConflict.repository._localId,
				synchronizationConflict.overwrittenRecordHistory._localId,
				synchronizationConflict.overwritingRecordHistory._localId
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			INSERT_INTO: sc = Q.SynchronizationConflict,
			columns: [
				sc.type,
				sc.acknowledged,
				sc.repository._localId,
				sc.overwrittenRecordHistory._localId,
				sc.overwritingRecordHistory._localId
			],
			VALUES
		}, context)
		for (let i = 0; i < synchronizationConflicts.length; i++) {
			let synchronizationConflict = synchronizationConflicts[i]
			synchronizationConflict._localId = ids[i][0]
		}
	}
}
