import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { DbColumn } from '@airport/ground-control'
import {
	Actor_Id,
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
		actorId: Actor_Id,
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
		actorId: Actor_Id,
		actorRecordId: RepositoryEntity_ActorRecordId
	): IRecordHistory {
		const recordHistory = new RecordHistory()

		recordHistory.actorRecordId = actorRecordId
		recordHistory.actor = {
			id: actorId
		} as any

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
		recordHistoryOldValueDuo: IRecordHistoryOldValueDuo
	): IRecordHistoryOldValue {
		if (oldValue === null) {
			// No need to record a null value
			return null
		}
		const recordHistoryOldValue = recordHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue)

		recordHistory.oldValues.push(recordHistoryOldValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(<any>recordHistoryOldValue)

		return recordHistoryOldValue
	}

}

DEPENDENCY_INJECTION.set(RECORD_HISTORY_DUO, RecordHistoryDuo)
