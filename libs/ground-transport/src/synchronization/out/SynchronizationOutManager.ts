import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	ensureChildArray,
	ensureChildJsMap
} from '@airport/ground-control'
import {
	IRepositoryTransactionHistory,
	Repository_Source,
	REPOSITORY_TRANSACTION_HISTORY_DAO,
	Repository_UuId
} from '@airport/holding-pattern'
import {
	SYNC_OUT_DATA_SERIALIZER,
	SYNCHRONIZATION_ADAPTER_LOADER,
	SYNCHRONIZATION_OUT_MANAGER
} from '../../tokens'

export interface ISynchronizationOutManager {

	synchronizeOut(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void>

}

export class SynchronizationOutManager
	implements ISynchronizationOutManager {

	async synchronizeOut(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void> {
		const [
			syncOutDataSerializer,
			synchronizationAdapterLoader
		] = await container(this).get(SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER)
		const messages = await syncOutDataSerializer.serialize(repositoryTransactionHistories)
		const groupMessageMap = this.groupMessagesBySourceAndRepository(messages)

		for (const [repositorySource, messageMapForSource] of groupMessageMap) {
			const synchronizationAdapter = await synchronizationAdapterLoader.load(repositorySource)
			await synchronizationAdapter.sendTransactions(repositorySource, messageMapForSource)
		}

		await this.updateRepositoryTransactionHistories(messages, repositoryTransactionHistories)
	}

	private groupMessagesBySourceAndRepository(
		messages: RepositorySynchronizationMessage[]
	): Map<Repository_Source, Map<Repository_UuId, RepositorySynchronizationMessage[]>> {
		const groupMessageMap: Map<Repository_Source, Map<Repository_UuId, RepositorySynchronizationMessage[]>>
			= new Map()

		for (const message of messages) {
			const repository = message.history.repository
			ensureChildArray(
				ensureChildJsMap(groupMessageMap, repository.source),
				repository.uuId).push(message)
		}

		return groupMessageMap
	}

	private async updateRepositoryTransactionHistories(
		messages: RepositorySynchronizationMessage[],
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void> {
		const repositoryTransactionHistoryDao = await container(this)
			.get(REPOSITORY_TRANSACTION_HISTORY_DAO)

		for (let i = 0; i < messages.length; i++) {
			const message = messages[i]
			const repositoryTransactionHistory = repositoryTransactionHistories[i]
			if (message.syncTimestamp) {
				repositoryTransactionHistory.syncTimestamp = message.syncTimestamp
				await repositoryTransactionHistoryDao.updateSyncTimestamp(repositoryTransactionHistory)
			}
		}
	}

}
DI.set(SYNCHRONIZATION_OUT_MANAGER, SynchronizationOutManager)
