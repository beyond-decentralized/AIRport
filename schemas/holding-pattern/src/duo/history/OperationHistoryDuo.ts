import { DI } from '@airport/di'
import {
	ChangeType,
	DbEntity
} from '@airport/ground-control'
import { SystemWideOperationId } from '../../ddl/common'
import {
	Actor_Id,
	RepositoryEntity_ActorRecordId
} from '../../ddl/ddl'
import {
	BaseOperationHistoryDuo,
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
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId
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
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId
	): IOperationHistory {
		let operationHistory: IOperationHistory = {
			changeType: entityChangeType,
			entity: dbEntity,
			id: undefined,
			orderNumber: ++repositoryTransactionHistory.transactionHistory.numberOfOperations,
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
		recHistoryDuo: IRecordHistoryDuo
	): IRecordHistory {
		const recordHistory = recHistoryDuo.getNewRecord(actorId, actorRecordId)

		recordHistory.operationHistory = operationHistory

		operationHistory.recordHistory.push(recordHistory)

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(<any>recordHistory)

		return recordHistory
	}

}

DI.set(OPERATION_HISTORY_DUO, OperationHistoryDuo)
