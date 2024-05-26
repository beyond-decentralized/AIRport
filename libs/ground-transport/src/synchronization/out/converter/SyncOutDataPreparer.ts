import { IDdlRelationDao } from '@airport/airspace/dist/app/bundle';
import { UserAccount_LocalId, UserAccount_PublicSigningKey } from '@airport/aviation-communication';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator';
import {
	Actor_LocalId,
	DbColumn_Index,
	DbRelation_LocalId,
	ApplicationVersion_LocalId,
	Application_LocalId,
	IApplication,
	IApplicationVersion,
	DbColumn,
	DbEntity,
	Dictionary,
	IActor,
	IApplicationUtils,
	IApplicationNameUtils,
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
	IRepositoryBlockData,
	IRepositoryBlock,
	RepositoryTransactionType,
	Repository_LocalId,
	Terminal_GUID,
	DbRelation
} from "@airport/ground-control";
import {
	IActorDao,
	IRepositoryDao
} from "@airport/holding-pattern/dist/app/bundle";
import { IUserAccountDao } from '@airport/travel-document-checkpoint/dist/app/bundle';
import { v4 as guidv4 } from "uuid"

export interface ISyncOutDataPreparer {

	prepare(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		blocks: IRepositoryBlock[]
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

export interface InBlockLookupStructures {
	actorInBlockIndexesById: Map<Actor_LocalId, number>
	applicationVersionInBlockIndexesById: Map<ApplicationVersion_LocalId, number>
	applicationVersions: IApplicationVersion[]
	lastInBlockActorIndex: number
	lastInBlockApplicationVersionIndex: number
	lastInBlockReferencedApplicationRelation: number
	lastInBlockReferencedApplicationRelationIndex: number
	lastInBlockReferencedApplicationVersionIndex: number
	lastInBlockRepositoryIndex: number
	blockRepository: IRepository
	referencedApplicationRelationIndexesById: Map<DbRelation_LocalId, number>
	referencedApplicationVersionInBlockIndexesById: Map<ApplicationVersion_LocalId, number>
	referencedApplicationVersions: IApplicationVersion[]
	repositoryInBlockIndexesById: Map<Repository_LocalId, number>
	applicationLookup: InBlockEntityLookup<Application_LocalId>
	repositoryMemberLookup: InBlockEntityLookup<RepositoryMember_PublicSigningKey>
	terminalLookup: InBlockEntityLookup<Terminal_GUID>
	userAccountLookup: InBlockEntityLookup<UserAccount_LocalId>
}

export interface InBlockEntityLookup<Id> {
	inBlockIndexesById: Map<Id, number>
	lastInBlockIndex: number
}

export enum IndexedEntityType {
	APPLICATION,
	REPOSITORY_MEMBER,
	TERMINAL,
	USER_ACCOUNT
}

@Injected()
export class SyncOutDataPreparer
	implements ISyncOutDataPreparer {

	@Inject()
	actorDao: IActorDao

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	dbRelationDao: IDdlRelationDao

	@Inject()
	dictionary: Dictionary

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	userAccountDao: IUserAccountDao

	WITH_ID: IWithId = {} as any
	USER_ACCOUNT_WITH_ID: IUserAccount = {} as any
	TERMINAL_WITH_ID: ITerminal = {} as any
	WITH_RECORD_HISTORY: IWithRecordHistory = {} as any
	RECORD_HISTORY: IRecordHistory = {} as any
	WITH_INDEX: IWithIndex = {} as any

	async prepare(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[],
		blocks: IRepositoryBlock[]
	}> {
		let historiesToSend: IRepositoryTransactionHistory[] = []
		const blocks: IRepositoryBlock[] = []
		for (let i = 0; i < repositoryTransactionHistories.length; i++) {
			const repositoryTransactionHistory = repositoryTransactionHistories[i]
			if (repositoryTransactionHistory.repositoryTransactionType !== RepositoryTransactionType.LOCAL) {
				continue
			}
			const block = await this.prepareBlock(
				repositoryTransactionHistory, repositoryMapById, context)

			historiesToSend.push(repositoryTransactionHistory)
			blocks.push(block)
		}

		return {
			historiesToSend,
			blocks,
		}
	}

	private getInBlockEntityLookup(): InBlockEntityLookup<any> {
		return {
			inBlockIndexesById: new Map(),
			lastInBlockIndex: -1
		}
	}

	private async prepareBlock(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<IRepositoryBlock> {
		const lookups: InBlockLookupStructures = {
			actorInBlockIndexesById: new Map(),
			applicationLookup: this.getInBlockEntityLookup(),
			referencedApplicationRelationIndexesById: new Map(),
			applicationVersionInBlockIndexesById: new Map(),
			applicationVersions: [],
			lastInBlockActorIndex: -1,
			lastInBlockReferencedApplicationRelationIndex: -1,
			lastInBlockApplicationVersionIndex: -1,
			lastInBlockReferencedApplicationRelation: -1,
			lastInBlockReferencedApplicationVersionIndex: -1,
			lastInBlockRepositoryIndex: -1,
			blockRepository: repositoryTransactionHistory.repository,
			referencedApplicationVersionInBlockIndexesById: new Map(),
			referencedApplicationVersions: [],
			repositoryInBlockIndexesById: new Map(),
			repositoryMemberLookup: this.getInBlockEntityLookup(),
			terminalLookup: this.getInBlockEntityLookup(),
			userAccountLookup: this.getInBlockEntityLookup()
		}

		const blockData: IRepositoryBlockData = {
			actors: [],
			applications: [],
			applicationVersions: [],
			domains: [],
			// Repositories may reference records in other repositories
			referencedApplicationRelations: [],
			referencedApplicationVersions: [],
			referencedRepositories: [],
			terminals: [],
			repositoryMembers: [],
			userAccounts: []
		}

		blockData.history = this.prepareRepositoryTransactionHistory(
			repositoryTransactionHistory, blockData, lookups)

		// TODO: replace db lookups with TerminalState lookups where possible
		await this.prepareRepositories(repositoryTransactionHistory, blockData, lookups,
			repositoryMapById, context)
		await this.prepareActorsUserAccountsAndTerminals(
			blockData, lookups, context)
		this.prepareApplicationsAndVersions(blockData,
			lookups.applicationLookup, lookups.applicationVersions, blockData.applicationVersions)
		await this.prepareReferencedApplicationProperties(blockData, lookups, context)
		this.prepareApplicationsAndVersions(blockData, lookups.applicationLookup,
			lookups.referencedApplicationVersions, blockData.referencedApplicationVersions)

		return {
			data: blockData,
			GUID: guidv4(),
			history: [repositoryTransactionHistory],
			repository: repositoryTransactionHistory.repository
		}
	}

	private async prepareActorsUserAccountsAndTerminals(
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures,
		context: IContext
	): Promise<void> {
		let actorLidsToFindBy: Actor_LocalId[] = []
		for (let actorLid of lookups.actorInBlockIndexesById.keys()) {
			actorLidsToFindBy.push(actorLid)
		}
		const actors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(
			actorLidsToFindBy, context)

		await this.prepareUserAccounts(actors, data,
			lookups.userAccountLookup, context)
		this.prepareActorTerminals(actors, data,
			lookups.terminalLookup,
			lookups.userAccountLookup)

		for (const actor of actors) {
			const applicationInBlockIndex = this.prepareApplication(
				actor.application, lookups.applicationLookup, data)

			const actorInBlockIndex = lookups.actorInBlockIndexesById.get(actor._localId)
			data.actors[actorInBlockIndex] = {
				...this.WITH_ID,
				application: applicationInBlockIndex as any,
				terminal: lookups.terminalLookup.inBlockIndexesById.get(actor.terminal.GUID) as any,
				userAccount: lookups.userAccountLookup.inBlockIndexesById.get(actor.userAccount._localId) as any,
				GUID: actor.GUID
			}
		}
	}

	private prepareActorTerminals(
		actors: IActor[],
		data: IRepositoryBlockData,
		inBlockTerminalLookup: InBlockEntityLookup<Terminal_GUID>,
		inBlockUserAccountLookup: InBlockEntityLookup<UserAccount_LocalId>
	): void {
		for (const actor of actors) {
			this.addTerminalToBlock(
				actor.terminal,
				data,
				inBlockTerminalLookup,
				inBlockUserAccountLookup
			)
		}
	}

	private async prepareUserAccounts(
		actors: IActor[],
		data: IRepositoryBlockData,
		inBlockUserAccountLookup: InBlockEntityLookup<UserAccount_LocalId>,
		context: IContext
	): Promise<void> {
		for (const actor of actors) {
			this.registerUserAccountInBlock(actor.userAccount, inBlockUserAccountLookup)
			this.registerUserAccountInBlock(actor.terminal.owner, inBlockUserAccountLookup)
		}
		const userAccounts = await this.userAccountDao.findByLocalIds(
			[...inBlockUserAccountLookup.inBlockIndexesById.keys()], context)
		for (let userAccount of userAccounts) {
			const userAccountInBlockIndex = inBlockUserAccountLookup
				.inBlockIndexesById.get(userAccount._localId)
			this.addUserAccountToBlock(userAccount,
				userAccountInBlockIndex, data)
		}
	}

	private addRepositoryMemberToBlock(
		repositoryMember: IRepositoryMember,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures,
		addFullRecord: boolean
	): IRepositoryMember {
		const {
			entityAlreadyAdded,
			inBlockIndex
		} = this.getEntityInBlockIndex(repositoryMember,
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
					userAccount: this.registerUserAccountInBlock(repositoryMember.userAccount,
						lookups.userAccountLookup) as any
				}
			}
			data.repositoryMembers[inBlockIndex] = newRepositoryMember
		}

		return inBlockIndex as any
	}

	private getEntityInBlockIndex(
		entity: IApplication | IRepositoryMember | ITerminal | IUserAccount,
		indexedEntityType: IndexedEntityType,
		inBlockEntityLookup: InBlockEntityLookup<Application_LocalId
			| RepositoryMember_PublicSigningKey
			| Terminal_GUID
			| UserAccount_PublicSigningKey>
	): {
		entityAlreadyAdded: boolean,
		inBlockIndex: number
	} {
		let id
		switch (indexedEntityType) {
			case IndexedEntityType.APPLICATION:
				id = (entity as IApplication).index
				break
			case IndexedEntityType.REPOSITORY_MEMBER:
				id = (entity as IRepositoryMember).memberPublicSigningKey
				break
			case IndexedEntityType.TERMINAL:
				id = (entity as ITerminal).GUID
				break
			case IndexedEntityType.USER_ACCOUNT:
				if (typeof entity === 'number') {
					id = entity
				} else {
					id = (entity as IUserAccount)._localId
				}
				break
		}

		let inBlockIndex = inBlockEntityLookup
			.inBlockIndexesById.get(id)

		const entityAlreadyAdded = inBlockIndex !== undefined
		if (inBlockIndex === undefined) {
			inBlockIndex = ++inBlockEntityLookup.lastInBlockIndex
			inBlockEntityLookup.inBlockIndexesById
				.set(id, inBlockIndex)
		}

		return {
			entityAlreadyAdded,
			inBlockIndex
		}
	}

	private addUserAccountToBlock(
		userAccount: IUserAccount,
		inBlockIndex: number,
		data: IRepositoryBlockData
	): void {
		let preparedUserAccount: IUserAccount = {
			...this.USER_ACCOUNT_WITH_ID,
			accountPublicSigningKey: userAccount.accountPublicSigningKey,
			username: userAccount.username
		}
		data.userAccounts[inBlockIndex] = preparedUserAccount
	}

	private registerUserAccountInBlock(
		userAccount: IUserAccount,
		inBlockUserAccountLookup: InBlockEntityLookup<UserAccount_LocalId>
	): number {
		if (!userAccount) {
			return -1
		}
		const indexResults = this.getEntityInBlockIndex(
			userAccount, IndexedEntityType.USER_ACCOUNT, inBlockUserAccountLookup)

		return indexResults.inBlockIndex
	}

	private addTerminalToBlock(
		terminal: ITerminal,
		data: IRepositoryBlockData,
		inBlockTerminalLookup: InBlockEntityLookup<Terminal_GUID>,
		inBlockUserAccountLookup: InBlockEntityLookup<UserAccount_LocalId>
	): ITerminal {
		const {
			entityAlreadyAdded,
			inBlockIndex
		} = this.getEntityInBlockIndex(terminal, IndexedEntityType.TERMINAL, inBlockTerminalLookup)

		if (!entityAlreadyAdded) {
			data.terminals[inBlockIndex] = {
				...this.TERMINAL_WITH_ID,
				GUID: terminal.GUID,
				owner: inBlockUserAccountLookup.inBlockIndexesById.get(terminal.owner._localId) as any
			}
		}

		return inBlockIndex as any
	}

	private async prepareRepositories(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures,
		repositoryMapById: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<void> {
		let repositoryLidsToFindBy: Repository_LocalId[] = []
		let foundRepositories: IRepository[] = []
		for (let repositoryLid of lookups.repositoryInBlockIndexesById.keys()) {
			const foundRepository = repositoryMapById.get(repositoryLid)
			if (foundRepository) {
				foundRepositories.push(foundRepository)
			} else {
				repositoryLidsToFindBy.push(repositoryLid)
			}
		}

		const foundRepository = repositoryMapById.get(repositoryTransactionHistory.repository._localId)
		if (foundRepository) {
			foundRepositories.push(foundRepository)
		} else {
			repositoryLidsToFindBy.push(repositoryTransactionHistory.repository._localId)
		}

		let repositories = []
		if (repositoryLidsToFindBy.length) {
			repositories = await this.repositoryDao.findWithOwnerBy_LocalIds(
				repositoryLidsToFindBy, context)
		}
		foundRepositories = [
			...repositories,
			...foundRepositories
		]

		for (const repository of foundRepositories) {
			const userAccountInBlockIndex = this.registerUserAccountInBlock(
				repository.owner, lookups.userAccountLookup)
			if (lookups.repositoryInBlockIndexesById.has(repository._localId)) {
				const repositoryInBlockIndex = lookups.repositoryInBlockIndexesById.get(repository._localId)
				data.referencedRepositories[repositoryInBlockIndex] =
					this.prepareRepository(repository, userAccountInBlockIndex as any)
			} else {
				if (typeof data.history.repository !== 'string') {
					data.history.repository.owner = userAccountInBlockIndex as any
					data.history.repository._localId = repository._localId
				}
			}
		}
	}

	private async prepareReferencedApplicationProperties(
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures,
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

			let referencedApplicationVersionInBlockIndex
			if (lookups.referencedApplicationVersionInBlockIndexesById.has(referencedApplicationVersion._localId)) {
				referencedApplicationVersionInBlockIndex = lookups.referencedApplicationVersionInBlockIndexesById.get(referencedApplicationVersion._localId)
			} else {
				referencedApplicationVersionInBlockIndex = ++lookups.lastInBlockReferencedApplicationVersionIndex
				lookups.referencedApplicationVersionInBlockIndexesById.set(referencedApplicationVersion._localId, referencedApplicationVersionInBlockIndex)
			}
			lookups.referencedApplicationVersions[referencedApplicationVersionInBlockIndex] = referencedApplicationVersion

			const entity: DbEntity = {
				...this.WITH_ID,
				index: applicationRelation.entity.index,
				applicationVersion: referencedApplicationVersionInBlockIndex
			} as any

			const dbRelation: DbRelation = {
				...this.WITH_ID,
				index: applicationRelation.index,
				entity
			} as any

			data.referencedApplicationRelations.push(dbRelation)
		}
	}

	private prepareApplicationsAndVersions(
		data: IRepositoryBlockData,
		applicationLookup: InBlockEntityLookup<Application_LocalId>,
		lookupVersions: IApplicationVersion[],
		finalApplicationVersions: IApplicationVersion[]
	): void {
		for (let i = 0; i < lookupVersions.length; i++) {
			const applicationVersion = lookupVersions[i]
			const applicationInBlockIndex = this.prepareApplication(
				applicationVersion.application, applicationLookup, data)

			finalApplicationVersions[i] = {
				...this.WITH_ID,
				application: applicationInBlockIndex as any,
				integerVersion: applicationVersion.integerVersion
			} as any
		}
	}

	private prepareApplication(
		application: IApplication,
		applicationLookup: InBlockEntityLookup<Application_LocalId>,
		data: IRepositoryBlockData
	): number {

		const {
			entityAlreadyAdded,
			inBlockIndex
		} = this.getEntityInBlockIndex(application, IndexedEntityType.APPLICATION, applicationLookup)

		if (!entityAlreadyAdded) {
			data.applications[inBlockIndex] = {
				...this.WITH_INDEX,
				domain: {
					...this.WITH_ID,
					name: application.domain.name
				},
				name: application.name
			} as any
		}

		return inBlockIndex
	}

	private prepareRepositoryTransactionHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
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

		const preparedOperationHistory: IOperationHistory[] = []
		for (const operationHistory of repositoryTransactionHistory.operationHistory) {
			preparedOperationHistory.push(this.prepareOperationHistory(
				operationHistory, data, lookups))
		}

		this.prepareNewRepositoryMembers(repositoryTransactionHistory, data, lookups)

		const member = this.addRepositoryMemberToBlock(
			repositoryTransactionHistory.member,
			data,
			lookups,
			repositoryTransactionHistory.isRepositoryCreation
		)

		const preparedRepositoryTransactionHistory: IRepositoryTransactionHistory = {
			...this.WITH_ID,
			isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
			member,
			repository: this.prepareHistoryRepository(
				repositoryTransactionHistory, lookups.userAccountLookup),
			operationHistory: preparedOperationHistory,
			saveTimestamp: repositoryTransactionHistory.saveTimestamp,
			newRepositoryMemberAcceptances: this.prepareRepositoryMemberAcceptances(
				repositoryTransactionHistory, data, lookups),
			newRepositoryMemberInvitations: this.prepareRepositoryMemberInvitations(
				repositoryTransactionHistory, data, lookups),
			transactionHistory: null,
			repositoryTransactionType: RepositoryTransactionType.REMOTE
		}

		// Not needed in prepared version of object that is shared
		delete preparedRepositoryTransactionHistory.transactionHistory
		delete preparedRepositoryTransactionHistory.repositoryTransactionType

		return preparedRepositoryTransactionHistory
	}

