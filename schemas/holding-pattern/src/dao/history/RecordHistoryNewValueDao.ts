import { Injected } from '@airport/direction-indicator';
import {RecordHistoryId}        from '../../ddl/ddl'
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

@Injected()
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
