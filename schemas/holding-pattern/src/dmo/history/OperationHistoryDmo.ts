import {DbEntity}                 from "@airport/air-control";
import {ChangeType}               from "@airport/ground-control";
import {
	Inject,
	Service
}                                 from "typedi";
import {IBaseOperationHistoryDmo} from "../../";
import {
	OperationHistory,
	RepositoryEntityActorRecordId
}                                 from "../../ddl/ddl";
import {
	BaseOperationHistoryDmo,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistory
}                                 from "../../generated/generated";
import {
	OperationHistoryDmoToken,
	RecordHistoryDmoToken
}                                 from "../../InjectionTokens";
import {IRecordHistoryDmo}        from "./RecordHistoryDmo";

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

@Service(OperationHistoryDmoToken)
export class OperationHistoryDmo
	extends BaseOperationHistoryDmo
	implements IOperationHistoryDmo {

	constructor(
		@Inject(
			_ => RecordHistoryDmoToken)
		private recordHistoryDmo: IRecordHistoryDmo
	) {
		super();
	}

	getNewRecord(
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		repositoryTransactionHistory: IRepositoryTransactionHistory,
	): IOperationHistory {
		let operationHistory = new OperationHistory();
		operationHistory.repositoryTransactionHistory = repositoryTransactionHistory;
		operationHistory.changeType = entityChangeType;
		operationHistory.orderNumber = ++repositoryTransactionHistory.transactionHistory.numberOfOperations;
		operationHistory.entity = dbEntity;
		operationHistory.schemaVersion = dbEntity.schemaVersion;

		return operationHistory;
	}

	sort(
		ew1: IOperationHistory,
		ew2: IOperationHistory
	): number {
		let startId1 = ew1.orderNumber;
		let startId2 = ew2.orderNumber;
		if (startId1 > startId2) {
			return 1;
		}
		if (startId2 > startId1) {
			return -1;
		}
		return 0;
	}


	startRecordHistory(
		operationHistory: IOperationHistory,
		actorRecordId: RepositoryEntityActorRecordId,
	): IRecordHistory {

		const recordHistory = this.recordHistoryDmo.getNewRecord(actorRecordId);

		operationHistory.recordHistory.push(recordHistory);

		operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistory.push(recordHistory);

		return recordHistory;
	}

}