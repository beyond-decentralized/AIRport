import {DI}                               from '@airport/di'
import {TransactionType}                  from '@airport/ground-control'
import {
	Repository_Id,
	TransactionHistory
}                                         from '../../ddl/ddl'
import {TRANS_HISTORY_DUO}                from '../../tokens'
import {
	BaseTransactionHistoryDuo,
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
}                                         from '../../generated/generated'
import {IRepositoryTransactionHistoryDuo} from './RepositoryTransactionHistoryDuo'

export interface ITransactionHistoryDuo {

	getNewRecord(
		transactionType?: TransactionType
	): ITransactionHistory;

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_Id,
		actor: IActor,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo
	): IRepositoryTransactionHistory

}

export class TransactionHistoryDuo
	extends BaseTransactionHistoryDuo
	implements ITransactionHistoryDuo {

	getNewRecord(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		let transaction = new TransactionHistory()

		transaction.transactionType = TransactionType.LOCAL

		return transaction
	}

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_Id,
		actor: IActor,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo
	): IRepositoryTransactionHistory {
		let repoTransHistory: IRepositoryTransactionHistory = transactionHistory.repoTransHistoryMap[repositoryId]

		if (!repoTransHistory) {
			repoTransHistory = repoTransHistoryDuo.getNewRecord(
				repositoryId, actor)

			transactionHistory.repositoryTransactionHistories.push(repoTransHistory)
			transactionHistory.repoTransHistoryMap[repositoryId] = <any>repoTransHistory
		}

		return repoTransHistory
	}

}

DI.set(TRANS_HISTORY_DUO, TransactionHistoryDuo)
