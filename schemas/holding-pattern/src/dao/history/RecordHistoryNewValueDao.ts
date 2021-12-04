import {DI}                     from '@airport/di'
import {RecordHistoryId}        from '../../ddl/ddl'
import {RECORD_HISTORY_NEW_VALUE_DAO} from '../../tokens'
import {
	BaseRecordHistoryNewValueDao,
	IBaseRecordHistoryNewValueDao,
	IRecordHistoryNewValue,
	Q,
	QRecordHistoryNewValue
}                               from '../../generated/generated'

export interface IRecordHistoryNewValueDao
	extends IBaseRecordHistoryNewValueDao {

	findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryNewValue[]>;

}

export class RecordHistoryNewValueDao
	extends BaseRecordHistoryNewValueDao
	implements IRecordHistoryNewValueDao {

	async findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryNewValue[]> {
		let rhnv: QRecordHistoryNewValue

		return await this.db.find.tree({
			select: {},
			from: [
				rhnv = Q.RecordHistoryNewValue
			],
			where: rhnv.recordHistory.id.in(recordHistoryIds)
		})

	}

}

DI.set(RECORD_HISTORY_NEW_VALUE_DAO, RecordHistoryNewValueDao)
