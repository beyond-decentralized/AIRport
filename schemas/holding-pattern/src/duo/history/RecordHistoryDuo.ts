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
		newValue: any,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo
	): IRecordHistoryNewValue;

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo
	): IRecordHistoryOldValue;

}

export class RecordHistoryDuo
	extends BaseRecordHistoryDuo
	implements IRecordHistoryDuo {

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
		newValue: any,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo
	): IRecordHistoryNewValue {
		const recordHistoryNewValue = recHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue)

		recordHistory.newValues.push(recordHistoryNewValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue)

		return recordHistoryNewValue
	}

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo
	): IRecordHistoryOldValue {
		const recordHistoryOldValue = recHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue)

		recordHistory.oldValues.push(recordHistoryOldValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue)

		return recordHistoryOldValue
	}

}

DI.set(REC_HISTORY_DUO, RecordHistoryDuo)
