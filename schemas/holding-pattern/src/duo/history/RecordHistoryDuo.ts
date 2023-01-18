import { Inject, Injected } from '@airport/direction-indicator'
import { ActorRecordId, Actor_LocalId, DbColumn, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '@airport/ground-control'
import {
	RecordHistory
} from '../../ddl/ddl'
import { IRecordHistoryNewValueDuo } from './RecordHistoryNewValueDuo'
import { IRecordHistoryOldValueDuo } from './RecordHistoryOldValueDuo'


export interface IRecordHistoryDuo {

	getNewRecord(
		actorId: Actor_LocalId,
		_actorRecordId: ActorRecordId
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

@Injected()
export class RecordHistoryDuo
	implements IRecordHistoryDuo {

	@Inject()
	recordHistoryNewValueDuo: IRecordHistoryNewValueDuo

	@Inject()
	recordHistoryOldValueDuo: IRecordHistoryOldValueDuo

	getNewRecord(
		actorId: Actor_LocalId,
		_actorRecordId: ActorRecordId
	): IRecordHistory {
		const recordHistory = new RecordHistory()

		recordHistory._actorRecordId = _actorRecordId
		recordHistory.actor = {
			_localId: actorId
		} as any

		return recordHistory as IRecordHistory
	}

	addNewValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue {
		if (newValue === null) {
			// No need to record a null value
			return null
		}
		const recordHistoryNewValue = this.recordHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue)

		recordHistory.newValues.push(recordHistoryNewValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryNewValues.push(<any>recordHistoryNewValue)

		return recordHistoryNewValue
	}

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue {
		if (oldValue === null) {
			// No need to record a null value
			return null
		}
		const recordHistoryOldValue = this.recordHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue)

		recordHistory.oldValues.push(recordHistoryOldValue)


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(<any>recordHistoryOldValue)

		return recordHistoryOldValue
	}

}
