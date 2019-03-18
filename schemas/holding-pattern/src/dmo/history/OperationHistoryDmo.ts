import {DI}                            from '@airport/di'
import {
	ChangeType,
	DbEntity
}                                      from '@airport/ground-control'
import {IBaseOperationHistoryDmo}      from '../../'
import {RepositoryEntityActorRecordId} from '../../ddl/ddl'
import {
	OPERATION_HISTORY_DMO,
	RECORD_HISTORY_DMO
}                                      from '../../diTokens'
import {
	BaseOperationHistoryDmo,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistory
}                                      from '../../generated/generated'
import {IRecordHistoryDmo}             from './RecordHistoryDmo'

export interface IOperationHistoryDmo
	extends IBaseOperationHistoryDmo {

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
	): IRecordHistory;

}

export class OperationHistoryDmo
	extends BaseOperationHistoryDmo
	implements IOperationHistoryDmo {

	private recHistoryDmo: IRecordHistoryDmo

	constructor() {
		super()

		DI.get((
			recordHistoryDmo
		) => {
			this.recHistoryDmo = recordHistoryDmo
		}, RECORD_HISTORY_DMO)
	}

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
	): IRecordHistory {

		const recordHistory = this.recHistoryDmo.getNewRecord(actorRecordId)

		operationHistory.recordHistory.push(recordHistory)

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(recordHistory)

		return recordHistory
	}

}

DI.set(OPERATION_HISTORY_DMO, OperationHistoryDmo)
