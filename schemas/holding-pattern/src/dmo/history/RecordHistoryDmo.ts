import {DbColumn}                  from "@airport/air-control";
import {
	Inject,
	Service
}                                  from "typedi";
import {IBaseRecordHistoryDmo}     from "../../";
import {
	RecordHistory,
	RepositoryEntityActorRecordId
}                                  from "../../ddl/ddl";
import {
	BaseRecordHistoryDmo,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
}                                  from "../../generated/generated";
import {
	RecordHistoryDmoToken,
	RecordHistoryNewValueDmoToken,
	RecordHistoryOldValueDmoToken
}                                  from "../../InjectionTokens";
import {IRecordHistoryNewValueDmo} from "./RecordHistoryNewValueDmo";
import {IRecordHistoryOldValueDmo} from "./RecordHistoryOldValueDmo";


export interface IRecordHistoryDmo
	extends IBaseRecordHistoryDmo {

	getNewRecord(
		actorRecordId: RepositoryEntityActorRecordId
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

@Service(RecordHistoryDmoToken)
export abstract class RecordHistoryDmo
	extends BaseRecordHistoryDmo
	implements IRecordHistoryDmo {

	constructor(
		@Inject(
			_ => RecordHistoryNewValueDmoToken)
		private recordHistoryNewValueDmo: IRecordHistoryNewValueDmo,
		@Inject(
			_ => RecordHistoryOldValueDmoToken)
		private recordHistoryOldValueDmo: IRecordHistoryOldValueDmo
	) {
		super();
	}

	getNewRecord(
		actorRecordId: RepositoryEntityActorRecordId
	): IRecordHistory {
		const recordHistory = new RecordHistory();

		recordHistory.actorRecordId = actorRecordId;

		return recordHistory;
	}

	addNewValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		newValue: any
	): IRecordHistoryNewValue {
		const recordHistoryNewValue = this.recordHistoryNewValueDmo.getNewRecord(recordHistory, dbColumn, newValue);

		recordHistory.newValues.push(recordHistoryNewValue);


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue);

		return recordHistoryNewValue;
	}

	addOldValue(
		recordHistory: IRecordHistory,
		dbColumn: DbColumn,
		oldValue: any
	): IRecordHistoryOldValue {
		const recordHistoryOldValue = this.recordHistoryOldValueDmo.getNewRecord(recordHistory, dbColumn, oldValue);

		recordHistory.oldValues.push(recordHistoryOldValue);


		recordHistory.operationHistory.repositoryTransactionHistory
			.transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue);

		return recordHistoryOldValue;
	}

}