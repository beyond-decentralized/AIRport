import {
	DI
}                           from '@airport/di'
import {BlockSyncStatus}    from '@airport/ground-control'
import {
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	REPO_TRANS_HISTORY_DAO,
	REPOSITORY_DAO,
	RepositoryTransactionHistory
}                           from '@airport/holding-pattern'
import {transactional}      from '@airport/tower'
import {IRepositoryManager} from '../core/repository/RepositoryManager'
import {UpdateState}        from '../core/UpdateState'
import {IOfflineDeltaStore} from '../data/OfflineDeltaStore'
import {
	OFFLINE_DELTA_STORE,
	ONLINE_MANAGER,
	REPOSITORY_MANAGER
}                           from '../diTokens'

export interface IOnlineManager {

	goOffline(): Promise<void>;

	goOnline(): Promise<void>;

	isOnline(): boolean;

}

export class OnlineManager
	implements IOnlineManager {

	async goOffline(): Promise<void> {
		const repositoryManager = await DI.get(REPOSITORY_MANAGER)

		repositoryManager.goOffline()
		this.online = false
	}

	private online = false

	/**
	 There are tree update states:
	 LOCAL            0
	 REMOTE_CHANGES   1
	 GO_ONLINE        2
	 Mutation operations of lower order type are blocked until the higher order operation finishes.
	 Blocking prevents conflicts in remove transaction application.
	 Go-Online logic
	 1)  Flip update state to GO_ONLINE
	 2)  Find the lastSyncedTransaction recorded locally
	 3)  Go Online and start listening for new transactions coming in
	 a) While Go-Online is in progress continue gatethering all remote transactions that come in
	 and add them to remoteChangesSinceInitialGoOffline
	 b) Once Go-Online finishes, when remote transactions come in
	 i)  Flip update state to REMOTE_CHANGES
	 ii)  Add remote transactions to local store
	 iii) Flip state to LOCAL
	 4)  Load from deltaStore all remote transactions since lastSyncedTransaction
	 5)  Add remote transactions to local store
	 6)  While there are more transactions coming in remotely:
	 Add them to local store
	 7)  Find all local unsynced transactions
	 a)  Mark them as synchronized
	 b)  add them to deltaStore
	 c)  save them back in local store, now with the synched flag
	 (and update db with new lastSyncedTransaction)
	 8)  While there are more transactions coming in remotely:
	 Add them to local store
	 9)  Flip the online state to true
	 Finally, always flip update state to LOCAL
	 * @returns {Promise<void>}
	 */
	async goOnline(): Promise<void> {
		const [
			      offlineDeltaStore,
			      repositoryDao,
			      repoTransHistoryDao,
			      repositoryManager
		      ] = await DI.get(
		      	OFFLINE_DELTA_STORE, REPOSITORY_DAO,
			REPO_TRANS_HISTORY_DAO, REPOSITORY_MANAGER)
		await transactional(async () => {
			try {
				// 1)  Flip update state to GO_ONLINE
				repositoryManager.setUpdateStateForAll(UpdateState.GO_ONLINE)
				// 2)  Find repositories
				// const repoRecords = await this.repositoryDao.findWithTransaction()
				const repoRecords = await repositoryDao.findReposWithDetailsByIds()

				// 3) make each repository go Online
				let goOnlineCalls: Promise<void>[] = []
				repoRecords.forEach((repository) => {
					goOnlineCalls.push(this.repositoryGoOnline(
						repository,
						offlineDeltaStore,
						repositoryManager,
						repoTransHistoryDao
						))
				})
				await Promise.all(goOnlineCalls)

				// 9)  Flip the online state to true
				this.online = true
			} catch (error) {
				// TODO: notify of error
				throw error
			} finally {
				// Finally, always flip update state to LOCAL
				repositoryManager.setUpdateStateForAll(UpdateState.LOCAL)
			}
		})
	}

	async repositoryGoOnline(
		repository: IRepository,
		offlineDeltaStore: IOfflineDeltaStore,
		repositoryManager: IRepositoryManager,
		repoTransHistoryDao: IRepositoryTransactionHistoryDao
	): Promise<void> {
		let deltaStore = repositoryManager.deltaStore[repository.id]

		let remoteChangesSinceInitialGoOnline = []

		// 3)  Go Online and start listening for new transactions coming in
		await deltaStore.goOnline(async (transactions: IRepositoryTransactionHistory[]) => {
			if (!transactions.length) {
				return
			}
			transactions = transactions.map((repoTransaction) => {
				repoTransaction = new RepositoryTransactionHistory(repoTransaction)
				// TODO: ?is the following needed?
				// repoTransaction.deserialize(repository)

				return repoTransaction
			})
			// a) While Go-Online is in progress continue gathering all remote transactions
			// that come in and add them to remoteChangesSinceInitialGoOffline
			if (repositoryManager.getUpdateState(repository) === UpdateState.GO_ONLINE) {
				remoteChangesSinceInitialGoOnline.push(transactions)
			}
			// b) Once Go-Online finishes, when remote transactions come in
			else {
				try {
					// i)  Flip update state to REMOTE_CHANGES
					repositoryManager.setUpdateState(repository, UpdateState.REMOTE)
					// ii)  Add remote transactions to local store
					await offlineDeltaStore.addRemoteChanges(repository, transactions)
				} catch (error) {
					// TODO: notify of error
					throw error
				} finally {
					// iii) Flip state to LOCAL
					repositoryManager.setUpdateState(repository, UpdateState.LOCAL)
				}

			}
		})

		// 4)  Load from deltaStore all remote transactions since lastSyncedTransaction
		let remoteChangesIter = await deltaStore.loadTransactionsSinceLastKnown(repository.lastSyncedTransaction)
		let remoteChanges     = []
		while (remoteChangesIter.hasNext()) {
			remoteChanges.push(remoteChangesIter.next())
		}
		// 5)  Add remote transactions to local store
		if (remoteChanges.length) {
			await offlineDeltaStore.addRemoteChanges(repository, remoteChanges)
		}

		// 6)  While there are more transactions coming in remotely:
		while (remoteChangesSinceInitialGoOnline.length) {
			remoteChanges                     = remoteChangesSinceInitialGoOnline
			remoteChangesSinceInitialGoOnline = []
			// Add them to local store
			await offlineDeltaStore.addRemoteChanges(repository, remoteChanges)
		}

		// 7)  Find all local unsynced transactions
		let unsyncedChanges = await repoTransHistoryDao.findUnsyncedTransactions(repository)
		if (unsyncedChanges.length) {
			unsyncedChanges.forEach((transaction) => {
				// a)  Mark them as synchronized
				transaction.syncStatus = BlockSyncStatus.SYNCHRONIZED
			})
			// b)  add them to deltaStore
			await deltaStore.addChanges(deltaStore.config.changeListConfig, unsyncedChanges)
			// c)  save them back in local store, now with the synched flag
			// (and update db with new lastSyncedTransaction)
			await offlineDeltaStore.markChangesAsSynced(repository, null)
		}

		// 	8)  While there are more transactions coming in remotely:
		// Add them to local store
		while (remoteChangesSinceInitialGoOnline.length) {
			remoteChanges                     = remoteChangesSinceInitialGoOnline
			remoteChangesSinceInitialGoOnline = []
			await offlineDeltaStore.addRemoteChanges(repository, remoteChanges)
		}

		// 9)  Flip the online state to true
		this.online = true
	}

	isOnline(): boolean {
		return this.online
	}

}

DI.set(ONLINE_MANAGER, OnlineManager)
