import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IApplication,
	IApplicationColumn,
	IApplicationEntity,
	IApplicationVersion
} from "@airport/airspace";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Application_LocalId, ApplicationColumn_Index, airEntity } from "@airport/ground-control";
import {
	Actor_LocalId,
	IActor,
	IActorDao,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	RepositoryTransactionType,
	Repository_LocalId
} from "@airport/holding-pattern/dist/app/bundle";
import {
	IUserAccount,
	Terminal_GUID,
	UserAccount_GUID
} from "@airport/travel-document-checkpoint/dist/app/bundle";

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

export const WITH_ID: IWithId = {} as any
export const WITH_RECORD_HISTORY: IWithRecordHistory = {} as any
export const WITH_INDEX: IWithIndex = {} as any

export interface InMessageLookupStructures {
	actorInMessageIndexesById: Map<Actor_LocalId, number>
	applicationVersionInMessageIndexesById: Map<Actor_LocalId, number>
	applicationVersions: IApplicationVersion[]
	lastInMessageActorIndex: number
	lastInMessageApplicationVersionIndex: number
	lastInMessageRepositoryIndex: number
	messageRepository: IRepository
	repositoryInMessageIndexesById: Map<Repository_LocalId, number>
}

export interface InMessageApplicationLookup {
	inMessageIndexesById: Map<Application_LocalId, number>
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
	repositoryDao: IRepositoryDao

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
			applicationVersionInMessageIndexesById: new Map(),
			applicationVersions: [],
			lastInMessageActorIndex: -1,
			lastInMessageApplicationVersionIndex: -1,
			lastInMessageRepositoryIndex: -1,
			messageRepository: repositoryTransactionHistory.repository,
			repositoryInMessageIndexesById: new Map()
		}
		const inMessageUserAccountLookup: InMessageUserAccountLookup = {
			inMessageIndexesByGUID: new Map(),
			lastInMessageIndex: -1
		}

		const message: RepositorySynchronizationMessage = {
			actors: [],
			applicationVersions: [],
			applications: [],
			history: null,
			// Repositories may reference records in other repositories
			referencedRepositories: [],
			userAccounts: [],
			terminals: []
		}
		message.history = this.serializeRepositoryTransactionHistory(
			repositoryTransactionHistory, message, lookups, inMessageUserAccountLookup)

		// TODO: replace db lookups with TerminalState lookups where possible
		await this.serializeRepositories(repositoryTransactionHistory, message,
			lookups, inMessageUserAccountLookup)
		const inMessageApplicationLookup = await this.serializeActorsUserAccountsAndTerminals(
			message, lookups, inMessageUserAccountLookup)
		await this.serializeApplicationsAndVersions(message,
			inMessageApplicationLookup, lookups)

		return message
	}

	private async serializeActorsUserAccountsAndTerminals(
		message: RepositorySynchronizationMessage,
		lookups: InMessageLookupStructures,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): Promise<InMessageApplicationLookup> {
		let actorIdsToFindBy: Actor_LocalId[] = []
		for (let actorId of lookups.actorInMessageIndexesById.keys()) {
			actorIdsToFindBy.push(actorId)
		}
		const actors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(actorIdsToFindBy)

		this.serializeUserAccounts(actors, message, inMessageUserAccountLookup)
		const terminalInMessageIndexesById =
			this.serializeTerminals(actors, message, inMessageUserAccountLookup)

		const inMessageApplicationLookup: InMessageApplicationLookup = {
			lastInMessageIndex: -1,
			inMessageIndexesById: new Map()
		}
		for (const actor of actors) {
			const applicationInMessageIndex = this.serializeApplication(
				actor.application, inMessageApplicationLookup, message)

			const actorInMessageIndex = lookups.actorInMessageIndexesById.get(actor._localId)
			message.actors[actorInMessageIndex] = {
				...WITH_ID,
				application: applicationInMessageIndex as any,
				terminal: terminalInMessageIndexesById.get(actor.terminal.GUID) as any,
				userAccount: inMessageUserAccountLookup.inMessageIndexesByGUID.get(actor.userAccount.GUID) as any,
				GUID: actor.GUID
			}
		}

		return inMessageApplicationLookup
	}

	private serializeTerminals(
		actors: IActor[],
		message: RepositorySynchronizationMessage,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): Map<Terminal_GUID, number> {
		let lastInMessageTerminalIndex = -1
		const terminalInMessageIndexesByGUID: Map<Terminal_GUID, number> = new Map()
		for (const actor of actors) {
			let terminal = actor.terminal
			if (terminalInMessageIndexesByGUID.has(terminal.GUID)) {
				continue
			}
			const terminalInMessageIndex = ++lastInMessageTerminalIndex
			terminalInMessageIndexesByGUID.set(terminal.GUID, terminalInMessageIndex)
			message.terminals[terminalInMessageIndex] = {
				...WITH_ID,
				GUID: terminal.GUID,
				owner: inMessageUserAccountLookup.inMessageIndexesByGUID.get(terminal.owner.GUID) as any
			}
		}

		return terminalInMessageIndexesByGUID
	}

	private serializeUserAccounts(
		actors: IActor[],
		message: RepositorySynchronizationMessage,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): void {
		for (const actor of actors) {
			this.addUserAccountToMessage(actor.userAccount, message, inMessageUserAccountLookup)
			this.addUserAccountToMessage(actor.terminal.owner, message, inMessageUserAccountLookup)
		}
	}

	private addUserAccountToMessage(
		userAccount: IUserAccount,
		message: RepositorySynchronizationMessage,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): number {
		let userAccountInMessageIndex = this.getUserAccountInMessageIndex(userAccount, inMessageUserAccountLookup)

		message.userAccounts[userAccountInMessageIndex] = {
			...WITH_ID,
			username: userAccount.username,
			GUID: userAccount.GUID
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

	private async serializeRepositories(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		message: RepositorySynchronizationMessage,
		lookups: InMessageLookupStructures,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): Promise<void> {
		let repositoryIdsToFindBy: Repository_LocalId[] = []
		for (let repositoryId of lookups.repositoryInMessageIndexesById.keys()) {
			repositoryIdsToFindBy.push(repositoryId)
		}
		repositoryIdsToFindBy.push(repositoryTransactionHistory._localId)
		const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds(repositoryIdsToFindBy)

		for (const repository of repositories) {
			let userAccountInMessageIndex = this.getUserAccountInMessageIndex(repository.owner, inMessageUserAccountLookup)
			if (lookups.repositoryInMessageIndexesById.has(repository._localId)) {
				const repositoryInMessageIndex = lookups.repositoryInMessageIndexesById.get(repository._localId)
				message.referencedRepositories[repositoryInMessageIndex] =
					this.serializeRepository(repository, userAccountInMessageIndex as any)
			} else {
				if (typeof message.history.repository !== 'string') {
					message.history.repository.owner = userAccountInMessageIndex as any
					message.history.repository._localId = repository._localId
				}
			}
		}
	}

	private serializeApplicationsAndVersions(
		message: RepositorySynchronizationMessage,
		inMessageApplicationLookup: InMessageApplicationLookup,
		lookups: InMessageLookupStructures
	): void {
		for (let i = 0; i < lookups.applicationVersions.length; i++) {
			const applicationVersion = lookups.applicationVersions[i]
			const applicationInMessageIndex = this.serializeApplication(
				applicationVersion.application, inMessageApplicationLookup, message)

			message.applicationVersions[i] = {
				...WITH_ID,
				application: applicationInMessageIndex as any,
				integerVersion: applicationVersion.integerVersion
			}
		}
	}

	private serializeApplication(
		application: IApplication,
		inMessageApplicationLookup: InMessageApplicationLookup,
		message: RepositorySynchronizationMessage
	): number {
		let applicationInMessageIndex
		if (inMessageApplicationLookup.inMessageIndexesById.has(application.index)) {
			applicationInMessageIndex = inMessageApplicationLookup
				.inMessageIndexesById.get(application.index)
		} else {
			applicationInMessageIndex = ++inMessageApplicationLookup.lastInMessageIndex
			inMessageApplicationLookup.inMessageIndexesById
				.set(application.index, applicationInMessageIndex)
			message.applications[applicationInMessageIndex] = {
				...WITH_INDEX,
				domain: {
					...WITH_ID,
					name: application.domain.name
				},
				name: application.name
			}
		}

		return applicationInMessageIndex
	}

	private serializeRepositoryTransactionHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		message: RepositorySynchronizationMessage,
		lookups: InMessageLookupStructures,
		inMessageUserAccountLookup: InMessageUserAccountLookup
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
				operationHistory, lookups))
		}

		return {
			...WITH_ID,
			isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
			repository: this.serializeHistoryRepository(
				repositoryTransactionHistory, message, inMessageUserAccountLookup),
			operationHistory: serializedOperationHistory,
			saveTimestamp: repositoryTransactionHistory.saveTimestamp,
			GUID: repositoryTransactionHistory.GUID
		}
	}

	private serializeHistoryRepository(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		message: RepositorySynchronizationMessage,
		inMessageUserAccountLookup: InMessageUserAccountLookup
	): IRepository {
		if (repositoryTransactionHistory.isRepositoryCreation) {
			const repository = repositoryTransactionHistory.repository
			let userAccountInMessageIndex = this.addUserAccountToMessage(
				repository.owner, message, inMessageUserAccountLookup)

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
		lookups: InMessageLookupStructures
	): IOperationHistory {
		const dbEntity = operationHistory.entity
		const serializedRecordHistory: IRecordHistory[] = []
		for (const recordHistory of operationHistory.recordHistory) {
			serializedRecordHistory.push(this.serializeRecordHistory(
				operationHistory, recordHistory, dbEntity, lookups))
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
			...WITH_ID,
			actor: this.getActorInMessageIndex(operationHistory.actor, lookups),
			changeType: operationHistory.changeType,
			entity: {
				...WITH_ID,
				applicationVersion: applicationVersionInMessageIndex,
				index: operationHistory.entity.index
			},
			recordHistory: serializedRecordHistory
		}
	}

	private serializeRecordHistory(
		operationHistory: IOperationHistory,
		recordHistory: IRecordHistory,
		dbEntity: IApplicationEntity,
		lookups: InMessageLookupStructures
	): IRecordHistory {
		const dbColumMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn> = new Map()
		for (const dbColumn of dbEntity.columns) {
			dbColumMapByIndex.set(dbColumn.index, dbColumn)
		}
		const newValues: IRecordHistoryNewValue[] = []
		for (const newValue of recordHistory.newValues) {
			const dbColumn = dbColumMapByIndex.get(newValue.columnIndex)
			newValues.push(this.serializeNewValue(newValue, dbColumn, lookups))
		}
		const oldValues: IRecordHistoryOldValue[] = []
		for (const oldValue of recordHistory.oldValues) {
			const dbColumn = dbColumMapByIndex.get(oldValue.columnIndex)
			oldValues.push(this.serializeOldValue(oldValue, dbColumn, lookups))
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
			...WITH_ID,
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
		dbColumn: IApplicationColumn,
		lookups: InMessageLookupStructures
	): IRecordHistoryNewValue {
		return this.serializeValue(newValue, dbColumn, lookups, 'newValue')
	}

	private serializeOldValue(
		oldValue: IRecordHistoryOldValue,
		dbColumn: IApplicationColumn,
		lookups: InMessageLookupStructures
	): IRecordHistoryOldValue {
		return this.serializeValue(oldValue, dbColumn, lookups, 'oldValue')
	}

	private serializeValue(
		valueRecord: IRecordHistoryNewValue | IRecordHistoryNewValue,
		dbColumn: IApplicationColumn,
		lookups: InMessageLookupStructures,
		valueFieldName: 'newValue' | 'oldValue'
	): IRecordHistoryNewValue {
		let value = valueRecord[valueFieldName]
		let serailizedValue = value
		switch (dbColumn.name) {
			case airEntity.SOURCE_ACTOR_ID: {
				serailizedValue = this.getActorInMessageIndexById(value, lookups)
				break
			}
			case airEntity.SOURCE_REPOSITORY_ID: {
				serailizedValue = this.getSerializedRepositoryId(value, lookups)
				break
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
			...WITH_RECORD_HISTORY,
			columnIndex: valueRecord.columnIndex,
			[valueFieldName]: serailizedValue
		}
	}

	private getSerializedRepositoryId(
		value: number,
		lookups: InMessageLookupStructures
	) {
		if (value === lookups.messageRepository._localId) {
			return -1
		}

		let serailizedValue = lookups.repositoryInMessageIndexesById.get(value)
		if (serailizedValue === undefined) {
			lookups.lastInMessageRepositoryIndex++
			serailizedValue = lookups.lastInMessageRepositoryIndex
			lookups.repositoryInMessageIndexesById.set(value, serailizedValue)
		}
		return serailizedValue
	}

	private serializeRepository(
		repository: IRepository,
		owner: IUserAccount
	): IRepository {
		return {
			...WITH_ID,
			ageSuitability: repository.ageSuitability,
			createdAt: repository.createdAt,
			immutable: repository.immutable,
			owner,
			source: repository.source,
			GUID: repository.GUID
		}
	}

}
