import {DI}                     from '@airport/di'
import {DbColumn}               from '@airport/ground-control'
import {RecordHistoryOldValue}  from '../../ddl/ddl'
import {REC_HIST_OLD_VALUE_DMO} from '../../diTokens'
import {
	BaseRecordHistoryOldValueDmo,
	IRecordHistory,
	IRecordHistoryOldValue
}                               from '../../generated/generated'

export interface IRecordHistoryOldValueDmo {

	getNewRecord(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue;

}

export class RecordHistoryOldValueDmo
	extends BaseRecordHistoryOldValueDmo
	implements IRecordHistoryOldValueDmo {

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

DI.set(REC_HIST_OLD_VALUE_DMO, RecordHistoryOldValueDmo)
