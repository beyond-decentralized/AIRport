import { IContext, Injected } from '@airport/direction-indicator';
import { ISynchronizationConflictValues } from '@airport/ground-control';
import {
	BaseSynchronizationConflictValuesDao,
	IBaseSynchronizationConflictValuesDao,
	QSynchronizationConflictValues
} from '../../generated/generated'
import Q from '../../generated/qApplication'

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
		const VALUES = []
		for (const synchronizationConflictValue of synchronizationConflictValues) {
			VALUES.push([
				synchronizationConflictValue.synchronizationConflict._localId,
				synchronizationConflictValue.columnIndex
			])
		}
		await this.db.insertValues({
			INSERT_INTO: scv = Q.SynchronizationConflictValues,
			columns: [
				scv.synchronizationConflict._localId,
				scv.columnIndex
			],
			VALUES
		}, context)
	}

}
