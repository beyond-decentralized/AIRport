import {container, DI}              from '@airport/di'
import {TransactionType} from '@airport/ground-control'
import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	REPO_TRANS_HISTORY_DUO,
	RepositoryId,
	TRANS_HISTORY_DUO
}                        from '@airport/holding-pattern'
import {HISTORY_MANAGER} from '../tokens'

export interface IHistoryManager {

	getNewTransHistory(
		transactionType: TransactionType
	): Promise<ITransactionHistory>;

	getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repositoryId: RepositoryId,
		actor: IActor
	): Promise<IRepositoryTransactionHistory>;

}

export class HistoryManager
	implements IHistoryManager {

	// private operHistoryDuo: Promise<IOperationHistoryDuo>
	// private recHistoryDuo: Promise<IRecordHistoryDuo>
	// private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>

	async getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		const transHistoryDuo = await container(this).get(TRANS_HISTORY_DUO)

		return await transHistoryDuo.getNewRecord(transactionType)
	}

	async getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repositoryId: RepositoryId,
		actor: IActor,
	): Promise<IRepositoryTransactionHistory> {
		const [repoTransHistoryDuo, transHistoryDuo] = await container(this).get(
			REPO_TRANS_HISTORY_DUO, TRANS_HISTORY_DUO)

		return await transHistoryDuo.getRepositoryTransaction(
			transactionHistory, repositoryId, actor, repoTransHistoryDuo)
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
