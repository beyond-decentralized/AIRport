import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IRepository,
	IRepositoryDao
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index'

export interface ISyncInRepositoryChecker {

	ensureRepositories(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean>;

}

@Injected()
export class SyncInRepositoryChecker
	implements ISyncInRepositoryChecker {

	@Inject()
	repositoryDao: IRepositoryDao

	async ensureRepositories(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<boolean> {
		try {
			let repositoryGUIDs: string[] = []
			let messageRepositoryIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.referencedRepositories.length; i++) {
				this.checkRepository(
					message.referencedRepositories[i],
					i,
					repositoryGUIDs,
					messageRepositoryIndexMap,
					message
				)
			}
			const history = message.history
			if (history.isRepositoryCreation) {
				if (typeof history.repository !== 'object') {
					throw new Error(`Serialized RepositorySynchronizationMessage.history.repository should be an object
	if RepositorySynchronizationMessage.history.isRepositoryCreation === true`)
				}
				this.checkRepository(
					history.repository,
					null,
					repositoryGUIDs,
					messageRepositoryIndexMap,
					message
				)
			} else {
				if (typeof history.repository !== 'string') {
					throw new Error(`Serialized RepositorySynchronizationMessage.history.repository should be a string
	if RepositorySynchronizationMessage.history.isRepositoryCreation === false`)
				}
				repositoryGUIDs.push(history.repository as any)
			}

			const repositories = await this.repositoryDao.findByGUIDs(repositoryGUIDs)
			for (const repository of repositories) {
				const messageUserIndex = messageRepositoryIndexMap.get(repository.GUID)
				if (messageUserIndex || messageUserIndex === 0) {
					message.referencedRepositories[messageUserIndex] = repository
				} else {
					// Populating ahead of potential insert is OK, object
					// gets modified with required state on an insert
					history.repository = repository
				}
			}

			const missingRepositories = message.referencedRepositories
				.filter(messageRepository => !messageRepository._localId)

			if (typeof history.repository !== 'object') {
				throw new Error(`Repository with UuId ${history.repository} is not
					present and cannot be synced
	This RepositorySynchronizationMessage is for an existing repository and that
	repository must already be loaded in this database for this message to be
	processed.`)
			} else if (!history.repository._localId) {
				missingRepositories.push(history.repository)
			}

			if (missingRepositories.length) {
				await this.repositoryDao.insert(missingRepositories, context)
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private checkRepository(
		repository: IRepository,
		repositoryIndex: number,
		repositoryGUIDs: string[],
		messageRepositoryIndexMap: Map<string, number>,
		message: RepositorySynchronizationMessage
	): void {
		if (typeof repository.ageSuitability !== 'number') {
			throw new Error(`Invalid 'repository.ageSuitability'`)
		}
		if (!repository.createdAt || typeof repository.createdAt !== 'string') {
			throw new Error(`Invalid 'repository.createdAt'`)
		}
		repository.createdAt = new Date(repository.createdAt as any)
		if (typeof repository.immutable !== 'boolean') {
			throw new Error(`Invalid 'repository.immutable'`)
		}
		if (!repository.source || typeof repository.source !== 'string') {
			throw new Error(`Invalid 'repository.source'`)
		}
		if (typeof repository.GUID !== 'string' || repository.GUID.length !== 36) {
			throw new Error(`Invalid 'repository.GUID'`)
		}
		if (typeof repository.owner !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
				in 'repository.owner'`)
		}
		const user = message.users[repository.owner as any]
		if (!user) {
			throw new Error(
				`Did not find repository.owner (User) with "in-message index" ${repository.owner}`);
		}
		repository.owner = user

		repositoryGUIDs.push(repository.GUID)
		if (typeof repositoryIndex === 'number') {
			messageRepositoryIndexMap.set(repository.GUID, repositoryIndex)
		}
		// Make sure id field is not in the input
		delete repository._localId
	}

}
