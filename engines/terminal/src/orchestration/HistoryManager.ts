import { container, DI } from '@airport/di'
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

	async getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		const transHistoryDuo = await container(this).get(TRANSACTION_HISTORY_DUO)

		return await transHistoryDuo.getNewRecord(transactionType)
	}

	async getNewRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_Id,
		actor: IActor,
		context: IOperationContext
	): Promise<IRepositoryTransactionHistory> {
		const [repositoryTransactionHistoryDuo, transactionHistoryDuo] = await container(this).get(
			REPOSITORY_TRANSACTION_HISTORY_DUO, TRANSACTION_HISTORY_DUO)

		return await transactionHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryId, actor, !!context.newRepository, repositoryTransactionHistoryDuo)
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
