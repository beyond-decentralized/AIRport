import { Injected } from '@airport/direction-indicator'
import { IRecordHistoryOldValue, RecordHistory_LocalId } from '@airport/ground-control'
import {
	BaseRecordHistoryOldValueDao,
	IBaseRecordHistoryOldValueDao
} from '../../generated/generated'
import {
	QRecordHistoryOldValue,
} from '../../generated/generated'
import Q from '../../generated/qApplication'

export interface IRecordHistoryOldValueDao
	extends IBaseRecordHistoryOldValueDao {

	findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[]
	): Promise<IRecordHistoryOldValue[]>

}

@Injected()
export class RecordHistoryOldValueDao
	extends BaseRecordHistoryOldValueDao
	implements IRecordHistoryOldValueDao {

	async findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[]
	): Promise<IRecordHistoryOldValue[]> {
		let rhov: QRecordHistoryOldValue

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				rhov = Q.RecordHistoryOldValue
			],
			WHERE: rhov.recordHistory._localId.IN(RecordHistory_LocalIds)
		})

	}

}
