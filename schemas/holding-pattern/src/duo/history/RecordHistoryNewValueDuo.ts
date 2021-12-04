import {DI}                     from '@airport/di'
import {DbColumn}               from '@airport/ground-control'
import {RecordHistoryNewValue}  from '../../ddl/ddl'
import {RECORD_HISTORY_NEW_VALUE_DUO} from '../../tokens'
import {
	BaseRecordHistoryNewValueDuo,
	IRecordHistory,
	IRecordHistoryNewValue
}                               from '../../generated/generated'

export interface IRecordHistoryNewValueDuo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue;

}

export class RecordHistoryNewValueDuo
	extends BaseRecordHistoryNewValueDuo
	implements IRecordHistoryNewValueDuo {

	constructor() {
		super()
	}

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue {
		const recordHistoryNewValue: IRecordHistoryNewValue = new RecordHistoryNewValue() as  IRecordHistoryNewValue

		recordHistoryNewValue.columnIndex   = dbColumn.index
		recordHistoryNewValue.recordHistory = recordHistory
		recordHistoryNewValue.newValue      = newValue

		return recordHistoryNewValue
	}

}

DI.set(RECORD_HISTORY_NEW_VALUE_DUO, RecordHistoryNewValueDuo)
