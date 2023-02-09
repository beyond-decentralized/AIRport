import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IActor, IRepositoryMember, IRepositoryTransactionHistory, ITransactionHistory, Repository_LocalId, TransactionType } from '@airport/ground-control'
import {
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

	async getRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryLocalId: Repository_LocalId,
		actor: IActor,
		repositoryMember: IRepositoryMember,
		context: IOperationContext & ITransactionContext
	): Promise<IRepositoryTransactionHistory> {
		let isRepositoryCreation = false
		let isPublic = false
		const newRepository = context.rootTransaction.newRepository
		if (newRepository) {
			isRepositoryCreation = true
			isPublic = newRepository.isPublic
		}
		
		return await this.transactionHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryLocalId,
			actor, isRepositoryCreation, isPublic, repositoryMember, context)
	}

}
