import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IRepositoryDao, RepositoryMemberDao
} from '@airport/holding-pattern/dist/app/bundle'
import { InMessageIndex, IRepository, IRepositoryMember, IRepositoryMemberAcceptance, IRepositoryMemberInvitation, RepositoryMemberInvitation_PublicSigningKey, RepositoryMember_PublicSigningKey, RepositoryMember_Signature, RepositoryMember_Status, SyncRepositoryData, SyncRepositoryMessage, Repository_GUID, Repository_LocalId, UserAccount_Signature, Dictionary, IDatastructureUtils } from '@airport/ground-control';
import { UserAccount_PublicSigningKey } from '@airport/aviation-communication';

export interface IRepositoriesAndMembersCheckResult
	extends INewAndUpdatedRepositoriesAndRecords {
	isValid: boolean
	signatureChecks?: ISignatureCheck[]
}

export interface INewAndUpdatedRepositoriesAndRecords {
	missingRepositories?: IRepository[]
	newMembers?: IRepositoryMember[]
	newRepositoryMemberInvitations?: IRepositoryMemberInvitation[]
	newRepositoryMemberAcceptances?: IRepositoryMemberAcceptance[]
}

export interface ISignatureCheck {
	publicSigningKey: RepositoryMember_PublicSigningKey | RepositoryMemberInvitation_PublicSigningKey | UserAccount_PublicSigningKey
	signatureName: string
	signatureToCheck: RepositoryMember_Signature | RepositoryMemberInvitation_PublicSigningKey | UserAccount_Signature
}

export interface ISyncInRepositoryChecker {

	checkRepositoriesAndMembers(
		message: SyncRepositoryMessage,
		addedRepositoryMapByGUID: Map<Repository_GUID, IRepository>,
		addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey: Map<Repository_GUID, Map<RepositoryMember_PublicSigningKey, IRepositoryMember>>,
		context: IContext
	): Promise<IRepositoriesAndMembersCheckResult>;

}

