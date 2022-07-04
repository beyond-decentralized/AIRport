import { Inject, Injected } from '@airport/direction-indicator'
import {
	ChangeType,
	DbEntity,
	IRootTransaction
} from '@airport/ground-control'
import { SystemWideOperationId } from '../../ddl/common'
import {
	Actor_LocalId,
	AirEntity_ActorRecordId
} from '../../ddl/ddl'
import {
	BaseOperationHistoryDuo,
	IActor,
	IBaseOperationHistoryDuo,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistory
} from '../../generated/generated'
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
		actorId: Actor_LocalId,
		_actorRecordId: AirEntity_ActorRecordId
	): IRecordHistory;

}

@Injected()
export class OperationHistoryDuo
	extends BaseOperationHistoryDuo
	implements IOperationHistoryDuo {

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

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
		_actorRecordId: AirEntity_ActorRecordId
	): IRecordHistory {
		const recordHistory = this.recordHistoryDuo.getNewRecord(actorId, _actorRecordId)

		recordHistory.operationHistory = operationHistory

		operationHistory.recordHistory.push(recordHistory)

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(<any>recordHistory)

		return recordHistory
	}

}
