import { IApplicationRelationDao } from '@airport/airspace/dist/app/bundle';
import { RepositorySynchronizationData, RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { UserAccount_GUID } from "@airport/aviation-communication";
import {
	Inject,
	Injected
} from '@airport/direction-indicator';
import {
	Actor_LocalId,
	ApplicationColumn_Index,
	ApplicationRelation_LocalId,
	ApplicationVersion_LocalId,
	Application_LocalId,
	DbApplication,
	DbApplicationVersion,
	DbColumn,
	DbEntity,
	Dictionary,
	IActor,
	IDbApplicationUtils,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
	IRepository,
	IRepositoryTransactionHistory,
	ITerminal,
	IUserAccount,
	RepositoryTransactionType,
	Repository_LocalId,
	Terminal_GUID
} from "@airport/ground-control";
import {
	IActorDao,
	IRepositoryDao
} from "@airport/holding-pattern/dist/app/bundle";
import { IApplicationUtils } from '@airport/tarmaq-query';

export interface ISyncOutDataSerializer {

	serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[]
		messages: RepositorySynchronizationMessage[]
	}>
}

export interface IWithId {
	_localId: number
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
	applicationVersionInMessageIndexesById: Map<ApplicationVersion_LocalId, number>
	applicationVersions: DbApplicationVersion[]
	lastInMessageActorIndex: number
	lastInMessageReferencedApplicationRelationIndex: number
	lastInMessageApplicationVersionIndex: number
	lastInMessageReferencedApplicationRelation: number
	lastInMessageReferencedApplicationVersionIndex: number
	lastInMessageRepositoryIndex: number
	messageRepository: IRepository
	referencedApplicationRelationIndexesById: Map<ApplicationRelation_LocalId, number>
	referencedApplicationVersionInMessageIndexesById: Map<ApplicationVersion_LocalId, number>
	referencedApplicationVersions: DbApplicationVersion[]
	repositoryInMessageIndexesById: Map<Repository_LocalId, number>
	terminalLookup: InMessageTerminalLookup
	userAccountLookup: InMessageUserAccountLookup
}

export interface InMessageApplicationLookup {
	inMessageIndexesById: Map<Application_LocalId, number>
	lastInMessageIndex: number
}
export interface InMessageTerminalLookup {
	inMessageIndexesByGUID: Map<Terminal_GUID, number>
	lastInMessageIndex: number
}
export interface InMessageUserAccountLookup {
	inMessageIndexesByGUID: Map<UserAccount_GUID, number>
	lastInMessageIndex: number
}

