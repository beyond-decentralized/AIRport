import { IDbRelationDao } from '@airport/airspace/dist/app/bundle';
import { UserAccount_PublicSigningKey } from '@airport/aviation-communication';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator';
import {
	Actor_LocalId,
	DbColumn_Index,
	DbRelation_LocalId,
	DbApplicationVersion_LocalId,
	DbApplication_LocalId,
	DbApplication,
	DbApplicationVersion,
	DbColumn,
	DbEntity,
	Dictionary,
	IActor,
	IApplicationUtils,
	IDbApplicationUtils,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
	IRepository,
	IRepositoryMember,
	IRepositoryMemberAcceptance,
	IRepositoryMemberInvitation,
	IRepositoryTransactionHistory,
	ITerminal,
	IUserAccount,
	RepositoryMember_PublicSigningKey,
	SyncRepositoryData,
	SyncRepositoryMessage,
	RepositoryTransactionType,
	Repository_LocalId,
	Terminal_GUID,
	DbRelation
} from "@airport/ground-control";
import {
	IActorDao,
	IRepositoryDao,
	RepositoryDao
} from "@airport/holding-pattern/dist/app/bundle";

export interface ISyncOutDataSerializer {

	serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[]
	}>
}

export interface IWithId {
	_localId: number
}
export interface IWithIdAndActor
	extends IWithId {
	actor: IActor
}
export interface IWithRecordHistory
	extends IWithId {
	recordHistory: IRecordHistory
}
export interface IWithIndex {
	index: number
}

export interface InMessageLookupStructures {
	actorInMessageIndexesById: Map<Actor_LocalId, number>
	applicationVersionInMessageIndexesById: Map<DbApplicationVersion_LocalId, number>
	applicationVersions: DbApplicationVersion[]
	lastInMessageActorIndex: number
	lastInMessageApplicationVersionIndex: number
	lastInMessageReferencedApplicationRelation: number
	lastInMessageReferencedApplicationRelationIndex: number
	lastInMessageReferencedApplicationVersionIndex: number
	lastInMessageRepositoryIndex: number
	messageRepository: IRepository
	referencedApplicationRelationIndexesById: Map<DbRelation_LocalId, number>
	referencedApplicationVersionInMessageIndexesById: Map<DbApplicationVersion_LocalId, number>
	referencedApplicationVersions: DbApplicationVersion[]
	repositoryInMessageIndexesById: Map<Repository_LocalId, number>
	applicationLookup: InMessageEntityLookup<DbApplication_LocalId>
	repositoryMemberLookup: InMessageEntityLookup<RepositoryMember_PublicSigningKey>
	terminalLookup: InMessageEntityLookup<Terminal_GUID>
	userAccountLookup: InMessageEntityLookup<UserAccount_PublicSigningKey>
}

export interface InMessageEntityLookup<Id> {
	inMessageIndexesById: Map<Id, number>
	lastInMessageIndex: number
}

export enum IndexedEntityType {
	APPLICATION,
	REPOSITORY_MEMBER,
	TERMINAL,
	USER_ACCOUNT
}

