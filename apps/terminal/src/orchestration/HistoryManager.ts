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
	ITransactionHistoryDmo,
	TRANS_HISTORY_DMO
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

	// private operHistoryDmo: ICachedPromise<IOperationHistoryDmo>
	// private recHistoryDmo: ICachedPromise<IRecordHistoryDmo>
	// private repoTransHistoryDmo: ICachedPromise<IRepositoryTransactionHistoryDmo>
	private transHistoryDmo: ICachedPromise<ITransactionHistoryDmo>

	constructor() {
		// this.operHistoryDmo      = DI.cache(OPER_HISTORY_DMO,)
		// this.recHistoryDmo       = DI.cache(REC_HISTORY_DMO)
		// this.repoTransHistoryDmo = DI.cache(REPO_TRANS_HISTORY_DMO)
		this.transHistoryDmo = DI.cache(TRANS_HISTORY_DMO)
	}

	async getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		const transactionHistory = (await this.transHistoryDmo.get()).getNewRecord(transactionType)

		return transactionHistory
	}

	async getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): Promise<IRepositoryTransactionHistory> {
		const repoTransHistory = (await this.transHistoryDmo.get()).getRepositoryTransaction(
			transactionHistory, repository, actor)

		return repoTransHistory
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
