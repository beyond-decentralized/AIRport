import {
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	RepositoryDaoToken,
	RepositoryTransactionHistory,
	RepositoryTransactionHistoryDaoToken
}                           from "@airport/holding-pattern";
import {SyncStatus}         from "@airport/terminal-map";
import {Transactional}      from "@airport/tower";
import {
	Inject,
	Service
}                           from "typedi";
import {IRepositoryManager} from "../core/repository/RepositoryManager";
import {UpdateState}        from "../core/UpdateState";
import {IOfflineDeltaStore} from "../data/OfflineDeltaStore";
import {
	OFFLINE_DELTA_STORE,
	ONLINE_MANAGER,
	REPOSITORY_MANAGER
}                           from "../diTokens";

export interface IOnlineManager {

	goOffline(): void;

	goOnline(): Promise<void>;

	isOnline(): boolean;

}

@Service(ONLINE_MANAGER)
export class OnlineManager
	implements IOnlineManager {

	goOffline(): void {
		this.repositoryManager.goOffline();
		this.online = false;
	}

	private online = false;

	constructor(
		@Inject(
			_ => OFFLINE_DELTA_STORE)
		private offlineDeltaStore: IOfflineDeltaStore,
		@Inject(
			_ => REPOSITORY_MANAGER)
		private repositoryManager: IRepositoryManager,
		@Inject(
			_ => RepositoryDaoToken)
		private repositoryDao: IRepositoryDao,
		@Inject(
			_ => RepositoryTransactionHistoryDaoToken)
		private repoTransHistory: IRepositoryTransactionHistoryDao,
	) {
	}

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
	@Transactional()
	async goOnline(): Promise<void> {
		try {
			// 1)  Flip update state to GO_ONLINE
			this.repositoryManager.setUpdateStateForAll(UpdateState.GO_ONLINE);
			// 2)  Find repositories
			const repoRecords = await this.repositoryDao.findWithTransaction();

			// 3) make each repository go Online
			let goOnlineCalls: Promise<void>[] = [];
			repoRecords.forEach((repository) => {
				goOnlineCalls.push(this.repositoryGoOnline(repository));
			});
			await Promise.all(goOnlineCalls);

			// 9)  Flip the online state to true
			this.online = true;
		} catch (error) {
			// TODO: notify of error
			throw error;
		} finally {
			// Finally, always flip update state to LOCAL
			this.repositoryManager.setUpdateStateForAll(UpdateState.LOCAL);
		}
	}

	async repositoryGoOnline(repository: IRepository): Promise<void> {
		let deltaStore = this.repositoryManager.deltaStore[repository.id];

		let remoteChangesSinceInitialGoOnline = [];

		// 3)  Go Online and start listening for new transactions coming in
		await deltaStore.goOnline(async (transactions: IRepositoryTransactionHistory[]) => {
			if (!transactions.length) {
				return;
			}
			transactions = transactions.map((repoTransaction) => {
				repoTransaction = new RepositoryTransactionHistory(repoTransaction);
				repoTransaction.deserialize(repository);

				return repoTransaction;
			});
			// a) While Go-Online is in progress continue gathering all remote transactions that come in
			// and add them to remoteChangesSinceInitialGoOffline
			if (this.repositoryManager.getUpdateState(repository) === UpdateState.GO_ONLINE) {
				remoteChangesSinceInitialGoOnline.push(transactions);
			}
			// b) Once Go-Online finishes, when remote transactions come in
			else {
				try {
					// i)  Flip update state to REMOTE_CHANGES
					this.repositoryManager.setUpdateState(repository, UpdateState.REMOTE);
					// ii)  Add remote transactions to local store
					await this.offlineDeltaStore.addRemoteChanges(repository, transactions);
				} catch (error) {
					// TODO: notify of error
					throw error;
				} finally {
					// iii) Flip state to LOCAL
					this.repositoryManager.setUpdateState(repository, UpdateState.LOCAL);
				}

			}
		});

		// 4)  Load from deltaStore all remote transactions since lastSyncedTransaction
		let remoteChangesIter = await deltaStore.loadTransactionsSinceLastKnown(repository.lastSyncedTransaction);
		let remoteChanges = [];
		while (remoteChangesIter.hasNext()) {
			remoteChanges.push(remoteChangesIter.next());
		}
		// 5)  Add remote transactions to local store
		if (remoteChanges.length) {
			await this.offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
		}

		// 6)  While there are more transactions coming in remotely:
		while (remoteChangesSinceInitialGoOnline.length) {
			remoteChanges = remoteChangesSinceInitialGoOnline;
			remoteChangesSinceInitialGoOnline = [];
			// Add them to local store
			await this.offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
		}

		// 7)  Find all local unsynced transactions
		let unsyncedChanges = await this.repoTransHistory.findUnsyncedTransactions(repository);
		if (unsyncedChanges.length) {
			unsyncedChanges.forEach((transaction) => {
				// a)  Mark them as synchronized
				transaction.syncStatus = SyncStatus.SYNCHRONIZED;
			});
			// b)  add them to deltaStore
			await deltaStore.addChanges(deltaStore.config.changeListConfig, unsyncedChanges);
			// c)  save them back in local store, now with the synched flag
			// (and update db with new lastSyncedTransaction)
			await this.offlineDeltaStore.markChangesAsSynced(repository, null);
		}

		// 	8)  While there are more transactions coming in remotely:
		// Add them to local store
		while (remoteChangesSinceInitialGoOnline.length) {
			remoteChanges = remoteChangesSinceInitialGoOnline;
			remoteChangesSinceInitialGoOnline = [];
			await this.offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
		}

		// 9)  Flip the online state to true
		this.online = true;
	}

	isOnline(): boolean {
		return this.online;
	}

}