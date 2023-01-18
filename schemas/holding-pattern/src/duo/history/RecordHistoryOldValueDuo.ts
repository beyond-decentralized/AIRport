import { Injected } from '@airport/direction-indicator';
import { DbColumn, IRecordHistory, IRecordHistoryOldValue } from '@airport/ground-control'
import { RecordHistoryOldValue } from '../../ddl/history/RecordHistoryOldValue'

export interface IRecordHistoryOldValueDuo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue;

}

@Injected()
export class RecordHistoryOldValueDuo
	implements IRecordHistoryOldValueDuo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue {
		const recordHistoryOldValue: IRecordHistoryOldValue = new RecordHistoryOldValue() as IRecordHistoryOldValue

		recordHistoryOldValue.columnIndex = dbColumn.index
		recordHistoryOldValue.recordHistory = recordHistory
		recordHistoryOldValue.oldValue = oldValue

		return recordHistoryOldValue

	}

}
