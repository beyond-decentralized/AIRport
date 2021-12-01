import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	IRepositoryTransactionHistory,
	Repository_Source,
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
		// FIXME: in InsertManager (for inserts only) add OperationHistories for all
		// records referenced form other repositories (via @ManyToOne()s).  If
		// objects behind those relations are not provided, query for them
		// display a warning message about providing them
		const [
			syncOutDataSerializer,
			synchronizationAdapterLoader
		] = await container(this).get(SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER)
		const messages = syncOutDataSerializer.serialize(repositoryTransactionHistories)
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

		// TODO: group messages

		return groupMessageMap
	}

	private async updateRepositoryTransactionHistories(
		messages: RepositorySynchronizationMessage[],
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<void> {
		// TODO: copy over syncTimestamp (if present) and update only the histories that have it
	}

}
DI.set(SYNCHRONIZATION_OUT_MANAGER, SynchronizationOutManager)
