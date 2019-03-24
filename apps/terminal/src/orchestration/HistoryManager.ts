import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	OperationHistoryDmo,
	OperationHistoryDmoToken,
	RecordHistoryDmo,
	RecordHistoryDmoToken,
	RepositoryTransactionHistoryDmo,
	RepositoryTransactionHistoryDmoToken,
	TransactionHistoryDmo,
	TransactionHistoryDmoToken
}                                          from "@airport/holding-pattern";
import {TransactionType}                   from "@airport/terminal-map/lib/TransactionType";
import {Inject, Service}                   from "typedi";
import {HISTORY_MANAGER, IdGeneratorToken} from "../diTokens";
import {IdGenerator}                       from "../store/IdGenerator";

export interface IHistoryManager {

	getNewTransHistory(
		transactionType: TransactionType
	): ITransactionHistory;

	getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): IRepositoryTransactionHistory;

}

@Service(HISTORY_MANAGER)
export class HistoryManager implements IHistoryManager {

	constructor(
		@Inject(
			_ => OperationHistoryDmoToken)
		private operationHistoryDmo: OperationHistoryDmo,
		@Inject(
			_ => RecordHistoryDmoToken)
		private recordHistoryDmo: RecordHistoryDmo,
		@Inject(
			_ => RepositoryTransactionHistoryDmoToken)
		private repositoryTransactionHistoryDmo: RepositoryTransactionHistoryDmo,
		@Inject(
			_ => TransactionHistoryDmoToken)
		private transactionHistoryDmo: TransactionHistoryDmo,
	) {
	}

	getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		const transactionHistory = this.transactionHistoryDmo.getNewRecord(transactionType);

		return transactionHistory;
	}

	getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): IRepositoryTransactionHistory {
		const repoTransHistory = this.transactionHistoryDmo.getRepositoryTransaction(
			transactionHistory, repository, actor);

		return repoTransHistory;
	}

}