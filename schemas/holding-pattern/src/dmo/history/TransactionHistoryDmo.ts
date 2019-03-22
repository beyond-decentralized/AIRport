import {DI}                               from '@airport/di'
import {TransactionType}                  from '@airport/ground-control'
import {TransactionHistory}               from '../../ddl/ddl'
import {
	REPO_TRANS_HISTORY_DMO,
	TRANS_HISTORY_DMO
}                                         from '../../diTokens'
import {
	BaseTransactionHistoryDmo,
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
}                                         from '../../generated/generated'
import {IRepositoryTransactionHistoryDmo} from './RepositoryTransactionHistoryDmo'

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

export class TransactionHistoryDmo
	extends BaseTransactionHistoryDmo
	implements ITransactionHistoryDmo {

	private repoTransHistoryDmo: IRepositoryTransactionHistoryDmo

	constructor() {
		super()

		DI.get((
			repositoryTransactionHistoryDmo
		) => {
			this.repoTransHistoryDmo = repositoryTransactionHistoryDmo
		}, REPO_TRANS_HISTORY_DMO)
	}

	getNewRecord(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		let transaction = new TransactionHistory()

		transaction.transactionType = TransactionType.LOCAL

		return transaction
	}

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor,
	): IRepositoryTransactionHistory {
		let repoTransHistory = transactionHistory.repoTransHistoryMap[repository.id]

		if (!repoTransHistory) {
			repoTransHistory = this.repoTransHistoryDmo.getNewRecord(
				repository, actor)

			transactionHistory.repositoryTransactionHistories.push(repoTransHistory)
			transactionHistory.repoTransHistoryMap[repository.id] = repoTransHistory
		}

		return repoTransHistory
	}

}

DI.set(TRANS_HISTORY_DMO, TransactionHistoryDmo)
