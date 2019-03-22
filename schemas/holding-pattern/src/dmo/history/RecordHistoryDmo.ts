import {DI}                        from '@airport/di'
import {DbColumn}                  from '@airport/ground-control'
import {
	RecordHistory,
	RepositoryEntityActorRecordId
}                                  from '../../ddl/ddl'
import {
	REC_HISTORY_DMO,
	REC_HIST_NEW_VALUE_DMO,
	REC_HIST_OLD_VALUE_DMO
}                                  from '../../diTokens'
import {
	BaseRecordHistoryDmo,
	IBaseRecordHistoryDmo,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
}                                  from '../../generated/generated'
import {IRecordHistoryNewValueDmo} from './RecordHistoryNewValueDmo'
import {IRecordHistoryOldValueDmo} from './RecordHistoryOldValueDmo'


export interface IRecordHistoryDmo
	extends IBaseRecordHistoryDmo {

	getNewRecord(
		actorRecordId: RepositoryEntityActorRecordId
	): IRecordHistory;

	addNewValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue;

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue;

}

export class RecordHistoryDmo
	extends BaseRecordHistoryDmo
	implements IRecordHistoryDmo {

	private recHistoryNewValueDmo: IRecordHistoryNewValueDmo
	private recHistoryOldValueDmo: IRecordHistoryOldValueDmo

	constructor() {
		super()

		DI.get((
			recordHistoryNewValueDmo,
			recordHistoryOldValueDmo
		) => {
			this.recHistoryNewValueDmo = recordHistoryNewValueDmo
			this.recHistoryOldValueDmo = recordHistoryOldValueDmo
		}, REC_HIST_NEW_VALUE_DMO, REC_HIST_OLD_VALUE_DMO)
	}

	getNewRecord(
		actorRecordId: RepositoryEntityActorRecordId
	): IRecordHistory {
		const recordHistory = new RecordHistory()

		recordHistory.actorRecordId = actorRecordId

		return recordHistory
	}

	addNewValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue {
		const recordHistoryNewValue = this.recHistoryNewValueDmo.getNewRecord(recordHistory, dbColumn, newValue)

		recordHistory.newValues.push(recordHistoryNewValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue)

		return recordHistoryNewValue
	}

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue {
		const recordHistoryOldValue = this.recHistoryOldValueDmo.getNewRecord(recordHistory, dbColumn, oldValue)

		recordHistory.oldValues.push(recordHistoryOldValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue)

		return recordHistoryOldValue
	}

}

DI.set(REC_HISTORY_DMO, RecordHistoryDmo)