@Injected()
export class SyncInRepositoryChecker
	implements ISyncInRepositoryChecker {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	async checkRepositoriesAndMembers(
		message: SyncRepositoryMessage,
		addedRepositoryMapByGUID: Map<Repository_GUID, IRepository>,
		addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey: Map<Repository_GUID, Map<RepositoryMember_PublicSigningKey, IRepositoryMember>>,
		context: IContext
	): Promise<IRepositoriesAndMembersCheckResult> {
		let missingRepositories: IRepository[] = []
		let newMembers: IRepositoryMember[] = []
		let newRepositoryMemberAcceptances: IRepositoryMemberAcceptance[] = []
		let newRepositoryMemberInvitations: IRepositoryMemberInvitation[] = []
		let signatureChecks: ISignatureCheck[] = []
		let repositoryAddedInAnEarlierIncomingMessage = false
		let repositoryGUID: Repository_GUID

		try {
			const data = message.data
			let repositoryGUIDs: Repository_GUID[] = []
			let messageRepositoryIndexMap: Map<Repository_GUID, number> = new Map()
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
				throw new Error(`message.data.history is not an object`)
			}
			let historyRepository = history.repository
			const repositoryErrorPrefix = `Serialized SyncRepositoryData.history.repository should be`
			const isRepositoryCreationEqualityErrorPrefix = `if SyncRepositoryData.history.isRepositoryCreation ===`
			if (history.isRepositoryCreation) {
				if (typeof historyRepository !== 'object') {
					throw new Error(`${repositoryErrorPrefix} an object
	${isRepositoryCreationEqualityErrorPrefix} === true`)
				}
				this.checkRepository(
					historyRepository,
					null,
					repositoryGUIDs,
					messageRepositoryIndexMap,
					data
				)
				repositoryGUID = historyRepository.GUID
				addedRepositoryMapByGUID.set(repositoryGUID, historyRepository)
			} else {
				if (typeof historyRepository !== 'string' || (historyRepository as any).length !== 45) {
					throw new Error(`${repositoryErrorPrefix} a string GUID
	${isRepositoryCreationEqualityErrorPrefix} === false`)
				}
				repositoryGUID = historyRepository
				const repositoryAddedInPreviousMessage = addedRepositoryMapByGUID.get(historyRepository)
				if (repositoryAddedInPreviousMessage) {
					repositoryAddedInAnEarlierIncomingMessage = true
					history.repository = historyRepository = repositoryAddedInPreviousMessage
				} else {
					repositoryGUIDs.push(historyRepository)
				}
			}

			const foundRepositories = await this.repositoryDao.findByGUIDs(
				repositoryGUIDs, context)
			for (const foundRepository of foundRepositories) {
				const messageRepositoryIndex = messageRepositoryIndexMap.get(foundRepository.GUID)
				if (messageRepositoryIndex || messageRepositoryIndex === 0) {
					data.referencedRepositories[messageRepositoryIndex] = foundRepository
				} else {
					if (history.isRepositoryCreation) {
						if (foundRepository.GUID === historyRepository.GUID) {
							throw new Error(`Repository ${foundRepository.GUID} is already created.`)
						}
						throw new Error(`Unexpected Repository ${foundRepository.GUID}`)
					} else {
						if (foundRepository.GUID !== historyRepository as any) {
							throw new Error(`Unexpected Repository ${foundRepository.GUID}`)
						}
						// Populating ahead of potential insert is OK, object
						// gets modified with required state on an insert
						history.repository = historyRepository = foundRepository
					}
				}
			}

			for (const [repositoryGUID, repository] of addedRepositoryMapByGUID) {
				const messageRepositoryIndex = messageRepositoryIndexMap.get(repositoryGUID)
				if (messageRepositoryIndex || messageRepositoryIndex === 0) {
					data.referencedRepositories[messageRepositoryIndex] = repository
				}
			}

			missingRepositories = data.referencedRepositories
				.filter(referencedRepository => {
					if (referencedRepository._localId) {
						return false
					} else {
						// Only the repository reference is loaded
						referencedRepository.isLoaded = false

						return true
					}
				})

			if (typeof historyRepository !== 'object') {
				throw new Error(`Repository with GUID ${historyRepository} is not
	present and cannot be synced
	This SyncRepositoryData is for an existing repository and that
	repository must already be loaded in this database for this message to be
	processed.`)
			} else {
				if (!historyRepository._localId) {
					missingRepositories.push(historyRepository)
				}
			}

			const addedRepositoryMembersByPublicSigningKey = this.datastructureUtils
				.ensureChildJsMap(addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey,
					repositoryGUID)
			addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey
			const memberCheckResult = await this.checkRepositoryMembers(message,
				historyRepository, repositoryAddedInAnEarlierIncomingMessage,
				addedRepositoryMembersByPublicSigningKey, context)
			signatureChecks = memberCheckResult.signatureChecks
			newMembers = memberCheckResult.newMembers
			if (memberCheckResult.newRepositoryMemberAcceptance) {
				newRepositoryMemberAcceptances = [memberCheckResult.newRepositoryMemberAcceptance]
			}
			if (memberCheckResult.newRepositoryMemberInvitations) {
				newRepositoryMemberInvitations = memberCheckResult.newRepositoryMemberInvitations
			}
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
			newRepositoryMemberAcceptances,
			newRepositoryMemberInvitations,
			signatureChecks
		}
	}

	private async checkRepositoryMembers(
		message: SyncRepositoryMessage,
		historyRepository: IRepository,
		repositoryAddedInAnEarlierIncomingMessage: boolean,
		addedRepositoryMembersByPublicSigningKey: Map<RepositoryMember_PublicSigningKey, IRepositoryMember>,
		context: IContext
	): Promise<{
		newMembers: IRepositoryMember[]
		newRepositoryMemberAcceptance: IRepositoryMemberAcceptance
		newRepositoryMemberInvitations: IRepositoryMemberInvitation[]
		signatureChecks?: ISignatureCheck[]
	}> {
		const data = message.data
		const inMessageRepositoryMemberMapByPublicSigningKey = this
			.getInMessageRepositoryMemberMap(data)

		const newMembers: IRepositoryMember[] = []
		const repositoryMember = await this.getRepositoryMember(
			data, historyRepository,
			repositoryAddedInAnEarlierIncomingMessage,
			addedRepositoryMembersByPublicSigningKey,
			inMessageRepositoryMemberMapByPublicSigningKey, newMembers, context)

		const newRepositoryMemberAcceptance = this
			.isNewRepositoryMemberAcceptanceMessage(data, repositoryMember)
		const isNewRepositoryMemberAcceptanceMessage = !!newRepositoryMemberAcceptance

		const newRepositoryMemberInvitations = this
			.getNewRepositoryMemberInvitations(
				data, repositoryMember, newMembers)

		await this.checkRepositoryMemberUserAccounts(data,
			isNewRepositoryMemberAcceptanceMessage,
			!!newRepositoryMemberInvitations.length)

		const signatureChecks = this.getPublicSigningKeysAndSignatureToCheck(
			message, isNewRepositoryMemberAcceptanceMessage)

		data.history.newRepositoryMembers = []
		data.history.newRepositoryMemberAcceptances = []
		data.history.newRepositoryMemberInvitations = []
		data.history.newRepositoryMemberUpdates = []

		// TODO: Add a newPublicRepositoryMember property to history and check it

		return {
			newMembers,
			newRepositoryMemberAcceptance,
			newRepositoryMemberInvitations,
			signatureChecks
		}
	}

	private async checkRepositoryMemberUserAccounts(
		data: SyncRepositoryData,
		isNewRepositoryMemberAcceptanceMessage: boolean,
		isNewRepositoryMemberInvitationMessage: boolean
	): Promise<void> {
		const history = data.history

		for (let i = 0; i < data.repositoryMembers.length; i++) {
			const repositoryMember = data.repositoryMembers[i]
			if (repositoryMember.userAccount
				|| repositoryMember.userAccount === 0 as any) {
				const userAccount = data.userAccounts[history.member.userAccount as any]
				if (!userAccount) {
					throw new Error(`UserAccount with index ${repositoryMember.userAccount} referenced in
message.data.repositoryMembers[${i}].userAccount does not exist in the message`)
				}
				repositoryMember.userAccount = userAccount
			}
		}

		if (!history.member.userAccount) {
			throw new Error(`UserAccount with index ${history.member.userAccount} referenced in
message.data.history.member.userAccount does not exist in the message`)
		}

		if (isNewRepositoryMemberInvitationMessage) {
			for (let i = 0; i < history.newRepositoryMemberInvitations.length; i++) {
				const newRepositoryMemberInvitation = history.newRepositoryMemberInvitations[i]
				if (newRepositoryMemberInvitation.invitedRepositoryMember.userAccount) {
					throw new Error(`message.data.history.newRepositoryMemberInvitations[${i}] has a specified
specifies .invitedRepositoryMember.userAccount
Invited repository members cannot have a UserAccount specified`)
				}
			}
		}

		if (isNewRepositoryMemberAcceptanceMessage) {
			if (!history.newRepositoryMemberAcceptances[0].acceptingRepositoryMember.userAccount) {
				throw new Error(`message.data.history.newRepositoryMemberAcceptances[0] must have
a acceptingRepositoryMember.userAccount specified.`)
			}
		}
	}

	private isNewRepositoryMemberAcceptanceMessage(
		data: SyncRepositoryData,
		repositoryMember: IRepositoryMember
	): IRepositoryMemberAcceptance {
		const history = data.history

		const newRepositoryMemberAcceptancesErrorPrefix = `history.newRepositoryMemberAcceptances`
		const newRepositoryMemberAcceptances = history.newRepositoryMemberAcceptances

		if (!(newRepositoryMemberAcceptances instanceof Array)) {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix} is not an Array`)
		}

		if (!newRepositoryMemberAcceptances.length) {
			return null
		}

		if (history.repository.isPublic) {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix} are NOT allowed on a public Repository`)
		}

		if (history.isRepositoryCreation) {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix} are NOT allowed on a newly created Repository`)
		}

		if (newRepositoryMemberAcceptances.length > 1) {
			throw new Error(`Cannot have more than one  ${newRepositoryMemberAcceptancesErrorPrefix} at a time.`)
		}

		const newRepositoryMemberAcceptance = newRepositoryMemberAcceptances[0]

		if (typeof newRepositoryMemberAcceptance !== 'object') {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix}[0] is not an object`)
		}

		if (typeof newRepositoryMemberAcceptance.createdAt !== 'number') {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix}[0].createdAt is not a number`)
		}

		newRepositoryMemberAcceptance.createdAt = new Date(newRepositoryMemberAcceptance.createdAt)

		if (typeof newRepositoryMemberAcceptance.acceptingRepositoryMember !== 'number') {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix}[0].acceptingRepositoryMember is not a number`)
		}

		this.checkPublicSigningKey(
			newRepositoryMemberAcceptance.invitationPublicSigningKey,
			`${newRepositoryMemberAcceptancesErrorPrefix}[0].invitationPublicSigningKey`
		)

		const acceptingRepositoryMember = data.repositoryMembers[newRepositoryMemberAcceptance.acceptingRepositoryMember]

		if (acceptingRepositoryMember.memberPublicSigningKey !== repositoryMember.memberPublicSigningKey) {
			throw new Error(`${newRepositoryMemberAcceptancesErrorPrefix}[0] must be an existing RepositoryMember`)
		}

		if (acceptingRepositoryMember.status !== RepositoryMember_Status.JOINED) {
			throw new Error(`Wrong accepting RepositoryMember.status.  Status must be INVITED.`)
		}

		newRepositoryMemberAcceptance.acceptingRepositoryMember = acceptingRepositoryMember

		delete newRepositoryMemberAcceptance.addedInRepositoryTransactionHistory
		delete newRepositoryMemberAcceptance._localId

		return newRepositoryMemberAcceptance
	}

	private getNewRepositoryMemberInvitations(
		data: SyncRepositoryData,
		repositoryMember: IRepositoryMember,
		newMembers: IRepositoryMember[]
	): IRepositoryMemberInvitation[] {
		const history = data.history

		const newRepositoryMemberInvitationsErrorPrefix = `history.newRepositoryMemberInvitations`
		const newRepositoryMemberInvitations = history.newRepositoryMemberInvitations

		if (!(newRepositoryMemberInvitations instanceof Array)) {
			throw new Error(`${newRepositoryMemberInvitationsErrorPrefix} is not an Array`)
		}

		if (!newRepositoryMemberInvitations.length) {
			return []
		}

		if (history.repository.isPublic) {
			throw new Error(`${newRepositoryMemberInvitationsErrorPrefix} are NOT allowed on a public Repository`)
		}

		if (!repositoryMember.isAdministrator) {
			throw new Error(`Non-Administrator user cannot send ${newRepositoryMemberInvitationsErrorPrefix}.`)
		}

		for (let i = 0; i < newRepositoryMemberInvitations.length; i++) {
			const newRepositoryMemberInvitation = newRepositoryMemberInvitations[i]
			if (typeof newRepositoryMemberInvitation !== 'object') {
				throw new Error(`${newRepositoryMemberInvitationsErrorPrefix}[${i}] is not an object`)
			}
			if (typeof newRepositoryMemberInvitation.createdAt !== 'number') {
				throw new Error(`${newRepositoryMemberInvitationsErrorPrefix}[${i}].createdAt is not a number`)
			}
			newRepositoryMemberInvitation.createdAt = new Date(newRepositoryMemberInvitation.createdAt)

			if (typeof newRepositoryMemberInvitation.invitedRepositoryMember !== 'number') {
				throw new Error(`${newRepositoryMemberInvitationsErrorPrefix}[${i}].invitedRepositoryMember is not a number`)
			}

			const invitedRepositoryMember = data.repositoryMembers[newRepositoryMemberInvitation.invitedRepositoryMember]

			if (!invitedRepositoryMember) {
				throw new Error(`Invited repository member with in-message index ${newRepositoryMemberInvitation.invitedRepositoryMember}
is not present in the message.`)
			}

			if (invitedRepositoryMember.memberPublicSigningKey === repositoryMember.memberPublicSigningKey) {
				throw new Error(`${newRepositoryMemberInvitationsErrorPrefix}[${i}] cannot be an existing RepositoryMember`)
			}

			this.checkPublicSigningKey(
				newRepositoryMemberInvitation.invitationPublicSigningKey,
				`${newRepositoryMemberInvitationsErrorPrefix}[${i}].invitationPublicSigningKey`
			)

			if (invitedRepositoryMember.status !== RepositoryMember_Status.INVITED) {
				throw new Error(`Wrong ${newRepositoryMemberInvitationsErrorPrefix}[${i}].invitedRepositoryMember.status.  Status must be INVITED.`)
			}

			this.checkRepositoryMembershipFlags(invitedRepositoryMember,
				`${newRepositoryMemberInvitationsErrorPrefix}[${i}]`,
				false, data.history.repository)

			newRepositoryMemberInvitation.invitedRepositoryMember = invitedRepositoryMember

			delete newRepositoryMemberInvitation.addedInRepositoryTransactionHistory
			delete newRepositoryMemberInvitation._localId

			newMembers.push(invitedRepositoryMember)
		}

		return newRepositoryMemberInvitations
	}

	private checkRepositoryMembershipFlags(
		repositoryMember: IRepositoryMember,
		errorPrefix: string,
		isOwnerValue: boolean,
		repository: IRepository
	) {
		if (typeof repositoryMember.isAdministrator !== 'boolean') {
			throw new Error(`${errorPrefix}.isAdministrator is not a boolean`)
		}
		if (typeof repositoryMember.canWrite !== 'boolean') {
			throw new Error(`${errorPrefix}.canWrite is not a boolean`)
		}
		repositoryMember.isOwner = isOwnerValue
		repositoryMember.repository = repository

		delete repositoryMember.addedInRepositoryTransactionHistory
		delete repositoryMember.invitations
		delete repositoryMember.updates
	}

	private getInMessageRepositoryMemberMap(
		data: SyncRepositoryData
	): Map<RepositoryMember_PublicSigningKey, InMessageIndex> {
		const inMessageRepositoryMemberMapByPublicSigningKey:
			Map<RepositoryMember_PublicSigningKey, InMessageIndex> = new Map()
		const repositoryMemberPublicSigningKeySet:
			Set<RepositoryMember_PublicSigningKey> = new Set()
		for (let i = 0; i < data.repositoryMembers.length; i++) {
			const repositoryMember = data.repositoryMembers[i]
			if (typeof repositoryMember !== 'object') {
				throw new Error(`data.repositoryMembers[${i}] is not an object`)
			}
			const errorPrefix = `data.repositoryMembers[${i}].publicSigningKey`
			const memberPublicSigningKey = repositoryMember.memberPublicSigningKey
			this.checkPublicSigningKey(memberPublicSigningKey, errorPrefix)

			if (repositoryMemberPublicSigningKeySet.has(memberPublicSigningKey)) {
				throw new Error(`${errorPrefix} appears in more than one data.repositoryMembers`)
			}
			repositoryMemberPublicSigningKeySet.add(memberPublicSigningKey)
			inMessageRepositoryMemberMapByPublicSigningKey.set(
				memberPublicSigningKey, i)

			delete repositoryMember._localId
		}

		return inMessageRepositoryMemberMapByPublicSigningKey
	}

	private checkPublicSigningKey(
		publicSigningKey: RepositoryMember_PublicSigningKey | RepositoryMemberInvitation_PublicSigningKey,
		errorPrefix: string
	): void {
		if (typeof publicSigningKey !== 'string') {
			throw new Error(`${errorPrefix} is not a string`)
		}
		if (publicSigningKey.length !== 224) {
			throw new Error(`${errorPrefix} does not have correct length`)
		}
	}

	private async getRepositoryMember(
		data: SyncRepositoryData,
		historyRepository: IRepository,
		repositoryAddedInAnEarlierIncomingMessage: boolean,
		addedRepositoryMembersByPublicSigningKey: Map<RepositoryMember_PublicSigningKey, IRepositoryMember>,
		inMessageRepositoryMemberMapByPublicSigningKey:
			Map<RepositoryMember_PublicSigningKey, InMessageIndex>,
		newMembers: IRepositoryMember[],
		context: IContext
	): Promise<IRepositoryMember> {
		let exisingMessageRepositoryMembers: IRepositoryMember[] = []
		let newRepositoryMember: IRepositoryMember
		if (repositoryAddedInAnEarlierIncomingMessage) {
			for (const repositoryMember of data.repositoryMembers) {
				const repositoryMemberAddedInAnEarlierIncomingMessage =
					addedRepositoryMembersByPublicSigningKey.get(repositoryMember.memberPublicSigningKey)
				if (!repositoryMemberAddedInAnEarlierIncomingMessage) {
					if (typeof repositoryMember.userAccount === 'undefined') {
						throw new Error(`Did not find are RepositoryMember
in an earlier (currently) incoming message for a repository was added in an
earlier incoming message`)
					} else {
						if (newRepositoryMember) {
							throw new Error(`Only one member can be added per message`)
						}
						newRepositoryMember = repositoryMember
						addedRepositoryMembersByPublicSigningKey
							.set(repositoryMember.memberPublicSigningKey, repositoryMember)
					}
				} else {
					exisingMessageRepositoryMembers.push(
						repositoryMemberAddedInAnEarlierIncomingMessage)
				}
			}
		} else {
			const memberPublicSigningKeys = data.repositoryMembers
				.map(repositoryMember => repositoryMember.memberPublicSigningKey)
			exisingMessageRepositoryMembers = await this.repositoryMemberDao
				.findByMemberPublicSigningKeys(memberPublicSigningKeys, context)
		}
		let messageRepositoryMember: IRepositoryMember

		const history = data.history
		if (history.isRepositoryCreation) {
			if (exisingMessageRepositoryMembers.length) {
				throw new Error(`Found existing repositoryMembers for a newly created repository`)
			}
			newRepositoryMember = data.repositoryMembers[history.member as any]
			this.checkRepositoryMembershipFlags(newRepositoryMember,
				`history.member`, true, historyRepository)
			history.member = newRepositoryMember
			newMembers.push(history.member)
			addedRepositoryMembersByPublicSigningKey
				.set(newRepositoryMember.memberPublicSigningKey, newRepositoryMember)
			return null
		}

		if (newRepositoryMember) {
			this.checkRepositoryMembershipFlags(newRepositoryMember,
				`history.member`, false, historyRepository)
			messageRepositoryMember = newRepositoryMember
			newMembers.push(newRepositoryMember)
		} else {
			if (exisingMessageRepositoryMembers.length !== 1) {
				throw new Error(`Expecting exactly one RepositoryMember in non isRepositoryCreation message`)
			}
			messageRepositoryMember = exisingMessageRepositoryMembers[0]
		}

		const repositoryMemberInMessageIndex = inMessageRepositoryMemberMapByPublicSigningKey.get(
			messageRepositoryMember.memberPublicSigningKey)

		if (history.member as any !== repositoryMemberInMessageIndex) {
			throw new Error(`history.member does not already exist in the Repository`)
		}

		history.member = messageRepositoryMember
		data.repositoryMembers[repositoryMemberInMessageIndex] = messageRepositoryMember
		addedRepositoryMembersByPublicSigningKey
			.set(messageRepositoryMember.memberPublicSigningKey, messageRepositoryMember)

		return messageRepositoryMember
	}

	private getPublicSigningKeysAndSignatureToCheck(
		message: SyncRepositoryMessage,
		isNewRepositoryMemberAcceptanceMessage: boolean
	): ISignatureCheck[] {
		const signatureChecks: ISignatureCheck[] = []

		const history = message.data.history

		// Operation history may not be present if its
		// a RepositoryMember-only operation
		const firstOperationHistory = history.operationHistory[0]
		if (firstOperationHistory && this.dictionary.isKeyringEntity(firstOperationHistory.entity)) {
			return
		}

		signatureChecks.push({
			publicSigningKey: history.member.memberPublicSigningKey,
			signatureName: 'memberSignature',
			signatureToCheck: message.memberSignature
		})
		if (isNewRepositoryMemberAcceptanceMessage) {
			signatureChecks.push({
				publicSigningKey: message.data.history
					.newRepositoryMemberAcceptances[0].invitationPublicSigningKey,
				signatureName: 'acceptanceSignature',
				signatureToCheck: message.acceptanceSignature
			})
		}
		if (isNewRepositoryMemberAcceptanceMessage || history.isRepositoryCreation) {
			signatureChecks.push({
				publicSigningKey: history.member.userAccount.accountPublicSigningKey,
				signatureName: 'userAccountSignature',
				signatureToCheck: message.userAccountSignature
			})
		}

		return signatureChecks
	}

	private checkRepository(
		repository: IRepository,
		repositoryIndex: number,
		repositoryGUIDs: string[],
		messageRepositoryIndexMap: Map<string, number>,
		message: SyncRepositoryData
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
		if (typeof repository.internal !== 'boolean') {
			throw new Error(`Invalid 'repository.internal'`)
		}
		if (!repository.source || typeof repository.source !== 'string') {
			throw new Error(`Invalid 'repository.source'`)
		}
		if (typeof repository.name !== 'string') {
			throw new Error(`Invalid 'repository.name'`)
		}
		if (typeof repository.GUID !== 'string' || repository.GUID.length !== 45) {
			throw new Error(`Invalid 'repository.GUID'`)
		}
		if (typeof repository.owner !== 'number') {
			throw new Error(`Expecting "in-message index" (number)
				in 'repository.owner'`)
		}
		if (typeof repository.isPublic !== 'boolean') {
			throw new Error(`Invalid 'repository.isPublic'`)
		}
		if (typeof repository.isLoaded !== 'undefined') {
			throw new Error(`'repository.isLoaded' cannot be specified`)
		}
		const userAccount = message.userAccounts[repository.owner as any]
		if (!userAccount) {
			throw new Error(
				`Did not find repository.owner (UserAccount) with "in-message index" ${repository.owner}`);
		}
		repository.isLoaded = true
		repository.owner = userAccount

		repositoryGUIDs.push(repository.GUID)
		if (typeof repositoryIndex === 'number') {
			messageRepositoryIndexMap.set(repository.GUID, repositoryIndex)
		}
		// Make sure id field is not in the input
		delete repository._localId
	}

}
