import { Inject, Injected } from '@airport/direction-indicator'
import {
	ActorRecordId,
	Actor_LocalId,
	ChangeType,
	DbEntity,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistory,
	IRootTransaction,
	SystemWideOperationId
} from '@airport/ground-control'
import { IRecordHistoryDuo } from './RecordHistoryDuo'

export interface IOperationHistoryDuo {

	getNewRecord(
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		rootTransaction: IRootTransaction
	): IOperationHistory;

	sort(
		ew1: IOperationHistory,
		ew2: IOperationHistory
	): number;

	startRecordHistory(
		operationHistory: IOperationHistory,
		actorId: Actor_LocalId,
		_actorRecordId: ActorRecordId
	): IRecordHistory;

}

@Injected()
export class OperationHistoryDuo
	implements IOperationHistoryDuo {

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

	getNewRecord(
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		rootTransaction: IRootTransaction
	): IOperationHistory {
		let operationHistory: IOperationHistory = {
			changeType: entityChangeType,
			entity: dbEntity,
			_localId: undefined,
			orderNumber: ++rootTransaction.numberOfOperations,
			recordHistory: [],
			repositoryTransactionHistory: repositoryTransactionHistory,
			systemWideOperationId
		}
		return operationHistory
	}

	sort(
		ew1: IOperationHistory,
		ew2: IOperationHistory
	): number {
		let startId1 = ew1.orderNumber
		let startId2 = ew2.orderNumber
		if (startId1 > startId2) {
			return 1
		}
		if (startId2 > startId1) {
			return -1
		}
		return 0
	}

	startRecordHistory(
		operationHistory: IOperationHistory,
		actorId: Actor_LocalId,
		_actorRecordId: ActorRecordId
	): IRecordHistory {
		const recordHistory = this.recordHistoryDuo.getNewRecord(actorId, _actorRecordId)

		recordHistory.operationHistory = operationHistory

		operationHistory.recordHistory.push(recordHistory)

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(<any>recordHistory)

		return recordHistory
	}

}
