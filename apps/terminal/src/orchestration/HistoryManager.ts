import {
	DI
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

	// private operHistoryDuo: Promise<IOperationHistoryDuo>
	// private recHistoryDuo: Promise<IRecordHistoryDuo>
	// private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
	private transHistoryDuo: Promise<ITransactionHistoryDuo>

	constructor() {
		// this.operHistoryDuo      = DI.getP(OPER_HISTORY_DUO,)
		// this.recHistoryDuo       = DI.getP(REC_HISTORY_DUO)
		// this.repoTransHistoryDuo = DI.getP(REPO_TRANS_HISTORY_DUO)
		this.transHistoryDuo = DI.getP(TRANS_HISTORY_DUO)
	}

	async getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		const transactionHistory = (await this.transHistoryDuo).getNewRecord(transactionType)

		return transactionHistory
	}

	async getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): Promise<IRepositoryTransactionHistory> {
		const repoTransHistory = (await this.transHistoryDuo).getRepositoryTransaction(
			transactionHistory, repository, actor)

		return repoTransHistory
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
