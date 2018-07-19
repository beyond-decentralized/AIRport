import {Service}                       from "typedi";
import {
	BaseRecordHistoryOldValueDao,
	IBaseRecordHistoryOldValueDao
}                                      from "../../generated/generated";
import {
	IRecordHistoryOldValue,
	Q,
	QRecordHistoryOldValue,
	RecordHistoryId
}                                      from "../../index";
import {RecordHistoryOldValueDaoToken} from "../../InjectionTokens";

export interface IRecordHistoryOldValueDao
	extends IBaseRecordHistoryOldValueDao {

	findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryOldValue[]>

}

@Service(RecordHistoryOldValueDaoToken)
export class RecordHistoryOldValueDao
	extends BaseRecordHistoryOldValueDao
	implements IRecordHistoryOldValueDao {

	async findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryOldValue[]> {
		let rhov: QRecordHistoryOldValue;

		return await this.db.find.tree({
			select: {},
			from: [
				rhov = Q.RecordHistoryOldValue
			],
			where: rhov.recordHistory.id.in(recordHistoryIds)
		});

	}


}