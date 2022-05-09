import { IContext, Injected } from '@airport/direction-indicator';
import {
	BaseSynchronizationConflictValuesDao,
	IBaseSynchronizationConflictValuesDao,
	ISynchronizationConflictValues,
	Q,
	QSynchronizationConflictValues
} from '../../generated/generated'

export interface ISynchronizationConflictValuesDao
	extends IBaseSynchronizationConflictValuesDao {

	insert(
		terminals: ISynchronizationConflictValues[],
		context: IContext
	): Promise<void>

}

@Injected()
export class SynchronizationConflictValuesDao
	extends BaseSynchronizationConflictValuesDao
	implements ISynchronizationConflictValuesDao {

	async insert(
		synchronizationConflictValues: ISynchronizationConflictValues[],
		context: IContext
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
		}, context)
	}

}
