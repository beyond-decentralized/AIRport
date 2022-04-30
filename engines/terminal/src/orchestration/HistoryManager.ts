import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { TransactionType } from '@airport/ground-control'
import {
	IRepositoryTransactionHistory,
	ITransactionHistory,
	ITransactionHistoryDuo,
	Repository_Id,
} from '@airport/holding-pattern'
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
		repositoryId: Repository_Id,
		context: IOperationContext
	): Promise<IRepositoryTransactionHistory> {
		return await this.transactionHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryId, !!context.newRepository)
	}

}
