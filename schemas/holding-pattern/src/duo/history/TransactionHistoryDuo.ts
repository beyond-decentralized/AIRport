import { TransactionType } from '@airport/ground-control'
import {
	Repository_Id,
	TransactionHistory
} from '../../ddl/ddl'
import {
	BaseTransactionHistoryDuo,
	IRepositoryTransactionHistory,
	ITransactionHistory,
} from '../../generated/generated'
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo'

export interface ITransactionHistoryDuo {

	getNewRecord(
		transactionType?: TransactionType
	): ITransactionHistory;

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_Id,
		isRepositoryCreation: boolean
	): IRepositoryTransactionHistory

}

export class TransactionHistoryDuo
	extends BaseTransactionHistoryDuo
	implements ITransactionHistoryDuo {

	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

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
		isRepositoryCreation: boolean
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = transactionHistory.repositoryTransactionHistoryMap[repositoryId]

		if (!repositoryTransactionHistory) {
			repositoryTransactionHistory = this.repositoryTransactionHistoryDuo.getNewRecord(
				repositoryId, isRepositoryCreation)

			transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory)
			transactionHistory.repositoryTransactionHistoryMap[repositoryId] = <any>repositoryTransactionHistory
			repositoryTransactionHistory.transactionHistory = transactionHistory
		}

		return repositoryTransactionHistory
	}

}
