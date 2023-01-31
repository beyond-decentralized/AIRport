import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IRepositoryDao, RepositoryMemberDao
} from '@airport/holding-pattern/dist/app/bundle'
import { InMessageIndex, IRepository, IRepositoryMember, IRepositoryMemberAcceptance, IRepositoryMemberInvitation, RepositoryMemberInvitation_PublicSigningKey, RepositoryMember_PublicSigningKey, RepositoryMember_Signature, RepositoryMember_Status, SyncRepositoryData, SyncRepositoryMessage, Repository_GUID, Repository_LocalId, UserAccount_Signature } from '@airport/ground-control';
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
		message: SyncRepositoryMessage
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
		message: SyncRepositoryMessage
	): Promise<IRepositoriesAndMembersCheckResult> {
		let missingRepositories: IRepository[] = []
		let newMembers: IRepositoryMember[] = []
		let newRepositoryMemberAcceptances: IRepositoryMemberAcceptance[] = []
		let signatureChecks: ISignatureCheck[] = []

		try {
			const data = message.data
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
			} else {
				if (typeof historyRepository !== 'string') {
					throw new Error(`${repositoryErrorPrefix} a string
	i${isRepositoryCreationEqualityErrorPrefix} === false`)
				}
				repositoryGUIDs.push(historyRepository as any)
			}

			const foundRepositories = await this.repositoryDao.findByGUIDs(repositoryGUIDs)
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

			const memberCheckResult = await this.checkRepositoryMembers(message)
			signatureChecks = memberCheckResult.signatureChecks
			newMembers = memberCheckResult.newMembers
			newRepositoryMemberAcceptances = [memberCheckResult.newRepositoryMemberAcceptance]
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
			signatureChecks
		}
	}

	private async checkRepositoryMembers(
		message: SyncRepositoryMessage
	): Promise<{
		newMembers: IRepositoryMember[]
		newRepositoryMemberAcceptance: IRepositoryMemberAcceptance
		signatureChecks?: ISignatureCheck[]
	}> {
		const data = message.data
		const inMessageRepositoryMemberMapByPublicSigningKey = this
			.getInMessageRepositoryMemberMap(data)

		const newMembers: IRepositoryMember[] = []
		const existingRepositoryMember = await this.getExistingRepositoryMember(
			data, inMessageRepositoryMemberMapByPublicSigningKey, newMembers
		)

		const newRepositoryMemberAcceptance = this
			.isNewRepositoryMemberAcceptanceMessage(
				data, existingRepositoryMember)
		const isNewRepositoryMemberAcceptanceMessage = !!newRepositoryMemberAcceptance

		const isNewRepositoryMemberInvitationMessage = this
			.isNewRepositoryMemberInvitationMessage(
				data, existingRepositoryMember, newMembers)

		await this.checkRepositoryMemberUserAccounts(data,
			isNewRepositoryMemberAcceptanceMessage,
			isNewRepositoryMemberInvitationMessage)

		const signatureChecks = this.getPublicSigningKeysAndSignatureToCheck(
			message, isNewRepositoryMemberAcceptanceMessage)

		delete data.history.newRepositoryMembers


		// TODO: Add a newPublicRepositoryMember property to history and check it

		return {
			newMembers,
			newRepositoryMemberAcceptance,
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

		if (!data.userAccounts[history.member.userAccount as any]) {
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
		existingRepositoryMember: IRepositoryMember
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

		if (acceptingRepositoryMember !== existingRepositoryMember) {
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

	private isNewRepositoryMemberInvitationMessage(
		data: SyncRepositoryData,
		existingRepositoryMember: IRepositoryMember,
		newMembers: IRepositoryMember[]
	): boolean {
		const history = data.history

		const newRepositoryMemberInvitationsErrorPrefix = `history.newRepositoryMemberInvitations`
		const newRepositoryMemberInvitations = history.newRepositoryMemberInvitations

		if (!(newRepositoryMemberInvitations instanceof Array)) {
			throw new Error(`${newRepositoryMemberInvitationsErrorPrefix} is not an Array`)
		}

		if (!newRepositoryMemberInvitations.length) {
			return false
		}

		if (history.repository.isPublic) {
			throw new Error(`${newRepositoryMemberInvitationsErrorPrefix} are NOT allowed on a public Repository`)
		}

		if (!existingRepositoryMember.isAdministrator) {
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

			if (invitedRepositoryMember === existingRepositoryMember) {
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

		return true
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
		const repositoryMemberInMessageIndexesMapByPublicSigningKey:
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
			repositoryMemberInMessageIndexesMapByPublicSigningKey.set(
				memberPublicSigningKey, i)

			delete repositoryMember._localId
		}

		return repositoryMemberInMessageIndexesMapByPublicSigningKey
	}

	private checkPublicSigningKey(
		publicSigningKey: RepositoryMember_PublicSigningKey | RepositoryMemberInvitation_PublicSigningKey,
		errorPrefix: string
	): void {
		if (typeof publicSigningKey !== 'string') {
			throw new Error(`${errorPrefix} is not a string`)
		}
		// FIXME: get the right length of a publicSigningKey
		if (publicSigningKey.length !== 36) {
			throw new Error(`${errorPrefix} does not have .length === 36`)
		}
	}

	private async getExistingRepositoryMember(
		data: SyncRepositoryData,
		repositoryMemberInMessageIndexesMapByPublicSigningKey:
			Map<RepositoryMember_PublicSigningKey, InMessageIndex>,
		newMembers: IRepositoryMember[]
	): Promise<IRepositoryMember> {
		const memberPublicSigningKeys = data.repositoryMembers
			.map(repositoryMember => repositoryMember.memberPublicSigningKey)
		const existingMessageRepositoryMembers = await this.repositoryMemberDao
			.findByMemberPublicSigningKeys(Array.from(memberPublicSigningKeys))
		let existingRepositoryMember: IRepositoryMember

		const history = data.history
		if (history.isRepositoryCreation) {
			if (existingMessageRepositoryMembers.length) {
				throw new Error(`Found existing repositoryMembers for a newly created repository`)
			}
			this.checkRepositoryMembershipFlags(history.member,
				`history.member`, false, data.history.repository)
			newMembers.push(history.member)
			return null
		}

		if (existingMessageRepositoryMembers.length !== 1) {
			throw new Error(`Expecting exactly 1 existing RepositoryMember in non isRepositoryCreation message`)
		}

		existingRepositoryMember = existingMessageRepositoryMembers[0]
		const repositoryMemberInMessageIndex = repositoryMemberInMessageIndexesMapByPublicSigningKey
		[existingRepositoryMember.memberPublicSigningKey]

		if (history.member !== repositoryMemberInMessageIndex) {
			throw new Error(`history.member does not already exist in the Repository`)
		}

		history.member = existingRepositoryMember
		data.repositoryMembers[repositoryMemberInMessageIndex] = existingRepositoryMember

		return existingRepositoryMember
	}

	private getPublicSigningKeysAndSignatureToCheck(
		message: SyncRepositoryMessage,
		isNewRepositoryMemberAcceptanceMessage: boolean
	): ISignatureCheck[] {
		const signatureChecks: ISignatureCheck[] = []

		const history = message.data.history
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
		if (typeof repository.isLoaded !== 'undefined') {
			throw new Error(`'repository.isLoaded' cannot be specified`)
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

}
