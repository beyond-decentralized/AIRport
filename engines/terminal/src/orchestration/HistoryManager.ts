import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { TransactionType } from '@airport/ground-control'
import {
	IRepositoryTransactionHistory,
	ITransactionHistory,
	ITransactionHistoryDuo,
	Repository_LocalId,
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index'
import { IHistoryManager, IOperationContext } from '@airport/terminal-map'

@Injected()
export class HistoryManager
	implements IHistoryManager {

	@Inject()
	transactionHistoryDuo: ITransactionHistoryDuo

	async getNewTransactionHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		return await this.transactionHistoryDuo.getNewRecord(transactionType)
	}

	async getNewRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryId: Repository_LocalId,
		context: IOperationContext
	): Promise<IRepositoryTransactionHistory> {
		return await this.transactionHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryId, !!context.newRepository)
	}

}
