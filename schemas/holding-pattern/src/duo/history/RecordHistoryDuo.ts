import {DI}                        from '@airport/di'
import {DbColumn}                  from '@airport/ground-control'
import {
	RecordHistory,
	RepositoryEntityActorRecordId
}                                  from '../../ddl/ddl'
import {
	REC_HISTORY_DUO,
	REC_HIST_NEW_VALUE_DUO,
	REC_HIST_OLD_VALUE_DUO
}                                  from '../../diTokens'
import {
	BaseRecordHistoryDuo,
	IBaseRecordHistoryDuo,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
}                                  from '../../generated/generated'
import {IRecordHistoryNewValueDuo} from './RecordHistoryNewValueDuo'
import {IRecordHistoryOldValueDuo} from './RecordHistoryOldValueDuo'


export interface IRecordHistoryDuo
	extends IBaseRecordHistoryDuo {

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

export class RecordHistoryDuo
	extends BaseRecordHistoryDuo
	implements IRecordHistoryDuo {

	private recHistoryNewValueDuo: IRecordHistoryNewValueDuo
	private recHistoryOldValueDuo: IRecordHistoryOldValueDuo

	constructor() {
		super()

		DI.get((
			recordHistoryNewValueDuo,
			recordHistoryOldValueDuo
		) => {
			this.recHistoryNewValueDuo = recordHistoryNewValueDuo
			this.recHistoryOldValueDuo = recordHistoryOldValueDuo
		}, REC_HIST_NEW_VALUE_DUO, REC_HIST_OLD_VALUE_DUO)
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
		const recordHistoryNewValue = this.recHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue)

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
		const recordHistoryOldValue = this.recHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue)

		recordHistory.oldValues.push(recordHistoryOldValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue)

		return recordHistoryOldValue
	}

}

DI.set(REC_HISTORY_DUO, RecordHistoryDuo)