	private prepareHistoryRepository(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		inBlockUserAccountLookup: InBlockEntityLookup<UserAccount_LocalId>
	): IRepository {
		if (repositoryTransactionHistory.isRepositoryCreation) {
			const repository = repositoryTransactionHistory.repository
			let userAccountInBlockIndex = this.registerUserAccountInBlock(
				repository.owner, inBlockUserAccountLookup)

			return this.prepareRepository(repository, userAccountInBlockIndex as any)
		} else {
			// When this repositoryTransactionHistory processed at sync-in 
			// the repository should already be loaded in the target database
			// if it's not then it's missing the repositoryTransactionHistory
			// with isRepositoryCreation === true
			return repositoryTransactionHistory.repository.GUID as any
		}
	}

	private prepareNewRepositoryMembers(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): void {
		for (const newRepositoryMember of repositoryTransactionHistory
			.newRepositoryMembers) {
			this.addRepositoryMemberToBlock(
				newRepositoryMember, data, lookups, true
			)
		}
	}

	private prepareRepositoryMemberAcceptances(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): IRepositoryMemberAcceptance[] {
		const preparedRepositoryMemberAcceptances: IRepositoryMemberAcceptance[] = []
		for (const newRepositoryMemberAcceptance of repositoryTransactionHistory
			.newRepositoryMemberAcceptances) {
			preparedRepositoryMemberAcceptances.push({
				...this.WITH_ID,
				createdAt: newRepositoryMemberAcceptance.createdAt,
				acceptingRepositoryMember: this.addRepositoryMemberToBlock(
					newRepositoryMemberAcceptance.acceptingRepositoryMember,
					data,
					lookups,
					false
				),
				invitationPublicSigningKey: newRepositoryMemberAcceptance.invitationPublicSigningKey
			})
		}

		return preparedRepositoryMemberAcceptances
	}

