import {DI}              from '@airport/di'
import {TransactionType} from '@airport/ground-control'
import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	REPO_TRANS_HISTORY_DUO,
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

	getNewTransHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		return DI.get(TRANS_HISTORY_DUO).then(
			transHistoryDuo =>
				transHistoryDuo.getNewRecord(transactionType)
		)
	}

	async getNewRepoTransHistory(
		transactionHistory: ITransactionHistory,
		repository: IRepository,
		actor: IActor,
	): Promise<IRepositoryTransactionHistory> {
		return DI.get(REPO_TRANS_HISTORY_DUO, TRANS_HISTORY_DUO).then((
			[
				repoTransHistoryDuo,
				transHistoryDuo
			]) =>
			transHistoryDuo.getRepositoryTransaction(
				transactionHistory, repository, actor, repoTransHistoryDuo)
		)
	}

}

DI.set(HISTORY_MANAGER, HistoryManager)
