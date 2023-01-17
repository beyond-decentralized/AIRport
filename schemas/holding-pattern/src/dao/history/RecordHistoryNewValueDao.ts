import { Injected } from '@airport/direction-indicator';
import { RecordHistory_LocalId } from '@airport/ground-control';
import {
	BaseRecordHistoryNewValueDao,
	IBaseRecordHistoryNewValueDao,
	IRecordHistoryNewValue,
	QRecordHistoryNewValue
}                               from '../../generated/generated'
import Q from '../../generated/qApplication'

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
