import { Inject, Injected } from '@airport/direction-indicator';
import { IRepositoryTransactionHistory, ITransactionHistory, RepositoryTransactionHistory_IsRepositoryCreation, Repository_IsPublic, Repository_LocalId, TransactionType } from '@airport/ground-control'
import {
	TransactionHistory
} from '../../ddl/history/TransactionHistory'
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo'

export interface ITransactionHistoryDuo {

	getTransactionHistory(
		transactionType?: TransactionType
	): ITransactionHistory;

	getRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryLocalId: Repository_LocalId,
		isRepositoryCreation: boolean
	): IRepositoryTransactionHistory

}

@Injected()
export class TransactionHistoryDuo
	implements ITransactionHistoryDuo {

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	getTransactionHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		const transactionHistory = new TransactionHistory() as ITransactionHistory

		transactionHistory.modifiedRepository_LocalIdSet = new Set()
		transactionHistory.transactionType = transactionType

		return transactionHistory
	}

	getRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryLocalId: Repository_LocalId,
		isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = transactionHistory.repositoryTransactionHistoryMap[repositoryLocalId]

		if (!repositoryTransactionHistory) {
			repositoryTransactionHistory = this.repositoryTransactionHistoryDuo.getRepositoryTransactionHistory(
				repositoryLocalId, transactionHistory, isRepositoryCreation)
			transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory)
			transactionHistory.repositoryTransactionHistoryMap[repositoryLocalId] = <any>repositoryTransactionHistory
		}

		return repositoryTransactionHistory
	}

}
