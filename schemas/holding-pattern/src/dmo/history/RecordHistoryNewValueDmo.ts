import {DI}                           from '@airport/di'
import {DbColumn}                     from '@airport/ground-control'
import {RecordHistoryNewValue}        from '../../ddl/ddl'
import {RECORD_HISTORY_NEW_VALUE_DMO} from '../../diTokens'
import {
	BaseRecordHistoryNewValueDmo,
	IRecordHistory,
	IRecordHistoryNewValue
}                                     from '../../generated/generated'

export interface IRecordHistoryNewValueDmo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue;

}

export class RecordHistoryNewValueDmo
	extends BaseRecordHistoryNewValueDmo
	implements IRecordHistoryNewValueDmo {

	constructor() {
		super()
	}

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue {
		const recordHistoryNewValue = new RecordHistoryNewValue()

		recordHistoryNewValue.columnIndex   = dbColumn.index
		recordHistoryNewValue.recordHistory = recordHistory
		recordHistoryNewValue.newValue      = newValue

		return recordHistoryNewValue

	}

}

DI.set(RECORD_HISTORY_NEW_VALUE_DMO, RecordHistoryNewValueDmo)
