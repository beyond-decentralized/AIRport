import {DI}                     from '@airport/di'
import {REC_HIST_OLD_VALUE_DAO} from '../../tokens'
import {
	BaseRecordHistoryOldValueDao,
	IBaseRecordHistoryOldValueDao
}                               from '../../generated/generated'
import {
	IRecordHistoryOldValue,
	Q,
	QRecordHistoryOldValue,
	RecordHistoryId
}                               from '../../index'

export interface IRecordHistoryOldValueDao
	extends IBaseRecordHistoryOldValueDao {

	findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryOldValue[]>

}

export class RecordHistoryOldValueDao
	extends BaseRecordHistoryOldValueDao
	implements IRecordHistoryOldValueDao {

	async findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryOldValue[]> {
		let rhov: QRecordHistoryOldValue

		return await this.db.find.tree({
			select: {},
			from: [
				rhov = Q.RecordHistoryOldValue
			],
			where: rhov.recordHistory.id.in(recordHistoryIds)
		})

	}

}

DI.set(REC_HIST_OLD_VALUE_DAO, RecordHistoryOldValueDao)
