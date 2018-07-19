import {DbColumn}                      from "@airport/ground-control";
import {Service}                       from "typedi";
import {RecordHistoryNewValue}         from "../../ddl/ddl";
import {
	BaseRecordHistoryNewValueDmo,
	IRecordHistory,
	IRecordHistoryNewValue
}                                      from "../../generated/generated";
import {RecordHistoryNewValueDmoToken} from "../../InjectionTokens";

export interface IRecordHistoryNewValueDmo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue;

}

@Service(RecordHistoryNewValueDmoToken)
export class RecordHistoryNewValueDmo
	extends BaseRecordHistoryNewValueDmo
	implements IRecordHistoryNewValueDmo {

	constructor() {
		super();
	}

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue {
		const recordHistoryNewValue = new RecordHistoryNewValue();

		recordHistoryNewValue.columnIndex = dbColumn.index;
		recordHistoryNewValue.recordHistory = recordHistory;
		recordHistoryNewValue.newValue = newValue;

		return recordHistoryNewValue;

	}

}