import { Inject, Injected } from '@airport/air-control'
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	ensureChildArray,
	ensureChildJsMap
} from '@airport/ground-control'
import {
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	Repository_Id,
	Repository_Source,
	Repository_UuId
} from '@airport/holding-pattern'
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
		const repositoryIdsToLookup: Set<Repository_Id> = new Set()
		const repositoryMapById: Map<Repository_Id, IRepository> = new Map()

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryIdsToLookup.add(repositoryTransactionHistory.repository.id)
		}

		if (!repositoryIdsToLookup.size) {
			return
		}

		const repositories = await this.repositoryDao.findByIds([
			...repositoryIdsToLookup.values()
		])
		for (const repository of repositories) {
			repositoryMapById.set(repository.id, repository)
		}
		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryTransactionHistory.repository =
				repositoryMapById.get(repositoryTransactionHistory.repository.id)
		}
	}

	private async ensureGlobalRepositoryIdentifiers(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		messages: RepositorySynchronizationMessage[]
	): Promise<void> {
		const repositoryIdsToLookup: Set<Repository_Id> = new Set()
		const repositoryMapById: Map<Repository_Id, IRepository> = new Map()

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			const repository = repositoryTransactionHistory.repository
			if (!repository.source || !repository.uuId) {
				repositoryIdsToLookup.add(repository.id)
			} else {
				repositoryMapById.set(repository.id, repository)
			}
		}

		if (!repositoryIdsToLookup.size) {
			return
		}

		const repositories = await this.repositoryDao.findByIds([
			...repositoryIdsToLookup.values()
		])
		for (const repository of repositories) {
			repositoryMapById.set(repository.id, repository)
		}
		for (const message of messages) {
			const repository = message.history.repository
			if (!repository.source || !repository.uuId) {
				const foundRepository = repositoryMapById.get(repository.id)
				repository.source = foundRepository.source
				repository.uuId = foundRepository.uuId
				delete repository.id
			}
		}
	}

	private groupMessagesBySourceAndRepository(
		messages: RepositorySynchronizationMessage[],
		historiesToSend: IRepositoryTransactionHistory[]
	): Map<Repository_Source, Map<Repository_UuId, RepositorySynchronizationMessage[]>> {
		const groupMessageMap: Map<Repository_Source, Map<Repository_UuId, RepositorySynchronizationMessage[]>>
			= new Map()

		for (let i = 0; i < messages.length; i++) {
			const repository = historiesToSend[i].repository
			ensureChildArray(
				ensureChildJsMap(groupMessageMap, repository.source),
				repository.uuId).push(messages[i])
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
