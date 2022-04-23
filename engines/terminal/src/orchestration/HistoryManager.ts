import { container, DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { TransactionType } from '@airport/ground-control'
import {
	IActor,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	REPOSITORY_TRANSACTION_HISTORY_DUO,
	Repository_Id,
	TRANSACTION_HISTORY_DUO
} from '@airport/holding-pattern'
import { IHistoryManager, IOperationContext } from '@airport/terminal-map'
import { HISTORY_MANAGER } from '../tokens'

export class HistoryManager
	implements IHistoryManager {

	// private operHistoryDuo: Promise<IOperationHistoryDuo>
	// private recHistoryDuo: Promise<IRecordHistoryDuo>
	// private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>

	async getNewTransactionHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		const transactionHistoryDuo = await container(this).get(TRANSACTION_HISTORY_DUO)

		return await transactionHistoryDuo.getNewRecord(transactionType)
	}

	async getNewRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_Id,
		context: IOperationContext
	): Promise<IRepositoryTransactionHistory> {
		const [repositoryTransactionHistoryDuo, transactionHistoryDuo] = await container(this).get(
			REPOSITORY_TRANSACTION_HISTORY_DUO, TRANSACTION_HISTORY_DUO)

		return await transactionHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryId, !!context.newRepository, repositoryTransactionHistoryDuo)
	}

}

DEPENDENCY_INJECTION.set(HISTORY_MANAGER, HistoryManager)
