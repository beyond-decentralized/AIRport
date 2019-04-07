import {DI}                     from '@airport/di'
import {DbColumn}               from '@airport/ground-control'
import {RecordHistoryOldValue}  from '../../ddl/ddl'
import {REC_HIST_OLD_VALUE_DUO} from '../../diTokens'
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
		const recordHistoryOldValue = new RecordHistoryOldValue()

		recordHistoryOldValue.columnIndex   = dbColumn.index
		recordHistoryOldValue.recordHistory = recordHistory
		recordHistoryOldValue.oldValue      = oldValue

		return recordHistoryOldValue

	}

}

DI.set(REC_HIST_OLD_VALUE_DUO, RecordHistoryOldValueDuo)
