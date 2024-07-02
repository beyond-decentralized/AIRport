import { IContext, Injected } from '@airport/direction-indicator'
import { IRecordHistoryOldValue, RecordHistory_LocalId } from '@airport/ground-control'
import { BaseRecordHistoryOldValueDao, IBaseRecordHistoryOldValueDao } from '../../generated/baseDaos'
import { QRecordHistoryOldValue } from '../../generated/qInterfaces'

export interface IRecordHistoryOldValueDao
	extends IBaseRecordHistoryOldValueDao {

	findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[],
		context: IContext
	): Promise<IRecordHistoryOldValue[]>

}

@Injected()
export class RecordHistoryOldValueDao
	extends BaseRecordHistoryOldValueDao
	implements IRecordHistoryOldValueDao {

	async findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[],
		context: IContext
	): Promise<IRecordHistoryOldValue[]> {
		let rhov: QRecordHistoryOldValue

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				rhov = this.qSchema.RecordHistoryOldValue
			],
			WHERE: rhov.recordHistory._localId.IN(RecordHistory_LocalIds)
		}, context)

	}

}
