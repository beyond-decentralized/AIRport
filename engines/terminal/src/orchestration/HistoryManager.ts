import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { Repository_LocalId, TransactionType } from '@airport/ground-control'
import {
	IRepositoryTransactionHistory,
	ITransactionHistory,
	ITransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
import { IHistoryManager, IOperationContext, ITransactionContext } from '@airport/terminal-map'

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
		context: IOperationContext & ITransactionContext
	): Promise<IRepositoryTransactionHistory> {
		return await this.transactionHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryId, !!context.rootTransaction.newRepository)
	}

}
