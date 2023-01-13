import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IDatastructureUtils
} from '@airport/ground-control'
import {
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	Repository_LocalId,
	Repository_Source,
	Repository_GUID
} from '@airport/holding-pattern/dist/app/bundle'
import { ISynchronizationAdapterLoader } from '../../adapters/SynchronizationAdapterLoader'
import { ISyncOutDataSerializer } from './converter/SyncOutDataSerializer'

export interface ISynchronizationOutManager {

	synchronizeOut(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void>

}

@Injected()
export class SynchronizationOutManager
	implements ISynchronizationOutManager {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao

	@Inject()
	synchronizationAdapterLoader: ISynchronizationAdapterLoader

	@Inject()
	syncOutDataSerializer: ISyncOutDataSerializer

	async synchronizeOut(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void> {
		await this.loadHistoryRepositories(repositoryTransactionHistories)
		const {
			historiesToSend,
			messages
		} = await this.syncOutDataSerializer.serialize(repositoryTransactionHistories)
		// await this.ensureGlobalRepositoryIdentifiers(repositoryTransactionHistories, messages)
		const groupMessageMap = this.groupMessagesBySourceAndRepository(
			messages, historiesToSend)

		for (const [repositorySource, messageMapForSource] of groupMessageMap) {
			const synchronizationAdapter = await this.synchronizationAdapterLoader.load(
				repositorySource)
			await synchronizationAdapter.sendTransactions(repositorySource, messageMapForSource)
		}

		await this.updateRepositoryTransactionHistories(messages, historiesToSend)
	}

	private async loadHistoryRepositories(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
	): Promise<void> {
		const repositoryIdsToLookup: Set<Repository_LocalId> = new Set()
		const repositoryMapById: Map<Repository_LocalId, IRepository> = new Map()

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryIdsToLookup.add(repositoryTransactionHistory.repository._localId)
		}

		if (!repositoryIdsToLookup.size) {
			return
		}

		const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds([
			...repositoryIdsToLookup.values()
		])
		for (const repository of repositories) {
			repositoryMapById.set(repository._localId, repository)
		}
		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryTransactionHistory.repository =
				repositoryMapById.get(repositoryTransactionHistory.repository._localId)
		}
	}

	private async ensureGlobalRepositoryIdentifiers(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		messages: RepositorySynchronizationMessage[]
	): Promise<void> {
		const repositoryIdsToLookup: Set<Repository_LocalId> = new Set()
		const repositoryMapById: Map<Repository_LocalId, IRepository> = new Map()

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			const repository = repositoryTransactionHistory.repository
			if (!repository.source || !repository.GUID) {
				repositoryIdsToLookup.add(repository._localId)
			} else {
				repositoryMapById.set(repository._localId, repository)
			}
		}

		if (!repositoryIdsToLookup.size) {
			return
		}

		const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds([
			...repositoryIdsToLookup.values()
		])
		for (const repository of repositories) {
			repositoryMapById.set(repository._localId, repository)
		}
		for (const message of messages) {
			const repository = message.history.repository
			if (!repository.source || !repository.GUID) {
				const foundRepository = repositoryMapById.get(repository._localId)
				repository.source = foundRepository.source
				repository.GUID = foundRepository.GUID
				delete repository._localId
			}
		}
	}

	private groupMessagesBySourceAndRepository(
		messages: RepositorySynchronizationMessage[],
		historiesToSend: IRepositoryTransactionHistory[]
	): Map<Repository_Source, Map<Repository_GUID, RepositorySynchronizationMessage[]>> {
		const groupMessageMap: Map<Repository_Source, Map<Repository_GUID, RepositorySynchronizationMessage[]>>
			= new Map()

		for (let i = 0; i < messages.length; i++) {
			const repository = historiesToSend[i].repository
			const source = repository.GUID.substring(0, 8)
			this.datastructureUtils.ensureChildArray(
				this.datastructureUtils.ensureChildJsMap(groupMessageMap, source),
				repository.GUID).push(messages[i])
		}

		return groupMessageMap
	}

	private async updateRepositoryTransactionHistories(
		messages: RepositorySynchronizationMessage[],
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void> {
		for (let i = 0; i < messages.length; i++) {
			const message = messages[i]
			const repositoryTransactionHistory = repositoryTransactionHistories[i]
			if (message.syncTimestamp) {
				repositoryTransactionHistory.syncTimestamp = message.syncTimestamp
				await this.repositoryTransactionHistoryDao.updateSyncTimestamp(repositoryTransactionHistory)
			}
		}
	}

}
