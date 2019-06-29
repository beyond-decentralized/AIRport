import {DI}                            from '@airport/di'
import {
	ChangeType,
	DbEntity
}                                      from '@airport/ground-control'
import {IBaseOperationHistoryDuo}      from '../../'
import {RepositoryEntityActorRecordId} from '../../ddl/ddl'
import {OPER_HISTORY_DUO}              from '../../diTokens'
import {
	BaseOperationHistoryDuo,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistory
}                                      from '../../generated/generated'
import {IRecordHistoryDuo}             from './RecordHistoryDuo'

export interface IOperationHistoryDuo
	extends IBaseOperationHistoryDuo {

	getNewRecord(
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		repositoryTransactionHistory: IRepositoryTransactionHistory,
	): IOperationHistory;

	sort(
		ew1: IOperationHistory,
		ew2: IOperationHistory
	): number;

	startRecordHistory(
		operationHistory: IOperationHistory,
		actorRecordId: RepositoryEntityActorRecordId,
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
	): IOperationHistory {
		let operationHistory: IOperationHistory = {
			repositoryTransactionHistory: repositoryTransactionHistory,
			changeType: entityChangeType,
			orderNumber: ++repositoryTransactionHistory.transactionHistory.numberOfOperations,
			entity: dbEntity
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
		actorRecordId: RepositoryEntityActorRecordId,
		recHistoryDuo: IRecordHistoryDuo
	): IRecordHistory {
		const recordHistory = recHistoryDuo.getNewRecord(actorRecordId)

		operationHistory.recordHistory.push(recordHistory)

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(recordHistory)

		return recordHistory
	}

}

DI.set(OPER_HISTORY_DUO, OperationHistoryDuo)
