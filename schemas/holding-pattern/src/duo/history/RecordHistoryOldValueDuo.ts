import { Injected } from '@airport/direction-indicator';
import {DbColumn}               from '@airport/ground-control'
import {RecordHistoryOldValue}  from '../../ddl/ddl'
import {
	BaseRecordHistoryOldValueDuo,
	IRecordHistory,
	IRecordHistoryOldValue
}                               from '../../generated/generated'

export interface IRecordHistoryOldValueDuo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue;

}

@Injected()
export class RecordHistoryOldValueDuo
	extends BaseRecordHistoryOldValueDuo
	implements IRecordHistoryOldValueDuo {

	constructor() {
		super()
	}

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue {
		const recordHistoryOldValue: IRecordHistoryOldValue= new RecordHistoryOldValue() as IRecordHistoryOldValue

		recordHistoryOldValue.columnIndex   = dbColumn.index
		recordHistoryOldValue.recordHistory = recordHistory
		recordHistoryOldValue.oldValue      = oldValue

		return recordHistoryOldValue

	}

}