@Injected()
export class SyncOutDataSerializer
	implements ISyncOutDataSerializer {

	@Inject()
	actorDao: IActorDao

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	applicationRelationDao: IApplicationRelationDao

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	repositoryDao: IRepositoryDao

	WITH_ID: IWithId = {} as any
	WITH_RECORD_HISTORY: IWithRecordHistory = {} as any
	WITH_INDEX: IWithIndex = {} as any

	async serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[]
		messages: RepositorySynchronizationMessage[]
	}> {
		let historiesToSend: IRepositoryTransactionHistory[] = []
		const messages: RepositorySynchronizationMessage[] = []
		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			if (repositoryTransactionHistory.repositoryTransactionType !== RepositoryTransactionType.LOCAL) {
				continue
			}
			const message = await this.serializeMessage(repositoryTransactionHistory)

			historiesToSend.push(repositoryTransactionHistory)
			messages.push(message)
		}

		return {
			historiesToSend,
			messages
		}
	}

	async serializeMessage(
		repositoryTransactionHistory: IRepositoryTransactionHistory
	): Promise<RepositorySynchronizationMessage> {
		const lookups: InMessageLookupStructures = {
			actorInMessageIndexesById: new Map(),
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
			terminalLookup: {
				inMessageIndexesByGUID: new Map(),
				lastInMessageIndex: -1
			},
			userAccountLookup: {
				inMessageIndexesByGUID: new Map(),
				lastInMessageIndex: -1
			}
		}

		const data: RepositorySynchronizationData = {
			actors: [],
			applicationVersions: [],
			applications: [],
			history: null,
			// Repositories may reference records in other repositories
			referencedApplicationVersions: [],
			referencedApplicationRelations: [],
			referencedRepositories: [],
			userAccounts: [],
			terminals: []
		}

		const message: RepositorySynchronizationMessage = {
			data
		}
		data.history = this.serializeRepositoryTransactionHistory(
			repositoryTransactionHistory, message.data, lookups)

		// TODO: replace db lookups with TerminalState lookups where possible
		await this.serializeRepositories(repositoryTransactionHistory, data,
			lookups)
		const inMessageApplicationLookup = await this.serializeActorsUserAccountsAndTerminals(
			data, lookups)
		await this.serializeApplicationsAndVersions(data,
			inMessageApplicationLookup, lookups.applicationVersions, data.applicationVersions)
		await this.serializeReferencedApplicationProperties(data, lookups)
		await this.serializeApplicationsAndVersions(data,
			inMessageApplicationLookup, lookups.referencedApplicationVersions, data.referencedApplicationVersions)

		return message
	}

	private async serializeActorsUserAccountsAndTerminals(
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): Promise<InMessageApplicationLookup> {
		let actorIdsToFindBy: Actor_LocalId[] = []
		for (let actorId of lookups.actorInMessageIndexesById.keys()) {
			actorIdsToFindBy.push(actorId)
		}
		const actors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(actorIdsToFindBy)

		this.serializeUserAccounts(actors, data, lookups.userAccountLookup)
		this.serializeActorTerminals(actors, data,
			lookups.terminalLookup,
			lookups.userAccountLookup)

		const inMessageApplicationLookup: InMessageApplicationLookup = {
			lastInMessageIndex: -1,
			inMessageIndexesById: new Map()
		}
		for (const actor of actors) {
			const applicationInMessageIndex = this.serializeApplication(
				actor.application, inMessageApplicationLookup, data)

			const actorInMessageIndex = lookups.actorInMessageIndexesById.get(actor._localId)
			data.actors[actorInMessageIndex] = {
				...this.WITH_ID,
				application: applicationInMessageIndex as any,
				terminal: lookups.terminalLookup.inMessageIndexesByGUID.get(actor.terminal.GUID) as any,
				userAccount: lookups.userAccountLookup.inMessageIndexesByGUID.get(actor.userAccount.GUID) as any,
				GUID: actor.GUID
			}
		}

		return inMessageApplicationLookup
	}

	private serializeActorTerminals(
		actors: IActor[],
		data: RepositorySynchronizationData,
		inMessageTerminalLookup: InMessageTerminalLookup,
		inMessageUserAccountLookup: InMessageUserAccountLookup
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
		data: RepositorySynchronizationData,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): void {
		for (const actor of actors) {
			this.addUserAccountToMessage(actor.userAccount, data, inMessageUserAccountLookup)
			this.addUserAccountToMessage(actor.terminal.owner, data, inMessageUserAccountLookup)
		}
	}

	private addUserAccountToMessage(
		userAccount: IUserAccount,
		data: RepositorySynchronizationData,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): number {
		const userAccountAlreadyAdded = inMessageUserAccountLookup.inMessageIndexesByGUID.has(userAccount.GUID)
		let userAccountInMessageIndex = this.getUserAccountInMessageIndex(userAccount, inMessageUserAccountLookup)

		if (!userAccountAlreadyAdded) {
			data.userAccounts[userAccountInMessageIndex] = {
				...this.WITH_ID,
				username: userAccount.username,
				GUID: userAccount.GUID
			}
		}

		return userAccountInMessageIndex
	}

	private getUserAccountInMessageIndex(
		userAccount: IUserAccount,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): number {
		if (inMessageUserAccountLookup.inMessageIndexesByGUID.has(userAccount.GUID)) {
			return inMessageUserAccountLookup.inMessageIndexesByGUID.get(userAccount.GUID)
		}
		let userAccountInMessageIndex = ++inMessageUserAccountLookup.lastInMessageIndex
		inMessageUserAccountLookup.inMessageIndexesByGUID.set(userAccount.GUID, userAccountInMessageIndex)

		return userAccountInMessageIndex
	}

	private addTerminalToMessage(
		terminal: ITerminal,
		data: RepositorySynchronizationData,
		inMessageTerminalLookup: InMessageTerminalLookup,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): number {
		const terminalAlreadyAdded = inMessageTerminalLookup
			.inMessageIndexesByGUID.has(terminal.GUID)
		let terminalInMessageIndex = this.getTerminalInMessageIndex(
			terminal, inMessageTerminalLookup)

		if (!terminalAlreadyAdded) {
			data.terminals[terminalInMessageIndex] = {
				...this.WITH_ID,
				GUID: terminal.GUID,
				owner: inMessageUserAccountLookup.inMessageIndexesByGUID.get(terminal.owner.GUID) as any
			}
		}

		return terminalInMessageIndex
	}

	private getTerminalInMessageIndex(
		userAccount: ITerminal,
		inMessageTerminalLookup: InMessageTerminalLookup
	): number {
		if (inMessageTerminalLookup.inMessageIndexesByGUID.has(userAccount.GUID)) {
			return inMessageTerminalLookup.inMessageIndexesByGUID.get(userAccount.GUID)
		}
		let terminalInMessageIndex = ++inMessageTerminalLookup.lastInMessageIndex
		inMessageTerminalLookup.inMessageIndexesByGUID.set(userAccount.GUID, terminalInMessageIndex)

		return terminalInMessageIndex
	}

	private async serializeRepositories(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): Promise<void> {
		let repositoryIdsToFindBy: Repository_LocalId[] = []
		for (let repositoryId of lookups.repositoryInMessageIndexesById.keys()) {
			repositoryIdsToFindBy.push(repositoryId)
		}
		repositoryIdsToFindBy.push(repositoryTransactionHistory._localId)
		const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds(repositoryIdsToFindBy)

		for (const repository of repositories) {
			let userAccountInMessageIndex = this.getUserAccountInMessageIndex(repository.owner, lookups.userAccountLookup)
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
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): Promise<void> {
		let applicationRelationIdsToFindBy: ApplicationRelation_LocalId[] = []
		for (let applicationRelationLocalId of lookups.referencedApplicationRelationIndexesById.keys()) {
			applicationRelationIdsToFindBy.push(applicationRelationLocalId)
		}

		const applicationRelations = await this.applicationRelationDao
			.findAllByLocalIdsWithApplications(applicationRelationIdsToFindBy)

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

			data.referencedApplicationRelations.push({
				...this.WITH_ID,
				index: applicationRelation.index,
				entity: {
					...this.WITH_ID,
					index: applicationRelation.entity.index,
					applicationVersion: referencedApplicationVersionInMessageIndex
				}
			})
		}
	}

	private serializeApplicationsAndVersions(
		data: RepositorySynchronizationData,
		applicationLookup: InMessageApplicationLookup,
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
			}
		}
	}

	private serializeApplication(
		application: DbApplication,
		applicationLookup: InMessageApplicationLookup,
		data: RepositorySynchronizationData
	): number {
		let applicationInMessageIndex
		if (applicationLookup.inMessageIndexesById.has(application.index)) {
			applicationInMessageIndex = applicationLookup
				.inMessageIndexesById.get(application.index)
		} else {
			applicationInMessageIndex = ++applicationLookup.lastInMessageIndex
			applicationLookup.inMessageIndexesById
				.set(application.index, applicationInMessageIndex)
			data.applications[applicationInMessageIndex] = {
				...this.WITH_INDEX,
				domain: {
					...this.WITH_ID,
					name: application.domain.name
				},
				name: application.name
			}
		}

		return applicationInMessageIndex
	}

	private serializeRepositoryTransactionHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: RepositorySynchronizationData,
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
				operationHistory, data, lookups))
		}

		return {
			...this.WITH_ID,
			isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
			repository: this.serializeHistoryRepository(
				repositoryTransactionHistory, data, lookups.userAccountLookup),
			operationHistory: serializedOperationHistory,
			saveTimestamp: repositoryTransactionHistory.saveTimestamp,
			GUID: repositoryTransactionHistory.GUID
		}
	}

	private serializeHistoryRepository(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		data: RepositorySynchronizationData,
		inMessageUserAccountLookup: InMessageUserAccountLookup
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

	private serializeOperationHistory(
		operationHistory: IOperationHistory,
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): IOperationHistory {
		const dbEntity = operationHistory.entity
		const serializedRecordHistory: IRecordHistory[] = []
		for (const recordHistory of operationHistory.recordHistory) {
			serializedRecordHistory.push(this.serializeRecordHistory(
				operationHistory, recordHistory, dbEntity, data, lookups))
		}

		const entity = operationHistory.entity
		// Should be populated - coming from TerminalStore
		// if (typeof entity !== 'object') {
		// 	throw new Error(`OperationHistory.entity must be populated`)
		// }
		// if (typeof entity.index !== 'number') {
		// 	throw new Error(`OperationHistory.entity.index must be present`)
		// }
		const applicationVersion = entity.applicationVersion
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

		return {
			...this.WITH_ID,
			actor: this.getActorInMessageIndex(operationHistory.actor, lookups),
			changeType: operationHistory.changeType,
			entity: {
				...this.WITH_ID,
				applicationVersion: applicationVersionInMessageIndex,
				index: operationHistory.entity.index
			},
			recordHistory: serializedRecordHistory
		}
	}

	private serializeRecordHistory(
		operationHistory: IOperationHistory,
		recordHistory: IRecordHistory,
		dbEntity: DbEntity,
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): IRecordHistory {
		const dbColumMapByIndex: Map<ApplicationColumn_Index, DbColumn> = new Map()
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
			actor?: IActor,
			newValues?: IRecordHistoryNewValue[],
			oldValues?: IRecordHistoryOldValue[]
		} = {
			...this.WITH_ID,
		}
		if (actor._localId !== operationHistory.actor._localId) {
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
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): IRecordHistoryNewValue {
		return this.serializeValue(
			newValue, dbColumn, data, lookups, 'newValue')
	}

	private serializeOldValue(
		oldValue: IRecordHistoryOldValue,
		dbColumn: DbColumn,
		data: RepositorySynchronizationData,
		lookups: InMessageLookupStructures
	): IRecordHistoryOldValue {
		return this.serializeValue(
			oldValue, dbColumn, data, lookups, 'oldValue')
	}

	private serializeValue(
		valueRecord: IRecordHistoryNewValue | IRecordHistoryNewValue,
		dbColumn: DbColumn,
		data: RepositorySynchronizationData,
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

		if (/.*_AID_[\d]+$/.test(dbColumn.name)
			&& dbColumn.manyRelationColumns.length) {
			serailizedValue = this.getActorInMessageIndexById(value, lookups)
		}
		if (/.*_RID_[\d]+$/.test(dbColumn.name)
			&& dbColumn.manyRelationColumns.length) {
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
		owner: ITerminal
	): IRepository {
		return {
			...this.WITH_ID,
			ageSuitability: repository.ageSuitability,
			createdAt: repository.createdAt,
			immutable: repository.immutable,
			owner,
			source: repository.source,
			GUID: repository.GUID
		}
	}

}
