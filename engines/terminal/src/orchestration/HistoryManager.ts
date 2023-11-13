import { IRepositoryMaintenanceManager } from '@airbridge/sso'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IDatastructureUtils, IRepository, IRepositoryMember, IRepositoryTransactionHistory, ISequenceGenerator, ITransactionHistory, IUserAccount, Repository_LocalId, TransactionType } from '@airport/ground-control'
import {
	ITransactionHistoryDuo,
	Q_airport____at_airport_slash_holding_dash_pattern as Q,
	RepositoryDao,
	RepositoryMemberDao
} from '@airport/holding-pattern/dist/app/bundle'
import { IHistoryManager, IOperationContext, ITerminalSessionManager, ITransactionContext } from '@airport/terminal-map'

@Injected()
export class HistoryManager
	implements IHistoryManager {

	@Inject()
	dataStructureUtils: IDatastructureUtils

	@Inject()
	repositoryDao: RepositoryDao

	@Inject()
	repositoryMaintenanceManager: IRepositoryMaintenanceManager

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	@Inject()
	sequenceGenerator: ISequenceGenerator

	@Inject()
	transactionHistoryDuo: ITransactionHistoryDuo

	@Inject()
	terminalSessionManager: ITerminalSessionManager

	async getNewTransactionHistory(
		transactionType: TransactionType = TransactionType.LOCAL
	): Promise<ITransactionHistory> {
		return await this.transactionHistoryDuo.getTransactionHistory(transactionType)
	}

	async getRepositoryTransactionHistory(
		transactionHistory: ITransactionHistory,
		repositoryLid: Repository_LocalId,
		context: IOperationContext & ITransactionContext
	): Promise<IRepositoryTransactionHistory> {
		let isRepositoryCreation = false
		if (context.rootTransaction.newRepository?._localId
			=== repositoryLid) {
			isRepositoryCreation = true
		}

		return await this.transactionHistoryDuo.getRepositoryTransactionHistory(
			transactionHistory, repositoryLid, isRepositoryCreation)
	}

	async ensureRepositoryMembers(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		context: ITransactionContext
	): Promise<{
		repositoryMapByLid: Map<Repository_LocalId, IRepository>
		selfJoinRepositoryMembersToCreate: IRepositoryMember[]
	}> {
		const userAccount = await this.terminalSessionManager.getUserAccountFromSession()
		const {
			repositoryMapByLid,
			newMemberRepositoryTransactionHistoryMap
		} = await this.populateMissingRepositoriesAndMembers(
			repositoryTransactionHistories,
			userAccount,
			context
		)
		if (!newMemberRepositoryTransactionHistoryMap.size) {
			return {
				repositoryMapByLid: new Map(),
				selfJoinRepositoryMembersToCreate: []
			}
		}

		const repositoriesWithNewMembers: IRepository[] = []
		for (const repositoryTransactionHistories of newMemberRepositoryTransactionHistoryMap.values()) {
			const repository = repositoryTransactionHistories[0].repository
			if (!repository.isPublic) {
				throw new Error(`User '${userAccount.username}' is not a member of Repository GUID: '${repository.GUID}', LID: ${repository._localId}`)
			}
			repositoriesWithNewMembers.push(repository)
		}

		const originalRepositoryTransactionHistories = [
			...repositoryTransactionHistories
		]

		const selfJoinRepositoryMembersToCreate = await this.repositoryMaintenanceManager
			.getSelfJoinRepositoryMembers(repositoriesWithNewMembers, context)

		const keyRingRepositoryTransactionHistories = this
			.getKeyRingRepositoryTransactionHistories(
				originalRepositoryTransactionHistories, context)
		const selfJoinRepositoryMemberResults = await this.populateMissingRepositoriesAndMembers(
			keyRingRepositoryTransactionHistories,
			userAccount,
			context
		)

		const generatedLocalIds = (await this.sequenceGenerator.generateSequenceNumbers(
			[Q.RepositoryMember._localId.dbColumn], [selfJoinRepositoryMembersToCreate.length]))[0]

		for (let i = 0; i < selfJoinRepositoryMembersToCreate.length; i++) {
			const selfJoinRepositoryMemberToCreate = selfJoinRepositoryMembersToCreate[i]
			selfJoinRepositoryMemberToCreate._localId = generatedLocalIds[i]
			const repositoryTransactionHistories = newMemberRepositoryTransactionHistoryMap
				.get(selfJoinRepositoryMemberToCreate.repository._localId)
			for (const repositoryTransactionHistory of repositoryTransactionHistories) {
				repositoryTransactionHistory.member = selfJoinRepositoryMemberToCreate
				repositoryTransactionHistory.newRepositoryMembers.push(selfJoinRepositoryMemberToCreate)
			}
			selfJoinRepositoryMemberToCreate.addedInRepositoryTransactionHistory = repositoryTransactionHistories[0]
		}

		for (const [repositoryLid, repository] of selfJoinRepositoryMemberResults.repositoryMapByLid) {
			repositoryMapByLid.set(repositoryLid, repository)
		}

		return {
			repositoryMapByLid,
			selfJoinRepositoryMembersToCreate
		}
	}

	private async populateMissingRepositoriesAndMembers(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		userAccount: IUserAccount,
		context: ITransactionContext
	): Promise<{
		repositoryMapByLid: Map<Repository_LocalId, IRepository>,
		newMemberRepositoryTransactionHistoryMap: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
	}> {
		const repositoryLidSet: Set<Repository_LocalId> = new Set()
		const repositoriesToFindMembersForLidSet: Set<Repository_LocalId> = new Set()
		const newMemberRepositoryTransactionHistoryMap: Map<Repository_LocalId, IRepositoryTransactionHistory[]> = new Map()
		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			const repository = repositoryTransactionHistory.repository
			repositoryLidSet.add(repository._localId)

			if (repositoryTransactionHistory.member) {
				// All remotely synced changes will have a member
				continue
			}

			// Only local changes might miss member information
			repositoriesToFindMembersForLidSet.add(repository._localId)

			const repositoryTransactionHistoriesForRepositoryLid = this.dataStructureUtils
				.ensureChildArray(newMemberRepositoryTransactionHistoryMap,
					repository._localId)

			repositoryTransactionHistoriesForRepositoryLid.push(repositoryTransactionHistory)
		}
		if (!repositoryLidSet.size) {
			return {
				repositoryMapByLid: new Map(),
				newMemberRepositoryTransactionHistoryMap
			}
		}

		const repositoryMapByLid = await this.loadHistoryRepositories(repositoryLidSet, context)

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryTransactionHistory.repository =
				repositoryMapByLid.get(repositoryTransactionHistory.repository._localId)
		}

		if (!repositoriesToFindMembersForLidSet.size) {
			return {
				repositoryMapByLid,
				newMemberRepositoryTransactionHistoryMap
			}
		}

		// Following logic applies only to locally made changes (by the
		// signed in user) - all remote RepositoryTransactionHistories
		// must have members already
		const foundRepositoryMembers = await this.repositoryMemberDao.findForRepositoryLocalIdsAndUserLocalId(
			[...repositoriesToFindMembersForLidSet.values()],
			userAccount._localId,
			context
		)
		for (const repositoryMember of foundRepositoryMembers) {
			repositoryMember.userAccount = userAccount
			const repositoryTransactionHistories = newMemberRepositoryTransactionHistoryMap.get(
				repositoryMember.repository._localId
			)
			for (const repositoryTransactionHistory of repositoryTransactionHistories) {
				repositoryTransactionHistory.member = repositoryMember
				repositoryMember.repository = repositoryTransactionHistory.repository
			}
			newMemberRepositoryTransactionHistoryMap.delete(repositoryMember.repository._localId)
		}

		return {
			repositoryMapByLid,
			newMemberRepositoryTransactionHistoryMap
		}
	}

	private getKeyRingRepositoryTransactionHistories(
		originalRepositoryTransactionHistories: IRepositoryTransactionHistory[],
		context: ITransactionContext
	): IRepositoryTransactionHistory[] {
		const newRepositoryTransactionHistories: IRepositoryTransactionHistory[] = []

		const originalRepositoryTransactionHistorySet = new Set()
		for (const originalRepositoryTransactionHistory of originalRepositoryTransactionHistories) {
			originalRepositoryTransactionHistorySet.add(originalRepositoryTransactionHistory)
		}
		for (const newRepositoryTransactionHistory of context.transaction.transactionHistory.repositoryTransactionHistories) {
			if (!originalRepositoryTransactionHistorySet.has(newRepositoryTransactionHistory)) {
				newRepositoryTransactionHistories.push(newRepositoryTransactionHistory)
			}
		}

		return newRepositoryTransactionHistories
	}

	private async loadHistoryRepositories(
		repositoryLidSet: Set<Repository_LocalId>,
		context: IContext
	): Promise<Map<Repository_LocalId, IRepository>> {
		const repositoryMapByLid: Map<Repository_LocalId, IRepository> = new Map()
		const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds([
			...repositoryLidSet.values()
		], context)
		for (const repository of repositories) {
			repositoryMapByLid.set(repository._localId, repository)
		}

		return repositoryMapByLid
	}

}