@Injected()
export class SyncOutDataSerializer
	implements ISyncOutDataSerializer {

	@Inject()
	actorDao: IActorDao

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	dbRelationDao: IDbRelationDao

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	repositoryDao: IRepositoryDao

	// @Inject()
	// repositoryDao: IRepositoryDao

	WITH_ID: IWithId = {} as any
	WITH_ID_AND_ACTOR_ID: IWithIdAndActor = {} as any
	WITH_RECORD_HISTORY: IWithRecordHistory = {} as any
	WITH_INDEX: IWithIndex = {} as any

	async serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		messages: SyncRepositoryMessage[]
	}> {
		let historiesToSend: IRepositoryTransactionHistory[] = []
		const messages: SyncRepositoryMessage[] = []
		for (let i = 0; i < repositoryTransactionHistories.length; i++) {
			const repositoryTransactionHistory = repositoryTransactionHistories[i]
			if (repositoryTransactionHistory.repositoryTransactionType !== RepositoryTransactionType.LOCAL) {
				continue
			}
			const message = await this.serializeMessage(
				repositoryTransactionHistory, repositoryMapById, context)

			historiesToSend.push(repositoryTransactionHistory)
			messages.push(message)
		}

		return {
			historiesToSend,
			messages,
		}
	}

	private getInMessageEntityLookup(): InMessageEntityLookup<any> {
		return {
			inMessageIndexesById: new Map(),
			lastInMessageIndex: -1
		}
	}

	private async serializeMessage(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<SyncRepositoryMessage> {
		const lookups: InMessageLookupStructures = {
			actorInMessageIndexesById: new Map(),
			applicationLookup: this.getInMessageEntityLookup(),
			referencedApplicationRelationIndexesById: new Map(),
			applicationVersionInMessageIndexesById: new Map(),
			applicationVersions: [],
			lastInMessageActorIndex: -1,
			lastInMessageReferencedApplicationRelationIndex: -1,
			lastInMessageApplicationVersionIndex: -1,
			lastInMessageReferencedApplicationRelation: -1,
			lastInMessageReferencedApplicationVersionIndex: -1,
			lastInMessageRepositoryIndex: -1,
			messageRepository: repositoryTransactionHistory.repository,
			referencedApplicationVersionInMessageIndexesById: new Map(),
			referencedApplicationVersions: [],
			repositoryInMessageIndexesById: new Map(),
			repositoryMemberLookup: this.getInMessageEntityLookup(),
			terminalLookup: this.getInMessageEntityLookup(),
			userAccountLookup: this.getInMessageEntityLookup()
		}

		const data: SyncRepositoryData = {
			actors: [],
			applicationVersions: [],
			applications: [],
			history: null,
			// Repositories may reference records in other repositories
			referencedApplicationVersions: [],
			referencedApplicationRelations: [],
			referencedRepositories: [],
			repositoryMembers: [],
			userAccounts: [],
			terminals: []
		}

		const message: SyncRepositoryMessage = {
			data
		}

		data.history = this.serializeRepositoryTransactionHistory(
			repositoryTransactionHistory, message.data, lookups)

		// TODO: replace db lookups with TerminalState lookups where possible
		await this.serializeRepositories(repositoryTransactionHistory, data, lookups,
			repositoryMapById, context)
		await this.serializeActorsUserAccountsAndTerminals(
			data, lookups, context)
		await this.serializeApplicationsAndVersions(data,
			lookups.applicationLookup, lookups.applicationVersions, data.applicationVersions)
		await this.serializeReferencedApplicationProperties(data, lookups, context)
		await this.serializeApplicationsAndVersions(data, lookups.applicationLookup,
			lookups.referencedApplicationVersions, data.referencedApplicationVersions)

		return message
	}

	private async serializeActorsUserAccountsAndTerminals(
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures,
		context: IContext
	): Promise<void> {
		let actorIdsToFindBy: Actor_LocalId[] = []
		for (let actorId of lookups.actorInMessageIndexesById.keys()) {
			actorIdsToFindBy.push(actorId)
		}
		const actors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(
			actorIdsToFindBy, context)

		this.serializeUserAccounts(actors, data, lookups.userAccountLookup)
		this.serializeActorTerminals(actors, data,
			lookups.terminalLookup,
			lookups.userAccountLookup)

		for (const actor of actors) {
			const applicationInMessageIndex = this.serializeApplication(
				actor.application, lookups.applicationLookup, data)

			const actorInMessageIndex = lookups.actorInMessageIndexesById.get(actor._localId)
			data.actors[actorInMessageIndex] = {
				...this.WITH_ID,
				application: applicationInMessageIndex as any,
				terminal: lookups.terminalLookup.inMessageIndexesById.get(actor.terminal.GUID) as any,
				userAccount: lookups.userAccountLookup.inMessageIndexesById.get(actor.userAccount.accountPublicSigningKey) as any,
				GUID: actor.GUID
			}
		}
	}

	private serializeActorTerminals(
		actors: IActor[],
		data: SyncRepositoryData,
		inMessageTerminalLookup: InMessageEntityLookup<Terminal_GUID>,
		inMessageUserAccountLookup: InMessageEntityLookup<UserAccount_PublicSigningKey>
	): void {
		for (const actor of actors) {
			this.addTerminalToMessage(
				actor.terminal,
				data,
				inMessageTerminalLookup,
				inMessageUserAccountLookup
			)
		}
	}

	private serializeUserAccounts(
		actors: IActor[],
		data: SyncRepositoryData,
		inMessageUserAccountLookup: InMessageEntityLookup<UserAccount_PublicSigningKey>
	): void {
		for (const actor of actors) {
			this.addUserAccountToMessage(actor.userAccount, data, inMessageUserAccountLookup)
			this.addUserAccountToMessage(actor.terminal.owner, data, inMessageUserAccountLookup)
		}
	}

	private addRepositoryMemberToMessage(
		repositoryMember: IRepositoryMember,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures,
		addFullRecord: boolean
	): IRepositoryMember {
		const {
			entityAlreadyAdded,
			inMessageIndex
		} = this.getEntityInMessageIndex(repositoryMember,
			IndexedEntityType.REPOSITORY_MEMBER, lookups.repositoryMemberLookup)

		if (!entityAlreadyAdded) {
			let newRepositoryMember: IRepositoryMember = {
				...this.WITH_ID,
				memberPublicSigningKey: repositoryMember.memberPublicSigningKey
			} as any
			if (addFullRecord) {
				newRepositoryMember = {
					...newRepositoryMember,
					isOwner: repositoryMember.isOwner,
					isAdministrator: repositoryMember.isAdministrator,
					canWrite: repositoryMember.canWrite,
					status: repositoryMember.status,
					userAccount: this.addUserAccountToMessage(repositoryMember.userAccount,
						data, lookups.userAccountLookup)
				}
			}
			data.repositoryMembers[inMessageIndex] = newRepositoryMember
		}

		return inMessageIndex as any
	}

	private getEntityInMessageIndex(
		entity: DbApplication | IRepositoryMember | ITerminal | IUserAccount,
		indexedEntityType: IndexedEntityType,
		inMessageEntityLookup: InMessageEntityLookup<DbApplication_LocalId
			| RepositoryMember_PublicSigningKey
			| Terminal_GUID
			| UserAccount_PublicSigningKey>
	): {
		entityAlreadyAdded: boolean,
		inMessageIndex: number
	} {
		let id
		switch (indexedEntityType) {
			case IndexedEntityType.APPLICATION:
				id = (entity as DbApplication).index
				break
			case IndexedEntityType.REPOSITORY_MEMBER:
				id = (entity as IRepositoryMember).memberPublicSigningKey
				break
			case IndexedEntityType.TERMINAL:
				id = (entity as ITerminal).GUID
				break
			case IndexedEntityType.USER_ACCOUNT:
				id = (entity as IUserAccount).accountPublicSigningKey
				break
		}

		let inMessageIndex = inMessageEntityLookup
			.inMessageIndexesById.get(id)

		const entityAlreadyAdded = inMessageIndex !== undefined
		if (inMessageIndex === undefined) {
			inMessageIndex = ++inMessageEntityLookup.lastInMessageIndex
			inMessageEntityLookup.inMessageIndexesById
				.set(id, inMessageIndex)
		}

		return {
			entityAlreadyAdded,
			inMessageIndex
		}
	}

	private addUserAccountToMessage(
		userAccount: IUserAccount,
		data: SyncRepositoryData,
		inMessageUserAccountLookup: InMessageEntityLookup<UserAccount_PublicSigningKey>
	): IUserAccount {
		if (!userAccount) {
			return -1 as any
		}
		const {
			entityAlreadyAdded,
			inMessageIndex
		} = this.getEntityInMessageIndex(userAccount, IndexedEntityType.USER_ACCOUNT, inMessageUserAccountLookup)

		if (!entityAlreadyAdded) {
			let serializedUserAccount: IUserAccount = {
				...this.WITH_ID,
				accountPublicSigningKey: userAccount.accountPublicSigningKey,
				username: userAccount.username
			}
			data.userAccounts[inMessageIndex] = serializedUserAccount
		}

		return inMessageIndex as any
	}

	private addTerminalToMessage(
		terminal: ITerminal,
		data: SyncRepositoryData,
		inMessageTerminalLookup: InMessageEntityLookup<Terminal_GUID>,
		inMessageUserAccountLookup: InMessageEntityLookup<UserAccount_PublicSigningKey>
	): ITerminal {
		const {
			entityAlreadyAdded,
			inMessageIndex
		} = this.getEntityInMessageIndex(terminal, IndexedEntityType.TERMINAL, inMessageTerminalLookup)

		if (!entityAlreadyAdded) {
			data.terminals[inMessageIndex] = {
				...this.WITH_ID,
				GUID: terminal.GUID,
				isLocal: false,
				owner: inMessageUserAccountLookup.inMessageIndexesById.get(terminal.owner.accountPublicSigningKey) as any
			}
		}

		return inMessageIndex as any
	}

	private async serializeRepositories(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures,
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<void> {
		let repositoryIdsToFindBy: Repository_LocalId[] = []
		let foundRepositories: IRepository[] = []
		for (let repositoryId of lookups.repositoryInMessageIndexesById.keys()) {
			const foundRepository = repositoryMapById.get(repositoryId)
			if (foundRepository) {
				foundRepositories.push(foundRepository)
			} else {
				repositoryIdsToFindBy.push(repositoryId)
			}
		}

		const foundRepository = repositoryMapById.get(repositoryTransactionHistory.repository._localId)
		if (foundRepository) {
			foundRepositories.push(foundRepository)
		} else {
			repositoryIdsToFindBy.push(repositoryTransactionHistory._localId)
		}

		let repositories = []
		if (repositoryIdsToFindBy.length) {
			repositories = await this.repositoryDao.findWithOwnerBy_LocalIds(
				repositoryIdsToFindBy, context)
		}
		foundRepositories = [
			...repositories,
			...foundRepositories
		]

		for (const repository of foundRepositories) {
			let userAccountInMessageIndex = this.getEntityInMessageIndex(
				repository.owner, IndexedEntityType.USER_ACCOUNT, lookups.userAccountLookup)
			if (lookups.repositoryInMessageIndexesById.has(repository._localId)) {
				const repositoryInMessageIndex = lookups.repositoryInMessageIndexesById.get(repository._localId)
				data.referencedRepositories[repositoryInMessageIndex] =
					this.serializeRepository(repository, userAccountInMessageIndex as any)
			} else {
				if (typeof data.history.repository !== 'string') {
					data.history.repository.owner = userAccountInMessageIndex as any
					data.history.repository._localId = repository._localId
				}
			}
		}
	}

	private async serializeReferencedApplicationProperties(
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures,
		context: IContext
	): Promise<void> {
		let applicationRelationIdsToFindBy: DbRelation_LocalId[] = []
		for (let applicationRelationLocalId of lookups.referencedApplicationRelationIndexesById.keys()) {
			applicationRelationIdsToFindBy.push(applicationRelationLocalId)
		}

		if (!applicationRelationIdsToFindBy.length) {
			return
		}

		const applicationRelations = await this.dbRelationDao
			.findAllByLocalIdsWithApplications(applicationRelationIdsToFindBy, context)

		for (const applicationRelation of applicationRelations) {
			const referencedApplicationVersion = applicationRelation.entity.applicationVersion

			let referencedApplicationVersionInMessageIndex
			if (lookups.referencedApplicationVersionInMessageIndexesById.has(referencedApplicationVersion._localId)) {
				referencedApplicationVersionInMessageIndex = lookups.referencedApplicationVersionInMessageIndexesById.get(referencedApplicationVersion._localId)
			} else {
				referencedApplicationVersionInMessageIndex = ++lookups.lastInMessageReferencedApplicationVersionIndex
				lookups.referencedApplicationVersionInMessageIndexesById.set(referencedApplicationVersion._localId, referencedApplicationVersionInMessageIndex)
			}
			lookups.referencedApplicationVersions[referencedApplicationVersionInMessageIndex] = referencedApplicationVersion

			const entity: DbEntity = {
				...this.WITH_ID,
				index: applicationRelation.entity.index,
				applicationVersion: referencedApplicationVersionInMessageIndex
			} as any

			const dbRelation: DbRelation = {
				...this.WITH_ID,
				index: applicationRelation.index,
				entity
			} as any

			data.referencedApplicationRelations.push(dbRelation)
		}
	}

	private serializeApplicationsAndVersions(
		data: SyncRepositoryData,
		applicationLookup: InMessageEntityLookup<DbApplication_LocalId>,
		lookupVersions: DbApplicationVersion[],
		finalApplicationVersions: DbApplicationVersion[]
	): void {
		for (let i = 0; i < lookupVersions.length; i++) {
			const applicationVersion = lookupVersions[i]
			const applicationInMessageIndex = this.serializeApplication(
				applicationVersion.application, applicationLookup, data)

			finalApplicationVersions[i] = {
				...this.WITH_ID,
				application: applicationInMessageIndex as any,
				integerVersion: applicationVersion.integerVersion
			} as any
		}
	}

	private serializeApplication(
		application: DbApplication,
		applicationLookup: InMessageEntityLookup<DbApplication_LocalId>,
		data: SyncRepositoryData
	): number {

		const {
			entityAlreadyAdded,
			inMessageIndex
		} = this.getEntityInMessageIndex(application, IndexedEntityType.APPLICATION, applicationLookup)

		if (!entityAlreadyAdded) {
			data.applications[inMessageIndex] = {
				...this.WITH_INDEX,
				domain: {
					...this.WITH_ID,
					name: application.domain.name
				},
				name: application.name
			} as any
		}

		return inMessageIndex
	}

	private serializeRepositoryTransactionHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IRepositoryTransactionHistory {
		repositoryTransactionHistory.operationHistory.sort((
			operationHistory1,
			operationHistory2,
		) => {
			if (operationHistory1.orderNumber < operationHistory2.orderNumber) {
				return -1;
			}
			if (operationHistory1.orderNumber > operationHistory2.orderNumber) {
				return 1;
			}
			return 0;
		})

		const serializedOperationHistory: IOperationHistory[] = []
		for (const operationHistory of repositoryTransactionHistory.operationHistory) {
			serializedOperationHistory.push(this.serializeOperationHistory(
				repositoryTransactionHistory, operationHistory, data, lookups))
		}

		const member = this.addRepositoryMemberToMessage(
			repositoryTransactionHistory.member,
			data,
			lookups,
			repositoryTransactionHistory.isRepositoryCreation
		)

		this.serializeNewRepositoryMembers(repositoryTransactionHistory, data, lookups)

		const serializedRepositoryTransactionHistory: IRepositoryTransactionHistory = {
			...this.WITH_ID,
			actor: this.getActorInMessageIndex(repositoryTransactionHistory.actor, lookups),
			GUID: repositoryTransactionHistory.GUID,
			isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
			isPublic: repositoryTransactionHistory.isPublic,
			member,
			repository: this.serializeHistoryRepository(
				repositoryTransactionHistory, data, lookups.userAccountLookup),
			operationHistory: serializedOperationHistory,
			saveTimestamp: repositoryTransactionHistory.saveTimestamp,
			newRepositoryMemberAcceptances: this.serializeRepositoryMemberAcceptances(
				repositoryTransactionHistory, data, lookups),
			newRepositoryMemberInvitations: this.serializeRepositoryMemberInvitations(
				repositoryTransactionHistory, data, lookups),
			transactionHistory: null,
			repositoryTransactionType: RepositoryTransactionType.REMOTE
		}

		// Not needed in serialized version of object that is shared
		delete serializedRepositoryTransactionHistory.transactionHistory
		delete serializedRepositoryTransactionHistory.repositoryTransactionType

		return serializedRepositoryTransactionHistory
	}

	private serializeHistoryRepository(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: SyncRepositoryData,
		inMessageUserAccountLookup: InMessageEntityLookup<UserAccount_PublicSigningKey>
	): IRepository {
		if (repositoryTransactionHistory.isRepositoryCreation) {
			const repository = repositoryTransactionHistory.repository
			let userAccountInMessageIndex = this.addUserAccountToMessage(
				repository.owner, data, inMessageUserAccountLookup)

			return this.serializeRepository(repository, userAccountInMessageIndex as any)
		} else {
			// When this repositoryTransactionHistory processed at sync-in 
			// the repository should already be loaded in the target database
			// if it's not then it's missing the repositoryTransactionHistory
			// with isRepositoryCreation === true
			return repositoryTransactionHistory.repository.GUID as any
		}
	}

	private serializeNewRepositoryMembers(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): void {
		for (const newRepositoryMember of repositoryTransactionHistory
			.newRepositoryMembers) {
			this.addRepositoryMemberToMessage(
				newRepositoryMember, data, lookups, true
			)
		}
	}

	private serializeRepositoryMemberAcceptances(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IRepositoryMemberAcceptance[] {
		const serializedRepositoryMemberAcceptances: IRepositoryMemberAcceptance[] = []
		for (const newRepositoryMemberAcceptance of repositoryTransactionHistory
			.newRepositoryMemberAcceptances) {
			serializedRepositoryMemberAcceptances.push({
				...this.WITH_ID,
				createdAt: newRepositoryMemberAcceptance.createdAt,
				acceptingRepositoryMember: this.addRepositoryMemberToMessage(
					newRepositoryMemberAcceptance.acceptingRepositoryMember,
					data,
					lookups,
					false
				),
				invitationPublicSigningKey: newRepositoryMemberAcceptance.invitationPublicSigningKey
			})
		}

		return serializedRepositoryMemberAcceptances
	}

	private serializeRepositoryMemberInvitations(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IRepositoryMemberInvitation[] {
		const serializedRepositoryMemberInvitations: IRepositoryMemberInvitation[] = []
		for (const newRepositoryMemberInvitation of repositoryTransactionHistory
			.newRepositoryMemberInvitations) {
			serializedRepositoryMemberInvitations.push({
				...this.WITH_ID,
				createdAt: newRepositoryMemberInvitation.createdAt,
				invitationPublicSigningKey: newRepositoryMemberInvitation.invitationPublicSigningKey,
				invitedRepositoryMember: this.addRepositoryMemberToMessage(
					newRepositoryMemberInvitation.invitedRepositoryMember,
					data,
					lookups,
					true
				)
			})
		}

		return serializedRepositoryMemberInvitations
	}

	private serializeOperationHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		operationHistory: IOperationHistory,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IOperationHistory {
		const dbEntity = operationHistory.entity
		const serializedRecordHistory: IRecordHistory[] = []
		for (const recordHistory of operationHistory.recordHistory) {
			serializedRecordHistory.push(this.serializeRecordHistory(
				repositoryTransactionHistory, recordHistory, dbEntity, data, lookups))
		}

		const historyEntity = operationHistory.entity
		// Should be populated - coming from TerminalStore
		// if (typeof entity !== 'object') {
		// 	throw new Error(`OperationHistory.entity must be populated`)
		// }
		// if (typeof entity.index !== 'number') {
		// 	throw new Error(`OperationHistory.entity.index must be present`)
		// }
		const applicationVersion = historyEntity.applicationVersion
		// Should be populated - coming from TerminalStore
		// if (typeof applicationVersion !== 'object') {
		// 	throw new Error(`OperationHistory.entity.applicationVersion must be populated`)
		// }
		// if (typeof applicationVersion._localId !== 'number') {
		// 	throw new Error(`OperationHistory.entity.applicationVersion._localId must be present`)
		// }

		let applicationVersionInMessageIndex
		if (lookups.applicationVersionInMessageIndexesById.has(applicationVersion._localId)) {
			applicationVersionInMessageIndex = lookups.applicationVersionInMessageIndexesById.get(applicationVersion._localId)
		} else {
			applicationVersionInMessageIndex = ++lookups.lastInMessageApplicationVersionIndex
			lookups.applicationVersionInMessageIndexesById.set(applicationVersion._localId, applicationVersionInMessageIndex)
		}
		lookups.applicationVersions[applicationVersionInMessageIndex] = applicationVersion

		const entity: DbEntity = {
			...this.WITH_ID,
			applicationVersion: applicationVersionInMessageIndex,
			index: operationHistory.entity.index
		} as any

		const serializedOperationHistory: IOperationHistory = {
			...this.WITH_ID,
			changeType: operationHistory.changeType,
			entity,
			recordHistory: serializedRecordHistory,
			orderNumber: null,
			repositoryTransactionHistory: null
		}

		// Not needed in serialized version of object that is shared
		delete serializedOperationHistory.orderNumber
		delete serializedOperationHistory.repositoryTransactionHistory

		return serializedOperationHistory
	}

	private serializeRecordHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		recordHistory: IRecordHistory,
		dbEntity: DbEntity,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IRecordHistory {
		const dbColumMapByIndex: Map<DbColumn_Index, DbColumn> = new Map()
		for (const dbColumn of dbEntity.columns) {
			dbColumMapByIndex.set(dbColumn.index, dbColumn)
		}
		const newValues: IRecordHistoryNewValue[] = []
		for (const newValue of recordHistory.newValues) {
			const dbColumn = dbColumMapByIndex.get(newValue.columnIndex)
			newValues.push(this.serializeNewValue(
				newValue, dbColumn, data, lookups))
		}
		const oldValues: IRecordHistoryOldValue[] = []
		for (const oldValue of recordHistory.oldValues) {
			const dbColumn = dbColumMapByIndex.get(oldValue.columnIndex)
			oldValues.push(this.serializeOldValue(
				oldValue, dbColumn, data, lookups))
		}

		const actor = recordHistory.actor
		// Actor may be null if it's the same actor as for RepositoryTransactionHistory
		// if (typeof actor !== 'object') {
		// 	throw new Error(`RecordHistory.actor must be populated`)
		// }
		const baseObject: {
			_localId: number,
			actor: IActor,
			newValues?: IRecordHistoryNewValue[],
			oldValues?: IRecordHistoryOldValue[]
		} = {
			...this.WITH_ID_AND_ACTOR_ID,
		}
		if (actor._localId !== repositoryTransactionHistory.actor._localId) {
			baseObject.actor = this.getActorInMessageIndex(actor, lookups)
		}
		if (newValues.length) {
			baseObject.newValues = newValues
		}
		if (oldValues.length) {
			baseObject.oldValues = oldValues
		}

		return {
			...baseObject,
			_actorRecordId: recordHistory._actorRecordId,
			actor: null,
			operationHistory: null
		}
	}

	private getActorInMessageIndex(
		actor: IActor,
		lookups: InMessageLookupStructures
	): IActor {
		if (!actor) {
			return null
		}
		return this.getActorInMessageIndexById(actor._localId, lookups) as any as IActor
	}

	private getActorInMessageIndexById(
		actorId: Actor_LocalId,
		lookups: InMessageLookupStructures
	): number {
		let actorInMessageIndex
		if (lookups.actorInMessageIndexesById.has(actorId)) {
			actorInMessageIndex = lookups.actorInMessageIndexesById.get(actorId)
		} else {
			actorInMessageIndex = ++lookups.lastInMessageActorIndex
			lookups.actorInMessageIndexesById.set(actorId, actorInMessageIndex)
		}

		return actorInMessageIndex
	}

	private serializeNewValue(
		newValue: IRecordHistoryNewValue,
		dbColumn: DbColumn,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IRecordHistoryNewValue {
		return this.serializeValue(
			newValue, dbColumn, data, lookups, 'newValue')
	}

	private serializeOldValue(
		oldValue: IRecordHistoryOldValue,
		dbColumn: DbColumn,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures
	): IRecordHistoryOldValue {
		return this.serializeValue(
			oldValue, dbColumn, data, lookups, 'oldValue')
	}

	private serializeValue(
		valueRecord: IRecordHistoryNewValue | IRecordHistoryNewValue,
		dbColumn: DbColumn,
		data: SyncRepositoryData,
		lookups: InMessageLookupStructures,
		valueFieldName: 'newValue' | 'oldValue'
	): IRecordHistoryNewValue {
		let value = valueRecord[valueFieldName]
		let serailizedValue = value

		if (this.applicationUtils.isManyRelationColumn(dbColumn as DbColumn)) {
			const oneSideDbEntity = this.applicationUtils
				.getOneSideEntityOfManyRelationColumn(dbColumn as DbColumn)
			if (this.dictionary.isActor(oneSideDbEntity)) {
				serailizedValue = this.getActorInMessageIndexById(value, lookups)
			} else if (this.dictionary.isRepository(oneSideDbEntity)) {
				serailizedValue = this.getSerializedRepositoryId(value, lookups)
			} else if (this.dictionary.isTerminal(oneSideDbEntity)) {
				const terminalInMessageIndex = this.addTerminalToMessage(
					value, data, lookups.terminalLookup,
					lookups.userAccountLookup)
				serailizedValue = terminalInMessageIndex
			} else if (this.dictionary.isUserAccount(oneSideDbEntity)) {
				const userAccountInMessageIndex = this.addUserAccountToMessage(
					value, data, lookups.userAccountLookup)
				serailizedValue = userAccountInMessageIndex
			} else if (this.dictionary.isApplicationRelation(oneSideDbEntity)) {
				serailizedValue = this.getSerializedReferencedApplicationRelationId(
					value, lookups)
			}
		}

		if (this.dictionary.isActorRelationColumn(dbColumn)) {
			serailizedValue = this.getActorInMessageIndexById(value, lookups)
		}
		if (this.dictionary.isRepositoryRelationColumn(dbColumn)) {
			serailizedValue = this.getSerializedRepositoryId(value, lookups)
		}

		return {
			...this.WITH_RECORD_HISTORY,
			columnIndex: valueRecord.columnIndex,
			[valueFieldName]: serailizedValue
		}
	}

	private getSerializedRepositoryId(
		repositoryLocalId: number,
		lookups: InMessageLookupStructures
	) {
		if (repositoryLocalId === lookups.messageRepository._localId) {
			return -1
		}

		let serailizedValue = lookups.repositoryInMessageIndexesById.get(repositoryLocalId)
		if (serailizedValue === undefined) {
			lookups.lastInMessageRepositoryIndex++
			serailizedValue = lookups.lastInMessageRepositoryIndex
			lookups.repositoryInMessageIndexesById.set(repositoryLocalId, serailizedValue)
		}
		return serailizedValue
	}

	private getSerializedReferencedApplicationRelationId(
		applicationRelationLocalId: number,
		lookups: InMessageLookupStructures
	) {
		let serailizedValue = lookups.referencedApplicationRelationIndexesById
			.get(applicationRelationLocalId)
		if (serailizedValue === undefined) {
			lookups.lastInMessageReferencedApplicationRelationIndex++
			serailizedValue = lookups.lastInMessageReferencedApplicationRelationIndex
			lookups.referencedApplicationRelationIndexesById
				.set(applicationRelationLocalId, serailizedValue)
		}
		return serailizedValue
	}

	private serializeRepository(
		repository: IRepository,
		owner: IUserAccount
	): IRepository {
		return {
			_localId: repository._localId,
			ageSuitability: repository.ageSuitability,
			createdAt: repository.createdAt,
			immutable: repository.immutable,
			internal: repository.internal,
			name: repository.name,
			owner,
			source: repository.source,
			GUID: repository.GUID
		} as any
	}

}
