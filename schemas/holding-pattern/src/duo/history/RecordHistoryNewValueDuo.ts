import { Injected } from '@airport/direction-indicator';
import {DbColumn, IRecordHistory, IRecordHistoryNewValue}               from '@airport/ground-control'
import {RecordHistoryNewValue}  from '../../ddl/history/RecordHistoryNewValue'

export interface IRecordHistoryNewValueDuo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue;

}

@Injected()
export class RecordHistoryNewValueDuo
	implements IRecordHistoryNewValueDuo {

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
