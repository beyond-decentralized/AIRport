import { Injected } from '@airport/direction-indicator';
import {RecordHistory_LocalId}        from '../../ddl/ddl'
import {
	BaseRecordHistoryNewValueDao,
	IBaseRecordHistoryNewValueDao,
	IRecordHistoryNewValue,
	Q,
	QRecordHistoryNewValue
}                               from '../../generated/generated'

export interface IRecordHistoryNewValueDao
	extends IBaseRecordHistoryNewValueDao {

	findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[]
	): Promise<IRecordHistoryNewValue[]>;

}

@Injected()
export class RecordHistoryNewValueDao
	extends BaseRecordHistoryNewValueDao
	implements IRecordHistoryNewValueDao {

	async findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[]
	): Promise<IRecordHistoryNewValue[]> {
		let rhnv: QRecordHistoryNewValue

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				rhnv = Q.RecordHistoryNewValue
			],
			WHERE: rhnv.recordHistory._localId.IN(RecordHistory_LocalIds)
		})

	}

}
