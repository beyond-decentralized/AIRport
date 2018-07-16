import {DbColumn}                      from "@airport/air-control";
import {Service}                       from "typedi";
import {RecordHistoryOldValue}         from "../../ddl/ddl";
import {
	BaseRecordHistoryOldValueDmo,
	IRecordHistory,
	IRecordHistoryOldValue
}                                      from "../../generated/generated";
import {RecordHistoryOldValueDmoToken} from "../../InjectionTokens";

export interface IRecordHistoryOldValueDmo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue;

}

@Service(RecordHistoryOldValueDmoToken)
export class RecordHistoryOldValueDmo
	extends BaseRecordHistoryOldValueDmo
	implements IRecordHistoryOldValueDmo {

	constructor() {
		super();
	}

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue {
		const recordHistoryOldValue = new RecordHistoryOldValue();

		recordHistoryOldValue.columnIndex = dbColumn.index;
		recordHistoryOldValue.recordHistory = recordHistory;
		recordHistoryOldValue.oldValue = oldValue;

		return recordHistoryOldValue;

	}

}