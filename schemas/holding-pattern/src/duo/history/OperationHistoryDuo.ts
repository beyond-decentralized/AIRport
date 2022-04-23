import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import {
	ChangeType,
	DbEntity,
	IRootTransaction
} from '@airport/ground-control'
import { SystemWideOperationId } from '../../ddl/common'
import {
	Actor_Id,
	RepositoryEntity_ActorRecordId
} from '../../ddl/ddl'
import {
	BaseOperationHistoryDuo,
	IActor,
	IBaseOperationHistoryDuo,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistory
} from '../../generated/generated'
import { OPERATION_HISTORY_DUO } from '../../tokens'
import { IRecordHistoryDuo } from './RecordHistoryDuo'

export interface IOperationHistoryDuo
	extends IBaseOperationHistoryDuo {

	getNewRecord(
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		actor: IActor,
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
		actorId: Actor_Id,
		actorRecordId: RepositoryEntity_ActorRecordId,
		recHistoryDuo: IRecordHistoryDuo
	): IRecordHistory;

}

export class OperationHistoryDuo
	extends BaseOperationHistoryDuo
	implements IOperationHistoryDuo {

	getNewRecord(
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		actor: IActor,
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		rootTransaction: IRootTransaction
	): IOperationHistory {
		let operationHistory: IOperationHistory = {
			actor,
			changeType: entityChangeType,
			entity: dbEntity,
			id: undefined,
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
		actorId: Actor_Id,
		actorRecordId: RepositoryEntity_ActorRecordId,
		recordHistoryDuo: IRecordHistoryDuo
	): IRecordHistory {
		const recordHistory = recordHistoryDuo.getNewRecord(actorId, actorRecordId)

		recordHistory.operationHistory = operationHistory

		operationHistory.recordHistory.push(recordHistory)

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(<any>recordHistory)

		return recordHistory
	}

}

DEPENDENCY_INJECTION.set(OPERATION_HISTORY_DUO, OperationHistoryDuo)
