import { IContext, Inject, Injected } from '@airport/direction-indicator';
import { IActor, IRepositoryMember, IRepositoryTransactionHistory, ITransactionHistory, RepositoryTransactionHistory_IsRepositoryCreation, Repository_IsPublic, Repository_LocalId, SyncAllModifiedColumnsMap, TransactionType } from '@airport/ground-control'
import { ITerminalSessionManager } from '@airport/terminal-map';
import { RepositoryMemberDao } from '../../dao/repository/member/RepositoryMemberDao';
import {
	TransactionHistory
} from '../../ddl/history/TransactionHistory'
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo'

export interface ITransactionHistoryDuo {

	getNewRecord(
		transactionType?: TransactionType
	): ITransactionHistory;

	getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryLocalId: Repository_LocalId,
		actor: IActor,
		isRepositoryCreation: boolean,
		isPublic: Repository_IsPublic,
		repositoryMember: IRepositoryMember,
		context: IContext
	): Promise<IRepositoryTransactionHistory>

}

@Injected()
export class TransactionHistoryDuo
	implements ITransactionHistoryDuo {

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	terminalSessionManager: ITerminalSessionManager

	getNewRecord(
		transactionType: TransactionType = TransactionType.LOCAL
	): ITransactionHistory {
		const transactionHistory = new TransactionHistory() as ITransactionHistory

		transactionHistory.modifiedRepository_LocalIdSet = new Set()
		transactionHistory.transactionType = transactionType

		return transactionHistory
	}

	async getRepositoryTransaction(
		transactionHistory: ITransactionHistory,
		repositoryLocalId: Repository_LocalId,
		actor: IActor,
		isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation,
		isPublic: Repository_IsPublic,
		repositoryMember: IRepositoryMember,
		context: IContext
	): Promise<IRepositoryTransactionHistory> {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = transactionHistory.repositoryTransactionHistoryMap[repositoryLocalId]

		if (!repositoryTransactionHistory) {
			const userSession = await this.terminalSessionManager.getUserSession()

			if (!repositoryMember) {
				repositoryMember = await this.repositoryMemberDao.findForRepositoryLocalIdAndUserLocalId(
					repositoryLocalId,
					userSession.userAccount._localId,
					context
				)
				if (!repositoryMember) {
					throw new Error(
						`User '${userSession.userAccount.username}' is not a member of Repository '${repositoryLocalId}'`)
				}
			}

			repositoryTransactionHistory = this.repositoryTransactionHistoryDuo.getNewRecord(
				repositoryLocalId, actor, transactionHistory, isRepositoryCreation, isPublic)
			repositoryTransactionHistory.member = repositoryMember

			transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory)
			transactionHistory.repositoryTransactionHistoryMap[repositoryLocalId] = <any>repositoryTransactionHistory
		}

		return repositoryTransactionHistory
	}

}
