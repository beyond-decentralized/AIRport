import { IContext, Injected } from '@airport/direction-indicator'
import { ISynchronizationConflict } from '@airport/ground-control'
import { BaseSynchronizationConflictDao, IBaseSynchronizationConflictDao } from '../../generated/baseDaos'
import { QSynchronizationConflict } from '../../generated/qInterfaces'

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
			INSERT_INTO: sc = this.qSchema.SynchronizationConflict,
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
