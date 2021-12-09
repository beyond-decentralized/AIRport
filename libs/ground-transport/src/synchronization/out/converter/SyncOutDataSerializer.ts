import {
	IApplication,
	IApplicationColumn,
	IApplicationEntity,
	IApplicationVersion
} from "@airport/airspace";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import {
	container,
	DI
} from "@airport/di";
import { Application_Id, ColumnIndex, repositoryEntity } from "@airport/ground-control";
import {
	ACTOR_DAO,
	Actor_Id,
	IActor,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
	IRepository,
	IRepositoryTransactionHistory,
	RepositoryTransactionType,
	REPOSITORY_DAO,
	Repository_Id
} from "@airport/holding-pattern";
import { IUser, TmTerminal_Id, User_Id, User_UuId } from "@airport/travel-document-checkpoint";
import { SYNC_OUT_DATA_SERIALIZER } from "../../../tokens";

export interface ISyncOutDataSerializer {

	serialize(
		repositoryTransactionHistories: IRepositoryTransactionHistory[]
	): Promise<{
		historiesToSend: IRepositoryTransactionHistory[]
		messages: RepositorySynchronizationMessage[]
	}>
}

export interface IWithId {
	id: number
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
	actorInMessageIndexesById: Map<Actor_Id, number>
	applicationVersionInMessageIndexesById: Map<Actor_Id, number>
	applicationVersions: IApplicationVersion[]
	lastInMessageActorIndex: number
	lastInMessageApplicationVersionIndex: number
	lastInMessageRepositoryIndex: number
	messageRepository: IRepository
	repositoryInMessageIndexesById: Map<Repository_Id, number>
}

export interface InMessageApplicationLookup {
	inMessageIndexesById: Map<Application_Id, number>
	lastInMessageIndex: number
}
export interface InMessageUserLookup {
	inMessageIndexesById: Map<User_Id, number>
	lastInMessageIndex: number
}

