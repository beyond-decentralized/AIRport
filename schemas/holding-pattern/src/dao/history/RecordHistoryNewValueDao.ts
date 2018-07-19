import {Service}                       from "typedi";
import {
	IRecordHistoryNewValue,
	Q,
	QRecordHistoryNewValue,
	RecordHistoryId
}                                      from "../..";
import {
	BaseRecordHistoryNewValueDao,
	IBaseRecordHistoryNewValueDao
}                                      from "../../generated/generated";
import {RecordHistoryNewValueDaoToken} from "../../InjectionTokens";

export interface IRecordHistoryNewValueDao
	extends IBaseRecordHistoryNewValueDao {

	findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryNewValue[]>;

}

@Service(RecordHistoryNewValueDaoToken)
export class RecordHistoryNewValueDao
	extends BaseRecordHistoryNewValueDao
	implements IRecordHistoryNewValueDao {

	async findByRecordHistoryIdIn(
		recordHistoryIds: RecordHistoryId[]
	): Promise<IRecordHistoryNewValue[]> {
		let rhnv: QRecordHistoryNewValue;

		return await this.db.find.tree({
			select: {},
			from: [
				rhnv = Q.RecordHistoryNewValue
			],
			where: rhnv.recordHistory.id.in(recordHistoryIds)
		});

	}

}