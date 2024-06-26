import { Injected } from '@airport/direction-indicator';
import { IRecordHistory, IRecordHistoryOldValue } from '@airport/ground-control'
import { RecordHistoryOldValue } from '../../ddl/history/RecordHistoryOldValue'

export interface IRecordHistoryOldValueDuo {

	getRecordHistoryOldValue(
		recordHistory: IRecordHistory,
		oldValue: any
	): IRecordHistoryOldValue;

}

@Injected()
export class RecordHistoryOldValueDuo
	implements IRecordHistoryOldValueDuo {

	getRecordHistoryOldValue(
		recordHistory: IRecordHistory,
		oldValue: any
	): IRecordHistoryOldValue {
		const recordHistoryOldValue: IRecordHistoryOldValue = new RecordHistoryOldValue() as IRecordHistoryOldValue

		recordHistoryOldValue.recordHistory = recordHistory
		recordHistoryOldValue.oldValue = oldValue

		return recordHistoryOldValue
	}

}
