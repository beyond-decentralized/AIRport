import {DEPENDENCY_INJECTION}                     from '@airport/direction-indicator'
import {DbColumn}               from '@airport/ground-control'
import {RecordHistoryOldValue}  from '../../ddl/ddl'
import {RECORD_HISTORY_OLD_VALUE_DUO} from '../../tokens'
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

DEPENDENCY_INJECTION.set(RECORD_HISTORY_OLD_VALUE_DUO, RecordHistoryOldValueDuo)
