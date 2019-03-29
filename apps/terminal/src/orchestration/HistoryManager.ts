import {DI}              from '@airport/di'
import {TransactionType} from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDmo,
	IRecordHistoryDmo,
	IRepository,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDmo,
	ITransactionHistory,
	ITransactionHistoryDmo,
	OPER_HISTORY_DMO,
	REC_HISTORY_DMO,
	REPO_TRANS_HISTORY_DMO,
	TRANS_HISTORY_DMO
}                        from '@airport/holding-pattern'
import {HISTORY_MANAGER} from '../diTokens'

export interface IHistoryManager {

	getNewTransHistory(
		transactionType: TransactionType
	): ITransactionHistory;

	getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): IRepositoryTransactionHistory;

}

export class HistoryManager
	implements IHistoryManager {

	private operHistoryDmo: IOperationHistoryDmo
	private recHistoryDmo: IRecordHistoryDmo
	private repoTransHistoryDmo: IRepositoryTransactionHistoryDmo
	private transHistoryDmo: ITransactionHistoryDmo

	constructor() {
		DI.get((
			operationHistoryDmo,
			recordHistoryDmo,
			repositoryTransactionHistoryDmo,
			transactionHistoryDmo
			) => {
				this.operHistoryDmo      = operationHistoryDmo
				this.recHistoryDmo       = recordHistoryDmo
				this.repoTransHistoryDmo = repositoryTransactionHistoryDmo
				this.transHistoryDmo     = transactionHistoryDmo
			}, OPER_HISTORY_DMO, REC_HISTORY_DMO,
			REPO_TRANS_HISTORY_DMO, TRANS_HISTORY_DMO)
	}

	getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		const transactionHistory = this.transHistoryDmo.getNewRecord(transactionType)

		return transactionHistory
	}

	getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor
	): IRepositoryTransactionHistory {
		const repoTransHistory = this.transHistoryDmo.getRepositoryTransaction(
			transactionHistory, repository, actor)

		return repoTransHistory
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
