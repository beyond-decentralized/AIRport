import { IContext, Injected } from '@airport/direction-indicator';
import { IRecordHistoryNewValue, RecordHistory_LocalId } from '@airport/ground-control';
import { BaseRecordHistoryNewValueDao, IBaseRecordHistoryNewValueDao } from '../../generated/baseDaos';

import Q from '../../generated/qApplication'
import { QRecordHistoryNewValue } from '../../generated/qInterfaces';

export interface IRecordHistoryNewValueDao
	extends IBaseRecordHistoryNewValueDao {

	findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[],
		context: IContext
	): Promise<IRecordHistoryNewValue[]>;

}

@Injected()
export class RecordHistoryNewValueDao
	extends BaseRecordHistoryNewValueDao
	implements IRecordHistoryNewValueDao {

	async findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[],
		context: IContext
	): Promise<IRecordHistoryNewValue[]> {
		let rhnv: QRecordHistoryNewValue

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				rhnv = Q.RecordHistoryNewValue
			],
			WHERE: rhnv.recordHistory._localId.IN(RecordHistory_LocalIds)
		}, context)

	}

}
