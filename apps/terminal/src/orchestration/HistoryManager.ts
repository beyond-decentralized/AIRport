import {
	DI,
	ICachedPromise
}                        from '@airport/di'
import {TransactionType} from '@airport/ground-control'
import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	ITransactionHistoryDuo,
	TRANS_HISTORY_DUO
}                        from '@airport/holding-pattern'
import {HISTORY_MANAGER} from '../diTokens'

export interface IHistoryManager {

	getNewTransHistory(
		transactionType: TransactionType
	): Promise<ITransactionHistory>;

	getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): Promise<IRepositoryTransactionHistory>;

}

export class HistoryManager
	implements IHistoryManager {

	// private operHistoryDuo: ICachedPromise<IOperationHistoryDuo>
	// private recHistoryDuo: ICachedPromise<IRecordHistoryDuo>
	// private repoTransHistoryDuo: ICachedPromise<IRepositoryTransactionHistoryDuo>
	private transHistoryDuo: ICachedPromise<ITransactionHistoryDuo>

	constructor() {
		// this.operHistoryDuo      = DI.cache(OPER_HISTORY_DUO,)
		// this.recHistoryDuo       = DI.cache(REC_HISTORY_DUO)
		// this.repoTransHistoryDuo = DI.cache(REPO_TRANS_HISTORY_DUO)
		this.transHistoryDuo = DI.cache(TRANS_HISTORY_DUO)
	}

	async getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		const transactionHistory = (await this.transHistoryDuo.get()).getNewRecord(transactionType)

		return transactionHistory
	}

	async getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): Promise<IRepositoryTransactionHistory> {
		const repoTransHistory = (await this.transHistoryDuo.get()).getRepositoryTransaction(
			transactionHistory, repository, actor)

		return repoTransHistory
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
