import {
	IMessageSigningManager
} from '@airbridge/keyring/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IDatastructureUtils, IRepository, IRepositoryTransactionHistory, SyncRepositoryData, SyncRepositoryMessage, Repository_GUID, Repository_LocalId
} from '@airport/ground-control'
import {
	IRepositoryDao,
	IRepositoryTransactionHistoryDao
} from '@airport/holding-pattern/dist/app/bundle'
import { ISynchronizationAdapterLoader } from '../../adapters/SynchronizationAdapterLoader'
import { RepositoryReferenceCreator } from '../RepositoryReferenceCreator'
import { ISyncOutDataSerializer } from './converter/SyncOutDataSerializer'

export interface ISynchronizationOutManager {

	getSynchronizationMessages(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[]
	}>

	sendMessages(
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[],
		context: IContext
	): Promise<void>

}

@Injected()
export class SynchronizationOutManager
	implements ISynchronizationOutManager {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	messageSigningManager: IMessageSigningManager

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryReferenceCreator: RepositoryReferenceCreator

	@Inject()
	repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao

	@Inject()
	synchronizationAdapterLoader: ISynchronizationAdapterLoader

	@Inject()
	syncOutDataSerializer: ISyncOutDataSerializer

	async getSynchronizationMessages(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[]
	}> {
		const repositoryMapById: Map<Repository_LocalId, IRepository> = await this
			.loadHistoryRepositories(repositoryTransactionHistories, context)
		const {
			historiesToSend,
			messages
		} = await this.syncOutDataSerializer.serialize(
			repositoryTransactionHistories, repositoryMapById, context)
		// await this.ensureGlobalRepositoryIdentifiers(repositoryTransactionHistories, messages)

		await this.messageSigningManager.signMessages(historiesToSend, messages, context)

		await this.repositoryReferenceCreator.create(messages, context)

		for (const message of messages) {
			for (const referencedRepository of message.data.referencedRepositories) {
				delete referencedRepository._localId
			}
			delete message.data.history.repository._localId
		}

		return {
			historiesToSend,
			messages
		}
	}

	async sendMessages(
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[],
		context: IContext
	): Promise<void> {
		const groupMessageMap = this.groupMessagesByRepository(
			messages, historiesToSend)

		for (const [repositoryGUID, messagesForRepository] of groupMessageMap) {
			const synchronizationAdapter = await this.synchronizationAdapterLoader.load(
				repositoryGUID)
			await synchronizationAdapter.sendTransactions(repositoryGUID,
				messagesForRepository)
		}

		await this.updateRepositoryTransactionHistories(
			messages, historiesToSend, context)
	}

	private async loadHistoryRepositories(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		context: IContext
	): Promise<Map<Repository_LocalId, IRepository>> {
		const repositoryIdsToLookup: Set<Repository_LocalId> = new Set()
		const repositoryMapById: Map<Repository_LocalId, IRepository> = new Map()

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryIdsToLookup.add(repositoryTransactionHistory.repository._localId)
		}

		if (!repositoryIdsToLookup.size) {
			return repositoryMapById
		}

		const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds([
			...repositoryIdsToLookup.values()
		], context)
		for (const repository of repositories) {
			repositoryMapById.set(repository._localId, repository)
		}
		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			repositoryTransactionHistory.repository =
				repositoryMapById.get(repositoryTransactionHistory.repository._localId)
		}

		return repositoryMapById
	}

	private async ensureGlobalRepositoryIdentifiers(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		messages: SyncRepositoryData[],
		context: IContext
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
		], context)
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

	private groupMessagesByRepository(
		messages: SyncRepositoryMessage[],
		historiesToSend: IRepositoryTransactionHistory[]
	): Map<Repository_GUID, SyncRepositoryMessage[]> {
		const groupMessageMap: Map<Repository_GUID, SyncRepositoryMessage[]>
			= new Map()

		for (let i = 0; i < messages.length; i++) {
			const repository = historiesToSend[i].repository
			this.datastructureUtils.ensureChildArray(
				groupMessageMap, repository.GUID).push(messages[i])
		}

		return groupMessageMap
	}

	private async updateRepositoryTransactionHistories(
		messages: SyncRepositoryMessage[],
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		context: IContext
	): Promise<void> {
		for (let i = 0; i < messages.length; i++) {
			const message = messages[i]
			const repositoryTransactionHistory = repositoryTransactionHistories[i]
			if (message.syncTimestamp) {
				repositoryTransactionHistory.syncTimestamp = message.syncTimestamp
				await this.repositoryTransactionHistoryDao.updateSyncTimestamp(
					repositoryTransactionHistory, context)
			}
		}
	}

}
