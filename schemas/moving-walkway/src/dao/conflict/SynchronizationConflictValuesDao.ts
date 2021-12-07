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
		synchronizationConflictValues: ISynchronizationConflictValues[]
	): Promise<void> {
		let scv: QSynchronizationConflictValues;
		const values = []
		for (const synchronizationConflictValue of synchronizationConflictValues) {
			values.push([
				synchronizationConflictValue.synchronizationConflict.id,
				synchronizationConflictValue.columnIndex
			])
		}
		await this.db.insertValues({
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
