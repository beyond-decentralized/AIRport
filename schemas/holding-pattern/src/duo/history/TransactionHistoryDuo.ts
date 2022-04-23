import {DEPENDENCY_INJECTION}                               from '@airport/direction-indicator'
import {TransactionType}                  from '@airport/ground-control'
import {
	Repository_Id,
	TransactionHistory
}                                         from '../../ddl/ddl'
import {TRANSACTION_HISTORY_DUO}                from '../../tokens'
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
		isRepositoryCreation: boolean,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo
	): IRepositoryTransactionHistory

}

export class TransactionHistoryDuo
	extends BaseTransactionHistoryDuo
	implements ITransactionHistoryDuo {

	getNewRecord(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		let transaction = new TransactionHistory() as ITransactionHistory

		transaction.transactionType = TransactionType.LOCAL

		return transaction
	}

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_Id,
		isRepositoryCreation: boolean,
		repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = transactionHistory.repositoryTransactionHistoryMap[repositoryId]

		if (!repositoryTransactionHistory) {
			repositoryTransactionHistory = repositoryTransactionHistoryDuo.getNewRecord(
				repositoryId, isRepositoryCreation)

			transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory)
			transactionHistory.repositoryTransactionHistoryMap[repositoryId] = <any>repositoryTransactionHistory
			repositoryTransactionHistory.transactionHistory = transactionHistory
		}

		return repositoryTransactionHistory
	}

}

DEPENDENCY_INJECTION.set(TRANSACTION_HISTORY_DUO, TransactionHistoryDuo)
