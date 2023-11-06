import {
	IMessageSigningManager
} from '@airbridge/keyring/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IDatastructureUtils, IRepository, IRepositoryTransactionHistory, SyncRepositoryMessage, Repository_GUID, Repository_LocalId
} from '@airport/ground-control'
import {
	IRepositoryTransactionHistoryDao
} from '@airport/holding-pattern/dist/app/bundle'
import { ISynchronizationAdapterLoader } from '../../adapters/SynchronizationAdapterLoader'
import { RepositoryReferenceCreator } from '../RepositoryReferenceCreator'
import { ISyncOutDataSerializer } from './converter/SyncOutDataSerializer'

export interface ISynchronizationOutManager {

	getSynchronizationMessages(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapByLid: Map<Repository_LocalId, IRepository>,
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
	repositoryReferenceCreator: RepositoryReferenceCreator

	@Inject()
	repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao

	@Inject()
	synchronizationAdapterLoader: ISynchronizationAdapterLoader

	@Inject()
	syncOutDataSerializer: ISyncOutDataSerializer

	async getSynchronizationMessages(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapByLid: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[]
	}> {
		const {
			historiesToSend,
			messages
		} = await this.syncOutDataSerializer.serialize(
			repositoryTransactionHistories, repositoryMapByLid, context)
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