export class SyncOutDataSerializer
	implements ISyncOutDataSerializer {

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
		const inMessageUserLookup: InMessageUserLookup = {
			inMessageIndexesById: new Map(),
			lastInMessageIndex: -1
		}

		const message: RepositorySynchronizationMessage = {
			actors: [],
			applicationVersions: [],
			applications: [],
			history: null,
			// Repositories may reference records in other repositories
			referencedRepositories: [],
			users: [],
			terminals: []
		}
		message.history = this.serializeRepositoryTransactionHistory(
			repositoryTransactionHistory, message, lookups, inMessageUserLookup)

		// TODO: replace db lookups with TerminalState lookups where possible
		await this.serializeRepositories(repositoryTransactionHistory, message,
			lookups, inMessageUserLookup)
		const inMessageApplicationLookup = await this.serializeActorsUsersAndTerminals(
			message, lookups, inMessageUserLookup)
		await this.serializeApplicationsAndVersions(message,
			inMessageApplicationLookup, lookups)

		return message
	}

	private async serializeActorsUsersAndTerminals(
		message: RepositorySynchronizationMessage,
		lookups: InMessageLookupStructures,
		inMessageUserLookup: InMessageUserLookup
	): Promise<InMessageApplicationLookup> {
		let actorIdsToFindBy: Actor_Id[] = []
		for (let actorId of lookups.actorInMessageIndexesById.keys()) {
			actorIdsToFindBy.push(actorId)
		}
		const actorDao = await container(this).get(ACTOR_DAO)
		const actors = await actorDao.findWithDetailsAndGlobalIdsByIds(actorIdsToFindBy)

		this.serializeUsers(actors, message, inMessageUserLookup)
		const terminalInMessageIndexesById =
			this.serializeTerminals(actors, message, inMessageUserLookup)

		const inMessageApplicationLookup: InMessageApplicationLookup = {
			lastInMessageIndex: -1,
			inMessageIndexesById: new Map()
		}
		for (const actor of actors) {
			const applicationInMessageIndex = this.serializeApplication(
				actor.application, inMessageApplicationLookup, message)

			const actorInMessageIndex = lookups.actorInMessageIndexesById.get(actor.id)
			message.actors[actorInMessageIndex] = {
				...WITH_ID,
				application: applicationInMessageIndex as any,
				terminal: terminalInMessageIndexesById.get(actor.terminal.id) as any,
				user: inMessageUserLookup.inMessageIndexesById.get(actor.user.id) as any,
				uuId: actor.uuId
			}
		}

		return inMessageApplicationLookup
	}

	private serializeTerminals(
		actors: IActor[],
		message: RepositorySynchronizationMessage,
		inMessageUserLookup: InMessageUserLookup
	): Map<TmTerminal_Id, number> {
		let lastInMessageTerminalIndex = -1
		const terminalInMessageIndexesById: Map<TmTerminal_Id, number> = new Map()
		for (const actor of actors) {
			let terminal = actor.terminal
			if (terminalInMessageIndexesById.has(terminal.id)) {
				continue
			}
			const terminalInMessageIndex = ++lastInMessageTerminalIndex
			terminalInMessageIndexesById.set(terminal.id, terminalInMessageIndex)
			message.terminals[terminalInMessageIndex] = {
				...WITH_ID,
				uuId: terminal.uuId,
				owner: inMessageUserLookup.inMessageIndexesById.get(terminal.owner.id) as any
			}
		}

		return terminalInMessageIndexesById
	}

	private serializeUsers(
		actors: IActor[],
		message: RepositorySynchronizationMessage,
		inMessageUserLookup: InMessageUserLookup
	): void {
		for (const actor of actors) {
			this.addUserToMessage(actor.user, message, inMessageUserLookup)
			this.addUserToMessage(actor.terminal.owner, message, inMessageUserLookup)
		}
	}

	private addUserToMessage(
		user: IUser,
		message: RepositorySynchronizationMessage,
		inMessageUserLookup: InMessageUserLookup
	): number {
		let userInMessageIndex = this.getUserInMessageIndex(user, inMessageUserLookup)

		message.users[userInMessageIndex] = {
			...WITH_ID,
			username: user.username,
			uuId: user.uuId
		}

		return userInMessageIndex
	}

	private getUserInMessageIndex(
		user: IUser,
		inMessageUserLookup: InMessageUserLookup
	): number {
		if (inMessageUserLookup.inMessageIndexesById.has(user.id)) {
			return inMessageUserLookup.inMessageIndexesById.get(user.id)
		}
		let userInMessageIndex = ++inMessageUserLookup.lastInMessageIndex
		inMessageUserLookup.inMessageIndexesById.set(user.id, userInMessageIndex)

		return userInMessageIndex
	}

	private async serializeRepositories(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		message: RepositorySynchronizationMessage,
		lookups: InMessageLookupStructures,
		inMessageUserLookup: InMessageUserLookup
	): Promise<void> {
		let repositoryIdsToFindBy: Repository_Id[] = []
		for (let repositoryId of lookups.repositoryInMessageIndexesById.keys()) {
			repositoryIdsToFindBy.push(repositoryId)
		}
		repositoryIdsToFindBy.push(repositoryTransactionHistory.id)
		const repositoryDao = await container(this).get(REPOSITORY_DAO)
		const repositories = await repositoryDao.findByIds(repositoryIdsToFindBy)

		for (const repository of repositories) {
			let userInMessageIndex = this.getUserInMessageIndex(repository.owner, inMessageUserLookup)
			if (lookups.repositoryInMessageIndexesById.has(repository.id)) {
				const repositoryInMessageIndex = lookups.repositoryInMessageIndexesById.get(repository.id)
				message.referencedRepositories[repositoryInMessageIndex] =
					this.serializeRepository(repository, userInMessageIndex as any)
			} else {
				message.history.repository.owner = userInMessageIndex as any
				message.history.repository.id = repository.id
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
		inMessageUserLookup: InMessageUserLookup
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
				repositoryTransactionHistory, operationHistory, lookups))
		}

		return {
			...WITH_ID,
			actor: this.getActorInMessageIndex(repositoryTransactionHistory.actor, lookups),
			isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
			repository: this.serializeHistoryRepository(
				repositoryTransactionHistory, message, inMessageUserLookup),
			operationHistory: serializedOperationHistory,
			saveTimestamp: repositoryTransactionHistory.saveTimestamp,
			uuId: repositoryTransactionHistory.uuId
		}
	}

	private serializeHistoryRepository(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		message: RepositorySynchronizationMessage,
		inMessageUserLookup: InMessageUserLookup
	): IRepository {
		if (repositoryTransactionHistory.isRepositoryCreation) {
			const repository = repositoryTransactionHistory.repository
			let userInMessageIndex = this.addUserToMessage(
				repository.owner, message, inMessageUserLookup)

			return this.serializeRepository(repository, userInMessageIndex as any)
		} else {
			// When this repositoryTransactionHistory processed at sync-in 
			// the repository should already be loaded in the target database
			// if it's not then it's missing the repositoryTransactionHistory
			// with isRepositoryCreation === true
			return repositoryTransactionHistory.repository.uuId as any
		}
	}

	private serializeOperationHistory(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		operationHistory: IOperationHistory,
		lookups: InMessageLookupStructures
	): IOperationHistory {
		const dbEntity = operationHistory.entity
		const serializedRecordHistory: IRecordHistory[] = []
		for (const recordHistory of operationHistory.recordHistory) {
			serializedRecordHistory.push(this.serializeRecordHistory(
				repositoryTransactionHistory, recordHistory, dbEntity, lookups))
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
		// if (typeof applicationVersion.id !== 'number') {
		// 	throw new Error(`OperationHistory.entity.applicationVersion.id must be present`)
		// }

		let applicationVersionInMessageIndex
		if (lookups.applicationVersionInMessageIndexesById.has(applicationVersion.id)) {
			applicationVersionInMessageIndex = lookups.applicationVersionInMessageIndexesById.get(applicationVersion.id)
		} else {
			applicationVersionInMessageIndex = ++lookups.lastInMessageApplicationVersionIndex
			lookups.applicationVersionInMessageIndexesById.set(applicationVersion.id, applicationVersionInMessageIndex)
		}
		lookups.applicationVersions[applicationVersionInMessageIndex] = applicationVersion

		return {
			...WITH_ID,
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
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		recordHistory: IRecordHistory,
		dbEntity: IApplicationEntity,
		lookups: InMessageLookupStructures
	): IRecordHistory {
		const dbColumMapByIndex: Map<ColumnIndex, IApplicationColumn> = new Map()
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
			id: number,
			actor?: IActor,
			newValues?: IRecordHistoryNewValue[],
			oldValues?: IRecordHistoryOldValue[]
		} = {
			...WITH_ID,
		}
		if (actor.id !== repositoryTransactionHistory.actor.id) {
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
			actorRecordId: recordHistory.actorRecordId,
		}
	}

	private getActorInMessageIndex(
		actor: IActor,
		lookups: InMessageLookupStructures
	): IActor {
		if (!actor) {
			return null
		}
		return this.getActorInMessageIndexById(actor.id, lookups) as any as IActor
	}

	private getActorInMessageIndexById(
		actorId: Actor_Id,
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
			case repositoryEntity.ORIGINAL_ACTOR_ID: {
				serailizedValue = this.getActorInMessageIndexById(value, lookups)
				break
			}
			case repositoryEntity.ORIGINAL_REPOSITORY_ID: {
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
		if (value === lookups.messageRepository.id) {
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
		owner: IUser
	): IRepository {
		return {
			...WITH_ID,
			ageSuitability: repository.ageSuitability,
			createdAt: repository.createdAt,
			immutable: repository.immutable,
			owner,
			source: repository.source,
			uuId: repository.uuId
		}
	}

}
DI.set(SYNC_OUT_DATA_SERIALIZER, SyncOutDataSerializer)
