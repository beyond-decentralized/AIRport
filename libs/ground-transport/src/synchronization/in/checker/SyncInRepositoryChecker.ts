import { TerminalMessage } from '@airport/arrivals-n-departures'
import { container, DI } from '@airport/di'
import {
	IRepository,
	REPOSITORY_DAO
} from '@airport/holding-pattern'
import { SYNC_IN_REPOSITORY_CHECKER } from '../../../tokens'

export interface ISyncInRepositoryChecker {

	ensureRepositories(
		message: TerminalMessage
	): Promise<boolean>;

}

export class SyncInRepositoryChecker
	implements ISyncInRepositoryChecker {

	async ensureRepositories(
		message: TerminalMessage
	): Promise<boolean> {
		try {
			const repositoryDao = await container(this).get(REPOSITORY_DAO)

			let repositoryUuids: string[] = []
			let messageRepositoryIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < message.referencedRepositories.length; i++) {
				this.checkRepository(
					message.referencedRepositories[i],
					i,
					repositoryUuids,
					messageRepositoryIndexMap,
					message
				)
			}
			if (typeof message.history.repository === 'string') {
				repositoryUuids.push(message.history.repository as any)
			} else {
				this.checkRepository(
					message.history.repository,
					null,
					repositoryUuids,
					messageRepositoryIndexMap,
					message
				)
			}

			const repositories = await repositoryDao.findByUuIds(repositoryUuids)
			for (const repository of repositories) {
				const messageUserIndex = messageRepositoryIndexMap.get(repository.uuId)
				if (messageUserIndex || messageUserIndex == 0) {
					message.referencedRepositories[messageUserIndex] = repository
				} else {
					message.history.repository = repository
				}
			}

			const missingRepositories = message.referencedRepositories
				.filter(messageActor => !messageActor.id)

			if (typeof message.history.repository !== 'object') {
				throw new Error(`Repository with UuId ${message.history.repository} is not
					present and cannot be synced`)
			} else if (!message.history.repository.id) {
				missingRepositories.push(message.history.repository)
			}

			if (missingRepositories.length) {
				await repositoryDao.insert(missingRepositories)
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
		repositoryUuids: string[],
		messageRepositoryIndexMap: Map<string, number>,
		message: TerminalMessage
	): void {
		if (typeof repository.ageSuitability !== 'number') {
			throw new Error(`Invalid 'repository.ageSuitability'`)
		}
		if (!repository.createdAt || typeof repository.createdAt !== 'number') {
			throw new Error(`Invalid 'repository.createdAt'`)
		}
		repository.createdAt = new Date(repository.createdAt as any)
		if (typeof repository.immutable !== 'boolean') {
			throw new Error(`Invalid 'repository.immutable'`)
		}
		if (!repository.source || typeof repository.source !== 'string') {
			throw new Error(`Invalid 'repository.source'`)
		}
		if (!repository.uuId || typeof repository.uuId !== 'string') {
			throw new Error(`Invalid 'repository.uuid'`)
		}
		if (typeof repository.ownerActor !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
				in 'repository.ownerActor'`)
		}
		const actor = message.actors[repository.ownerActor as any]
		if (!actor) {
			throw new Error(
				`Did not find repository.ownerActor with "in-message index" ${repository.ownerActor}`);
		}
		repository.ownerActor = actor

		repositoryUuids.push(repository.uuId)
		if (typeof repositoryIndex === 'number') {
			messageRepositoryIndexMap.set(repository.uuId, repositoryIndex)
		}
		// Make sure id field is not in the input
		delete repository.id
	}

}

DI.set(SYNC_IN_REPOSITORY_CHECKER, SyncInRepositoryChecker)
