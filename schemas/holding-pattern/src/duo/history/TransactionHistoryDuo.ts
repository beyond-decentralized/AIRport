import { Inject, Injected } from '@airport/direction-indicator';
import { TransactionType } from '@airport/ground-control'
import {
	TransactionHistory
} from '../../ddl/ddl'
import {
	BaseTransactionHistoryDuo,
	IRepositoryTransactionHistory,
	ITransactionHistory,
} from '../../generated/generated'
import { Repository_LocalId } from '../../types';
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo'

export interface ITransactionHistoryDuo {

	getNewRecord(
		transactionType?: TransactionType
	): ITransactionHistory;

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_LocalId,
		isRepositoryCreation: boolean
	): IRepositoryTransactionHistory

}

@Injected()
export class TransactionHistoryDuo
	extends BaseTransactionHistoryDuo
	implements ITransactionHistoryDuo {

	@Inject()
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
		repositoryId: Repository_LocalId,
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
