import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationData } from '@airport/arrivals-n-departures'
import {
	IRepositoryDao, RepositoryMemberDao
} from '@airport/holding-pattern/dist/app/bundle'
import { IRepository, IRepositoryMember, IRepositoryTransactionHistory, RepositoryMember_GUID, RepositoryMember_PublicSigningKey, RepositoryMember_Status } from '@airport/ground-control';

export interface IRepositoriesAndMembersCheckResult
	extends INewAndUpdatedRepositorieAndRecords {
	isValid: boolean
	publicSigningKey?: RepositoryMember_PublicSigningKey
}

export interface INewAndUpdatedRepositorieAndRecords {
	missingRepositories?: IRepository[]
	newMembers?: IRepositoryMember[]
	updatedMembers?: IRepositoryMember[]
}

export interface ISyncInRepositoryChecker {

	checkRepositoriesAndMembers(
		data: RepositorySynchronizationData
	): Promise<IRepositoriesAndMembersCheckResult>;

}

@Injected()
export class SyncInRepositoryChecker
	implements ISyncInRepositoryChecker {

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	async checkRepositoriesAndMembers(
		data: RepositorySynchronizationData
	): Promise<IRepositoriesAndMembersCheckResult> {
		let missingRepositories: IRepository[] = []
		let newMembers: IRepositoryMember[] = []
		let updatedMembers: IRepositoryMember[] = []
		let publicSigningKey: RepositoryMember_PublicSigningKey

		try {
			let repositoryGUIDs: string[] = []
			let messageRepositoryIndexMap: Map<string, number> = new Map()
			for (let i = 0; i < data.referencedRepositories.length; i++) {
				this.checkRepository(
					data.referencedRepositories[i],
					i,
					repositoryGUIDs,
					messageRepositoryIndexMap,
					data
				)
			}
			const history = data.history
			if (typeof history !== 'object') {
				throw new Error(`message.history is not an object`)
			}
			let repository = history.repository
			const repositoryErrorPrefix = `Serialized RepositorySynchronizationData.history.repository should be`
			const isRepositoryCreationEqualityErrorPrefix = `if RepositorySynchronizationData.history.isRepositoryCreation ===`
			if (history.isRepositoryCreation) {
				if (typeof repository !== 'object') {
					throw new Error(`${repositoryErrorPrefix} an object
	${isRepositoryCreationEqualityErrorPrefix} === true`)
				}
				this.checkRepository(
					repository,
					null,
					repositoryGUIDs,
					messageRepositoryIndexMap,
					data
				)
			} else {
				if (typeof repository !== 'string') {
					throw new Error(`${repositoryErrorPrefix} a string
	i${isRepositoryCreationEqualityErrorPrefix} === false`)
				}
				repositoryGUIDs.push(repository as any)
			}

			const repositories = await this.repositoryDao.findByGUIDs(repositoryGUIDs)
			for (const foundRepository of repositories) {
				const messageRepositoryIndex = messageRepositoryIndexMap.get(foundRepository.GUID)
				if (messageRepositoryIndex || messageRepositoryIndex === 0) {
					data.referencedRepositories[messageRepositoryIndex] = foundRepository
				} else {
					if (history.isRepositoryCreation) {
						if (foundRepository.GUID === repository.GUID) {
							throw new Error(`Repository ${foundRepository.GUID} is already created.`)
						}
						throw new Error(`Unexpected Repository ${foundRepository.GUID}`)
					} else {
						if (foundRepository.GUID !== repository as any) {
							throw new Error(`Unexpected Repository ${foundRepository.GUID}`)
						}
						// Populating ahead of potential insert is OK, object
						// gets modified with required state on an insert
						history.repository = repository = foundRepository
					}
				}
			}

			missingRepositories = data.referencedRepositories
				.filter(messageRepository => !messageRepository._localId)

			if (typeof repository !== 'object') {
				throw new Error(`Repository with GUID ${repository} is not
					present and cannot be synced
	This RepositorySynchronizationData is for an existing repository and that
	repository must already be loaded in this database for this message to be
	processed.`)
			} else if (!repository._localId) {
				missingRepositories.push(repository)
			}

			const memberCheckResult = await this.checkRepositoryMembers(data)
			publicSigningKey = memberCheckResult.publicSigningKey
			newMembers = memberCheckResult.newMembers
			updatedMembers = memberCheckResult.updatedMembers
		} catch (e) {
			console.error(e)
			return {
				isValid: false
			}
		}

		return {
			isValid: true,
			missingRepositories,
			newMembers,
			publicSigningKey,
			updatedMembers
		}
	}

	private async checkRepositoryMembers(
		data: RepositorySynchronizationData
	): Promise<{
		newMembers: IRepositoryMember[],
		publicSigningKey: RepositoryMember_PublicSigningKey,
		updatedMembers: IRepositoryMember[]
	}> {
		const newMembers: IRepositoryMember[] = []
		const updatedMembers: IRepositoryMember[] = []
		let publicSigningKey: RepositoryMember_PublicSigningKey

		const history = data.history
		const repository = history.repository

		const updatedRepositoryMembersErrorPrefix = `history.updatedRepositoryMembers`
		if (!(history.updatedRepositoryMembers instanceof Array)) {
			throw new Error(`${updatedRepositoryMembersErrorPrefix} is not an Array`)
		}
		let memberPath = 'repository.member'
		if (history.isRepositoryCreation) {
			this.checkAddedRepositoryMember(history.member, repository, data)
			if (history.updatedRepositoryMembers.length) {
				throw new Error(`No ${updatedRepositoryMembersErrorPrefix} on newly created Repository`)
			}
		} else {
			this.checkRepositoryMemberCommonFields(history.member, memberPath)
		}

		if (!(history.newRepositoryMembers instanceof Array)) {
			throw new Error(`history.newRepositoryMembers is not an Array`)
		}
		this.checkNewRepositoryMembers(history.newRepositoryMembers, data, history.isRepositoryCreation)

		let allowInvitedStatus = true
		let allowJoinedStatus = false
		if (repository.isPublic) {
			allowInvitedStatus = false
		}
		this.checkRepositoryMemberUpdateFields(history.updatedRepositoryMembers,
			'updatedRepositoryMembers', allowInvitedStatus, allowJoinedStatus, true)

		const inMessageRepositoryMemberMapByGUID = await this.getInMessageRepositoryMemberMapByGUID(history)

		publicSigningKey = this.checkHistoryMemberExistence(data, inMessageRepositoryMemberMapByGUID, newMembers)
		this.checkNewRepositoryMembersExistence(data, inMessageRepositoryMemberMapByGUID, newMembers)
		const updatedRepositoryMembersExistenceCheckResult = this.checkUpdatedRepositoryMembersExistence(
			data, inMessageRepositoryMemberMapByGUID, updatedMembers)
		if (updatedRepositoryMembersExistenceCheckResult.isJoinMessage) {
			publicSigningKey = updatedRepositoryMembersExistenceCheckResult.publicSigningKey
		}

		return {
			newMembers,
			publicSigningKey,
			updatedMembers
		}
	}

	private async getInMessageRepositoryMemberMapByGUID(
		history: IRepositoryTransactionHistory
	): Promise<Map<RepositoryMember_GUID, IRepositoryMember>> {
		const messageRepositoryMemberGUIDs: RepositoryMember_GUID[] = [
			history.member,
			...history.newRepositoryMembers,
			...history.updatedRepositoryMembers
		].map(member => member.GUID)

		const existingMessageRepositoryMembers = await this.repositoryMemberDao
			.findByGUIDs(messageRepositoryMemberGUIDs)
		if (history.isRepositoryCreation) {
			if (existingMessageRepositoryMembers.length) {
				throw new Error(`Found existing repositoryMembers for a newly created repository`)
			}
		}
		const inMessageRepositoryMemberMapByGUID: Map<RepositoryMember_GUID, IRepositoryMember>
			= new Map()
		for (const existingRepositoryMember of existingMessageRepositoryMembers) {
			inMessageRepositoryMemberMapByGUID.set(existingRepositoryMember.GUID, existingRepositoryMember)
		}

		return inMessageRepositoryMemberMapByGUID
	}

	private checkUpdatedRepositoryMembersExistence(
		data: RepositorySynchronizationData,
		inMessageRepositoryMemberMapByGUID: Map<RepositoryMember_GUID, IRepositoryMember>,
		updatedMembers: IRepositoryMember[]
	): {
		isJoinMessage: boolean,
		publicSigningKey: RepositoryMember_PublicSigningKey
	} {
		let isJoinMessage = false
		let publicSigningKey = null

		const history = data.history

		let hasJoinedMember = false

		for (const updatedRepositoryMember of history.updatedRepositoryMembers) {
			const existingMember = inMessageRepositoryMemberMapByGUID.get(updatedRepositoryMember.GUID)
			if (!existingMember) {
				throw new Error(`message.history.updatedRepositoryMembers[x] with GUID ${updatedRepositoryMember.GUID}' does not exist`)
			}
			switch (updatedRepositoryMember.status) {
				case RepositoryMember_Status.JOINED:
					if (hasJoinedMember) {
						throw new Error(`Only one member can join per sync message.`)
					}
					hasJoinedMember = true

					if (updatedRepositoryMember.GUID !== history.member.GUID) {
						throw new Error(`Joined member must be the member sending the message.`)
					}

					publicSigningKey = updatedRepositoryMember.publicSigningKey
					if (existingMember.publicSigningKey && existingMember.publicSigningKey !== publicSigningKey) {
						throw new Error(`Users are not allowed to change their publicSigningKey for a repository.`)
					}
					isJoinMessage = true
					existingMember.publicSigningKey = publicSigningKey
					break;
				default:
					throw new Error(`Invalid message.history.updatedRepositoryMembers[x].status '${updatedRepositoryMember.status}'`)
			}
			// NOTE: No updates are needed, currently the only supported operation is
			// JOINING the repository, which just happens one time and sets the
			// publicSignKey
			updatedMembers.push(existingMember)
		}

		return {
			isJoinMessage,
			publicSigningKey
		}
	}

	private checkNewRepositoryMembersExistence(
		data: RepositorySynchronizationData,
		inMessageRepositoryMemberMapByGUID: Map<RepositoryMember_GUID, IRepositoryMember>,
		newMembers: IRepositoryMember[]
	) {
		const history = data.history
		const repository = history.repository

		for (const newRepositoryMember of history.newRepositoryMembers) {
			if (!inMessageRepositoryMemberMapByGUID.has(newRepositoryMember.GUID)) {
				throw new Error(`message.history.newRepositoryMembers[x] with GUID ${newRepositoryMember.GUID}' already exists`)
			}
			const userAccount = data.userAccounts[history.member.userAccount as any]
			if (!userAccount) {
				throw new Error(`message.history.newRepositoryMembers[x].userAccount not found`)
			}
			newMembers.push({
				_localId: null,
				canWrite: newRepositoryMember.canWrite,
				GUID: newRepositoryMember.GUID,
				isAdministrator: newRepositoryMember.isAdministrator,
				isOwner: false,
				publicSigningKey: newRepositoryMember.publicSigningKey,
				repository,
				status: newRepositoryMember.status,
				userAccount: newRepositoryMember.userAccount
			})
		}
	}

	private checkHistoryMemberExistence(
		data: RepositorySynchronizationData,
		inMessageRepositoryMemberMapByGUID: Map<RepositoryMember_GUID, IRepositoryMember>,
		newMembers: IRepositoryMember[]
	): RepositoryMember_PublicSigningKey {
		let publicSigningKey: RepositoryMember_PublicSigningKey

		const history = data.history
		const repository = history.repository

		const historyMemberErrorPrefix = `message.history.member with GUID '${history.member.GUID}'`
		if (history.isRepositoryCreation) {
			if (inMessageRepositoryMemberMapByGUID.has(history.member.GUID)) {
				throw new Error(`${historyMemberErrorPrefix} already exits.
	This repository (GUID: ${repository.GUID}) is being created and cannot have existing members.`)
			}
			const userAccount = data.userAccounts[history.member.userAccount as any]
			if (!userAccount) {
				throw new Error(`message.history.member.userAccount not found`)
			}
			if (history.actor.userAccount.GUID !== userAccount.GUID) {
				throw new Error(`message.history.actor.userAccount.GUID does not match message.history.member.userAccount.GUID`)
			}
			publicSigningKey = history.member.publicSigningKey
			history.member = {
				_localId: null,
				canWrite: true,
				GUID: history.member.GUID,
				isOwner: true,
				isAdministrator: true,
				publicSigningKey: history.member.publicSigningKey,
				repository,
				status: RepositoryMember_Status.JOINED,
				userAccount
			}
			newMembers.push(history.member)
		} else {
			const existingHistoryMember = inMessageRepositoryMemberMapByGUID.get(history.member.GUID)
			if (!existingHistoryMember) {
				throw new Error(`${historyMemberErrorPrefix} does not exit.
	This repository (GUID: ${repository.GUID}) already exists and an existing member must be making the modifications`)
			}
			if (!existingHistoryMember.canWrite) {
				throw new Error(`${historyMemberErrorPrefix} is being written to by a member that has no write permissions.`)
			}
			publicSigningKey = existingHistoryMember.publicSigningKey
			history.member = existingHistoryMember
		}

		return publicSigningKey
	}

	private checkRepository(
		repository: IRepository,
		repositoryIndex: number,
		repositoryGUIDs: string[],
		messageRepositoryIndexMap: Map<string, number>,
		message: RepositorySynchronizationData
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
		if (typeof repository.isPublic !== 'boolean') {
			throw new Error(`Invalid 'repository.isPublic'`)
		}
		if (typeof repository.areDependenciesLoaded !== 'undefined') {
			throw new Error(`Invalid 'repository.areDependenciesLoaded' is a local-only field`)
		}
		const userAccount = message.userAccounts[repository.owner as any]
		if (!userAccount) {
			throw new Error(
				`Did not find repository.owner (UserAccount) with "in-message index" ${repository.owner}`);
		}
		repository.owner = userAccount

		repositoryGUIDs.push(repository.GUID)
		if (typeof repositoryIndex === 'number') {
			messageRepositoryIndexMap.set(repository.GUID, repositoryIndex)
		}
		// Make sure id field is not in the input
		delete repository._localId
	}

	private checkRepositoryMemberCommonFields(
		repositoryMember: IRepositoryMember,
		repositoryMessagePath: string,
	): void {
		if (typeof repositoryMember !== 'object') {
			throw new Error(`${repositoryMessagePath} is not an object`)
		}
		if (typeof repositoryMember.GUID !== 'string') {
			throw new Error(`${repositoryMessagePath}.GUID is not a string`)
		}
		if (repositoryMember.GUID.length !== 36) {
			throw new Error(`${repositoryMessagePath}.GUID does not have .length === 36`)
		}

		delete repositoryMember._localId
	}

	private checkAddedRepositoryMember(
		repositoryMember: IRepositoryMember,
		repository: IRepository,
		message: RepositorySynchronizationData
	): void {
		let errorPrefix = `repository.member`
		this.checkRepositoryMemberCommonFields(repositoryMember, errorPrefix)
		if (typeof repositoryMember.userAccount !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
				in '${errorPrefix}.userAccount'`)
		}
		const userAccount = message.userAccounts[repositoryMember.userAccount as any]
		if (userAccount !== repository.owner) {
			throw new Error(`Expecting the same UserAccount in repository.owner & repository.member.userAccount`)
		}
		this.checkRepositoryMemberPublicSigningKey(
			repositoryMember,
			false,
			errorPrefix
		)
	}

	private checkRepositoryMemberUpdateFields(
		repositoryMembers: IRepositoryMember[],
		repositoryMembersType: string,
		allowInvitedStatus: boolean,
		allowJoinedStatus: boolean,
		expectingPublicSigningKey: boolean
	): void {
		let errorPrefix = `repository.${repositoryMembersType}`
		for (const repositoryMember of repositoryMembers) {
			switch (repositoryMember.status) {
				case RepositoryMember_Status.INVITED:
					if (!allowInvitedStatus) {
						throw new Error(`${errorPrefix}.status: RepositoryMember_Status.INVITED is not allowed in ${repositoryMembersType}`)
					}
					break;
				case RepositoryMember_Status.JOINED:
					if (!allowJoinedStatus) {
						throw new Error(`${errorPrefix}.status RepositoryMember_Status.JOINED is not allowed in ${repositoryMembersType}`)
					}
					break;
				default:
					throw new Error(`${errorPrefix}.status is not a RepositoryMember_Status`)
			}
			this.checkRepositoryMemberCommonFields(repositoryMember, errorPrefix)
			this.checkRepositoryMemberPublicSigningKey(
				repositoryMember,
				expectingPublicSigningKey,
				errorPrefix
			)
		}
	}

	private checkRepositoryMemberPublicSigningKey(
		repositoryMember: IRepositoryMember,
		expectingPublicSigningKey: boolean,
		errorPrefix: string
	): void {
		if (expectingPublicSigningKey) {
			if (typeof repositoryMember.publicSigningKey !== 'string') {
				throw new Error(`${errorPrefix}.publicSigningKey is not a string`)
			}
			// FIXME: get the right length of a publicSigningKey
			if (repositoryMember.publicSigningKey.length !== 36) {
				throw new Error(`${errorPrefix}.publicSigningKey does not have .length === 36`)
			}
		} else {
			if (typeof repositoryMember.publicSigningKey !== 'undefined') {
				throw new Error(`${errorPrefix}.publicSigningKey is defined (but is not allowed)`)
			}
		}
	}

	private checkNewRepositoryMembers(
		repositoryMembers: IRepositoryMember[],
		data: RepositorySynchronizationData,
		isRepositoryCreation: boolean
	): void {
		const isPublicRepository = data.history.repository.isPublic ? true : false
		const allowInvitedStatus = !isRepositoryCreation && !isPublicRepository
		const allowJoinedStatus = isRepositoryCreation || isPublicRepository
		const expectingPublicSigningKey = allowJoinedStatus
		this.checkRepositoryMemberUpdateFields(
			repositoryMembers,
			`newRepositoryMembers of a ${isPublicRepository ? 'public' : 'private'} Repository`,
			allowInvitedStatus,
			allowJoinedStatus,
			expectingPublicSigningKey
		)
		if (isRepositoryCreation) {
			if (repositoryMembers.length !== 1) {
				throw new Error(`Expecting exactly 1 record in data.history.newRepositoryMembers for a newly created Repository`)
			}
		}
		let errorPrefix = `repository.newRepositoryMembers[x]`
		for (const repositoryMember of repositoryMembers) {
			if (typeof repositoryMember.isOwner !== 'boolean') {
				throw new Error(`${errorPrefix}.isOwner is not a boolean`)
			}
			if (typeof repositoryMember.isAdministrator !== 'boolean') {
				throw new Error(`${errorPrefix}.isAdministrator is not a boolean`)
			}
			if (typeof repositoryMember.canWrite !== 'boolean') {
				throw new Error(`${errorPrefix}.canWrite is not a boolean`)
			}
			if (typeof repositoryMember.userAccount !== 'number') {
				throw new Error(`${errorPrefix}.userAccount is not an In-Message User Id (a number)`)
			}
			const userAccount = data.userAccounts[repositoryMember.userAccount as any]
			if (!userAccount) {
				throw new Error(`message.newRepositoryMembers[x] with GUID ${repositoryMember.GUID} does not have a valid userAccount`)
			}
		}
	}

}
