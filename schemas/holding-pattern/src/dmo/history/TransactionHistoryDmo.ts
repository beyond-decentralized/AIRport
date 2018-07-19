import {TransactionType}                  from "@airport/ground-control";
import {
	Inject,
	Service
}                                         from "typedi";
import {TransactionHistory}               from "../../ddl/ddl";
import {
	BaseTransactionHistoryDmo,
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
}                                         from "../../generated/generated";
import {
	RepositoryTransactionHistoryDmoToken,
	TransactionHistoryDmoToken
}                                         from "../../InjectionTokens";
import {IRepositoryTransactionHistoryDmo} from "./RepositoryTransactionHistoryDmo";

export interface ITransactionHistoryDmo {

	getNewRecord(
		transactionType?: TransactionType
	): ITransactionHistory;

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor,
	): IRepositoryTransactionHistory

}

@Service(TransactionHistoryDmoToken)
export class TransactionHistoryDmo
	extends BaseTransactionHistoryDmo
	implements ITransactionHistoryDmo {

	constructor(
		@Inject(RepositoryTransactionHistoryDmoToken)
		private repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo,
	) {
		super();
	}

	getNewRecord(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		let transaction = new TransactionHistory();

		transaction.transactionType = TransactionType.LOCAL;

		return transaction;
	}

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor,
	): IRepositoryTransactionHistory {
		let repoTransHistory = transactionHistory.repoTransHistoryMap[repository.id];

		if (!repoTransHistory) {
			repoTransHistory = this.repositoryTransactionHistoryDmo.getNewRecord(
				repository, actor);

			transactionHistory.repositoryTransactionHistories.push(repoTransHistory);
			transactionHistory.repoTransHistoryMap[repository.id] = repoTransHistory;
		}

		return repoTransHistory;
	}

}