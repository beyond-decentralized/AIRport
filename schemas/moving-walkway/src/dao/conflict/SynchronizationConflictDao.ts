import { DI } from '@airport/di'
import {
	BaseSynchronizationConflictDao,
	IBaseSynchronizationConflictDao,
	ISynchronizationConflict,
	Q,
	QSynchronizationConflict
} from '../../generated/generated'
import { SYNCHRONIZATION_CONFLICT_DAO } from '../../tokens'

export interface ISynchronizationConflictDao
	extends IBaseSynchronizationConflictDao {

	insert(
		terminals: ISynchronizationConflict[]
	): Promise<void>

}

export class SynchronizationConflictDao
	extends BaseSynchronizationConflictDao
	implements ISynchronizationConflictDao {

	async insert(
		terminals: ISynchronizationConflict[]
	): Promise<void> {
		let sc: QSynchronizationConflict;
		const values = []
		for (const user of terminals) {
			values.push([
				user.type,
				user.acknowledged,
				user.repository.id,
				user.overwrittenRecordHistory.id,
				user.overwritingRecordHistory.id
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sc = Q.SynchronizationConflict,
			columns: [
				sc.type,
				sc.acknowledged,
				sc.repository.id,
				sc.overwrittenRecordHistory.id,
				sc.overwritingRecordHistory.id
			],
			values
		})
	}
}

DI.set(SYNCHRONIZATION_CONFLICT_DAO, SynchronizationConflictDao)
