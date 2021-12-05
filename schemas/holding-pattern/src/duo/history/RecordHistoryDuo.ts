import { DI } from '@airport/di'
import { DbColumn } from '@airport/ground-control'
import {
	RecordHistory,
	RepositoryEntity_ActorRecordId
} from '../../ddl/ddl'
import {
	RECORD_HISTORY_DUO
} from '../../tokens'
import {
	BaseRecordHistoryDuo,
	IBaseRecordHistoryDuo,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
} from '../../generated/generated'
import { IRecordHistoryNewValueDuo } from './RecordHistoryNewValueDuo'
import { IRecordHistoryOldValueDuo } from './RecordHistoryOldValueDuo'


export interface IRecordHistoryDuo
	extends IBaseRecordHistoryDuo {

	getNewRecord(
		actorRecordId: RepositoryEntity_ActorRecordId
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
		actorRecordId: RepositoryEntity_ActorRecordId
	): IRecordHistory {
		const recordHistory = new RecordHistory()

		recordHistory.actorRecordId = actorRecordId

		return recordHistory as IRecordHistory
	}

	addNewValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo
	): IRecordHistoryNewValue {
		if (newValue === null) {
			// No need to record a null value
			return null
		}
		const recordHistoryNewValue = recHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue)

		recordHistory.newValues.push(recordHistoryNewValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryNewValues.push(<any>recordHistoryNewValue)

		return recordHistoryNewValue
	}

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo
	): IRecordHistoryOldValue {
		if (oldValue === null) {
			// No need to record a null value
			return null
		}
		const recordHistoryOldValue = recHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue)

		recordHistory.oldValues.push(recordHistoryOldValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(<any>recordHistoryOldValue)

		return recordHistoryOldValue
	}

}

DI.set(RECORD_HISTORY_DUO, RecordHistoryDuo)
