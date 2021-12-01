import { DI } from '@airport/di'
import {
	BaseSynchronizationConflictValuesDao,
	IBaseSynchronizationConflictValuesDao,
	ISynchronizationConflictValues,
	Q,
	QSynchronizationConflictValues
} from '../../generated/generated'
import { SYNCHRONIZATION_CONFLICT_VALUES_DAO } from '../../tokens'

export interface ISynchronizationConflictValuesDao
	extends IBaseSynchronizationConflictValuesDao {

	insert(
		terminals: ISynchronizationConflictValues[]
	): Promise<void>

}

export class SynchronizationConflictValuesDao
	extends BaseSynchronizationConflictValuesDao
	implements ISynchronizationConflictValuesDao {

	async insert(
		terminals: ISynchronizationConflictValues[]
	): Promise<void> {
		let scv: QSynchronizationConflictValues;
		const values = []
		for (const user of terminals) {
			values.push([
				user.synchronizationConflict.id,
				user.columnIndex
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: scv = Q.SynchronizationConflictValues,
			columns: [
				scv.synchronizationConflict.id,
				scv.columnIndex
			],
			values
		})
	}

}

DI.set(SYNCHRONIZATION_CONFLICT_VALUES_DAO, SynchronizationConflictValuesDao)
