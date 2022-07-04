import { Injected } from '@airport/direction-indicator'
import { RecordHistory_LocalId } from '../../ddl/ddl'
import {
	BaseRecordHistoryOldValueDao,
	IBaseRecordHistoryOldValueDao
} from '../../generated/generated'
import {
	IRecordHistoryOldValue,
	Q,
	QRecordHistoryOldValue,
} from '../../generated/generated'

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
			select: {},
			from: [
				rhov = Q.RecordHistoryOldValue
			],
			where: rhov.recordHistory._localId.in(RecordHistory_LocalIds)
		})

	}

}