	private prepareRepositoryMemberInvitations(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): IRepositoryMemberInvitation[] {
		const preparedRepositoryMemberInvitations: IRepositoryMemberInvitation[] = []
		for (const newRepositoryMemberInvitation of repositoryTransactionHistory
			.newRepositoryMemberInvitations) {
			preparedRepositoryMemberInvitations.push({
				...this.WITH_ID,
				createdAt: newRepositoryMemberInvitation.createdAt,
				invitationPublicSigningKey: newRepositoryMemberInvitation.invitationPublicSigningKey,
				invitedRepositoryMember: this.addRepositoryMemberToBlock(
					newRepositoryMemberInvitation.invitedRepositoryMember,
					data,
					lookups,
					true
				)
			})
		}

		return preparedRepositoryMemberInvitations
	}

	private prepareOperationHistory(
		operationHistory: IOperationHistory,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): IOperationHistory {
		const dbEntity = operationHistory.entity
		const preparedRecordHistory: IRecordHistory[] = []
		for (const recordHistory of operationHistory.recordHistory) {
			preparedRecordHistory.push(this.prepareRecordHistory(
				recordHistory, dbEntity, data, lookups))
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

		let applicationVersionInBlockIndex
		if (lookups.applicationVersionInBlockIndexesById.has(applicationVersion._localId)) {
			applicationVersionInBlockIndex = lookups.applicationVersionInBlockIndexesById.get(applicationVersion._localId)
		} else {
			applicationVersionInBlockIndex = ++lookups.lastInBlockApplicationVersionIndex
			lookups.applicationVersionInBlockIndexesById.set(applicationVersion._localId, applicationVersionInBlockIndex)
		}
		lookups.applicationVersions[applicationVersionInBlockIndex] = applicationVersion

		const entity: DbEntity = {
			...this.WITH_ID,
			applicationVersion: applicationVersionInBlockIndex,
			index: operationHistory.entity.index
		} as any

		const preparedOperationHistory: IOperationHistory = {
			...this.WITH_ID,
			actor: this.getActorInBlockIndex(operationHistory.actor, lookups),
			changeType: operationHistory.changeType,
			entity,
			recordHistory: preparedRecordHistory,
			orderNumber: null,
			repositoryTransactionHistory: null
		}

		// Not needed in prepared version of object that is shared
		delete preparedOperationHistory.orderNumber
		delete preparedOperationHistory.repositoryTransactionHistory

		return preparedOperationHistory
	}

	private prepareRecordHistory(
		recordHistory: IRecordHistory,
		dbEntity: DbEntity,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): IRecordHistory {
		const dbColumMapByIndex: Map<DbColumn_Index, DbColumn> = new Map()
		for (const dbColumn of dbEntity.columns) {
			dbColumMapByIndex.set(dbColumn.index, dbColumn)
		}
		const newValues: IRecordHistoryNewValue[] = []
		for (const newValue of recordHistory.newValues) {
			const dbColumn = dbColumMapByIndex.get(newValue.columnIndex)
			if (dbColumn.name !== this.dictionary.SystemWideOperationId
				.columns.SYSTEM_WIDE_OPERATION_LID) {
				newValues.push(this.prepareNewValue(
					newValue, dbColumn, data, lookups))
			}
		}
		const oldValues: IRecordHistoryOldValue[] = []
		for (const oldValue of recordHistory.oldValues) {
			const dbColumn = dbColumMapByIndex.get(oldValue.columnIndex)
			oldValues.push(this.prepareOldValue(
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
			oldValues?: IRecordHistoryOldValue[],
			operationHistory: IOperationHistory
		} = {
			...this.RECORD_HISTORY,
		}
		if (actor._localId !== recordHistory.operationHistory.actor._localId) {
			baseObject.actor = this.getActorInBlockIndex(actor, lookups)
		}
		if (newValues.length) {
			baseObject.newValues = newValues
		}
		if (oldValues.length) {
			baseObject.oldValues = oldValues
		}

		return {
			...baseObject,
			_actorRecordId: recordHistory._actorRecordId
		}
	}

	private getActorInBlockIndex(
		actor: IActor,
		lookups: InBlockLookupStructures
	): IActor {
		if (!actor) {
			return null
		}
		return this.getActorInBlockIndexById(actor._localId, lookups) as any as IActor
	}

	private getActorInBlockIndexById(
		actorLid: Actor_LocalId,
		lookups: InBlockLookupStructures
	): number {
		let actorInBlockIndex
		if (lookups.actorInBlockIndexesById.has(actorLid)) {
			actorInBlockIndex = lookups.actorInBlockIndexesById.get(actorLid)
		} else {
			actorInBlockIndex = ++lookups.lastInBlockActorIndex
			lookups.actorInBlockIndexesById.set(actorLid, actorInBlockIndex)
		}

		return actorInBlockIndex
	}

	private prepareNewValue(
		newValue: IRecordHistoryNewValue,
		dbColumn: DbColumn,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): IRecordHistoryNewValue {
		return this.prepareValue(
			newValue, dbColumn, data, lookups, 'newValue')
	}

	private prepareOldValue(
		oldValue: IRecordHistoryOldValue,
		dbColumn: DbColumn,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures
	): IRecordHistoryOldValue {
		return this.prepareValue(
			oldValue, dbColumn, data, lookups, 'oldValue')
	}

	private prepareValue(
		valueRecord: IRecordHistoryNewValue | IRecordHistoryNewValue,
		dbColumn: DbColumn,
		data: IRepositoryBlockData,
		lookups: InBlockLookupStructures,
		valueFieldName: 'newValue' | 'oldValue'
	): IRecordHistoryNewValue {
		let value = valueRecord[valueFieldName]
		let serailizedValue = value

		if (this.applicationUtils.isManyRelationColumn(dbColumn as DbColumn)) {
			const oneSideDbEntity = this.applicationUtils
				.getOneSideEntityOfManyRelationColumn(dbColumn as DbColumn)
			if (this.dictionary.isActor(oneSideDbEntity)) {
				serailizedValue = this.getActorInBlockIndexById(value, lookups)
			} else if (this.dictionary.isRepository(oneSideDbEntity)) {
				serailizedValue = this.getpreparedRepositoryId(value, lookups)
			} else if (this.dictionary.isTerminal(oneSideDbEntity)) {
				const terminalInBlockIndex = this.addTerminalToBlock(
					value, data, lookups.terminalLookup,
					lookups.userAccountLookup)
				serailizedValue = terminalInBlockIndex
			} else if (this.dictionary.isUserAccount(oneSideDbEntity)) {
				const userAccountInBlockIndex = this.registerUserAccountInBlock(
					value, lookups.userAccountLookup)
				serailizedValue = userAccountInBlockIndex
			} else if (this.dictionary.isApplicationRelation(oneSideDbEntity)) {
				serailizedValue = this.getpreparedReferencedApplicationRelationId(
					value, lookups)
			}
		}

		if (this.dictionary.isActorRelationColumn(dbColumn)) {
			serailizedValue = this.getActorInBlockIndexById(value, lookups)
		}
		if (this.dictionary.isRepositoryRelationColumn(dbColumn)) {
			serailizedValue = this.getpreparedRepositoryId(value, lookups)
		}

		return {
			...this.WITH_RECORD_HISTORY,
			columnIndex: valueRecord.columnIndex,
			[valueFieldName]: serailizedValue
		}
	}

	private getpreparedRepositoryId(
		repositoryLocalId: number,
		lookups: InBlockLookupStructures
	): number {
		if (repositoryLocalId === lookups.blockRepository._localId) {
			return -1
		}

		let serailizedValue = lookups.repositoryInBlockIndexesById.get(repositoryLocalId)
		if (serailizedValue === undefined) {
			lookups.lastInBlockRepositoryIndex++
			serailizedValue = lookups.lastInBlockRepositoryIndex
			lookups.repositoryInBlockIndexesById.set(repositoryLocalId, serailizedValue)
		}
		return serailizedValue
	}

	private getpreparedReferencedApplicationRelationId(
		applicationRelationLocalId: number,
		lookups: InBlockLookupStructures
	): number {
		let serailizedValue = lookups.referencedApplicationRelationIndexesById
			.get(applicationRelationLocalId)
		if (serailizedValue === undefined) {
			lookups.lastInBlockReferencedApplicationRelationIndex++
			serailizedValue = lookups.lastInBlockReferencedApplicationRelationIndex
			lookups.referencedApplicationRelationIndexesById
				.set(applicationRelationLocalId, serailizedValue)
		}
		return serailizedValue
	}

	private prepareRepository(
		repository: IRepository,
		owner: IUserAccount
	): IRepository {
		return {
			_localId: repository._localId,
			ageSuitability: repository.ageSuitability,
			createdAt: repository.createdAt,
			fullApplicationName: repository.fullApplicationName,
			GUID: repository.GUID,
			immutable: repository.immutable,
			internal: repository.internal,
			isPublic: repository.isPublic,
			name: repository.name,
			source: repository.source,
			uiEntryUri: repository.uiEntryUri,
			owner
		} as any
	}

}
