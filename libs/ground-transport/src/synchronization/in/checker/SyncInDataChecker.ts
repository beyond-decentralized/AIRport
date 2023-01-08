import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	ChangeType,
	ApplicationColumn_Index,
	airEntity,
	ApplicationEntity_TableIndex,
	ISequenceGenerator,
	IAppTrackerUtils,
} from '@airport/ground-control'
import {
	IApplicationEntity,
	IApplicationColumn
} from '@airport/airspace/dist/app/bundle'
import { getSysWideOpIds, IAirportDatabase } from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IOperationHistory,
	IRecordHistory,
	RepositoryTransactionType
} from '@airport/holding-pattern/dist/app/bundle'
import { ITerminalStore } from '@airport/terminal-map'

export interface IDataCheckResult {
	// Delay processing of ledger tables because it might require
	// loading of additional Apps
	forDelayedProcessing?: IOperationHistory[]
	forImmediateProcessing?: IOperationHistory[]
	isValid?: boolean
}

export interface ISyncInDataChecker {

	checkData(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult>

}

@Injected()
export class SyncInDataChecker
	implements ISyncInDataChecker {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	sequenceGenerator: ISequenceGenerator

	@Inject()
	terminalStore: ITerminalStore

	/**
	 * Every dataMessage.data.repoTransHistories array must be sorted before entering
	 * this method.
	 *
	 * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
	 * @returns {DataCheckResults}
	 */
	async checkData(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult> {
		const history = message.history
		let dataCheckResult: IDataCheckResult
		try {
			if (!history || typeof history !== 'object') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history`)
			}
			if (typeof history.GUID !== 'string' || history.GUID.length !== 36) {
				return {
					isValid: false
				}
			}
			if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
				return {
					isValid: false
				}
			}
			if (!history.saveTimestamp || typeof history.saveTimestamp !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history.saveTimestamp`)
			}
			if (history.transactionHistory) {
				throw new Error(`RepositorySynchronizationMessage.history.transactionHistory cannot be specified`)
			}
			if (history.repositoryTransactionType) {
				throw new Error(`RepositorySynchronizationMessage.history.repositoryTransactionType cannot be specified`)
			}
			if (history.syncTimestamp) {
				throw new Error(`RepositorySynchronizationMessage.history.syncTimestamp cannot be specified`)
			}

			// Repository is already set in SyncInRepositoryChecker
			history.repositoryTransactionType = RepositoryTransactionType.REMOTE
			history.syncTimestamp = message.syncTimestamp
			delete history._localId

			const applicationEntityMap = await this.populateApplicationEntityMap(message)

			dataCheckResult = await this.checkOperationHistories(
				message, applicationEntityMap, context)
		} catch (e) {
			console.error(e)

			return {
				isValid: false
			}
		}

		return {
			...dataCheckResult,
			isValid: true
		}
	}

	private async populateApplicationEntityMap(
		message: RepositorySynchronizationMessage
	): Promise<Map<string, Map<string, Map<ApplicationEntity_TableIndex, IApplicationEntity>>>> {
		const applicationVersionsByIds = this.terminalStore.getAllApplicationVersionsByIds()
		const applicationEntityMap: Map<string, Map<string, Map<ApplicationEntity_TableIndex, IApplicationEntity>>> = new Map()
		for (const messageApplicationVersion of message.applicationVersions) {
			const applicationVersion = applicationVersionsByIds[messageApplicationVersion._localId]
			for (const applicationEntity of applicationVersion.entities) {
				let entitiesForDomain = applicationEntityMap.get(applicationVersion.application.domain.name)
				if (!entitiesForDomain) {
					entitiesForDomain = new Map()
					applicationEntityMap.set(applicationVersion.application.domain.name, entitiesForDomain)
				}
				let entitiesForApplication = entitiesForDomain.get(applicationVersion.application.name)
				if (!entitiesForApplication) {
					entitiesForApplication = new Map()
					entitiesForDomain.set(applicationVersion.application.name, entitiesForApplication)
				}
				entitiesForApplication.set(applicationEntity.index, applicationEntity)
			}
		}

		return applicationEntityMap
	}

	private async checkOperationHistories(
		message: RepositorySynchronizationMessage,
		applicationEntityMap: Map<string, Map<string, Map<ApplicationEntity_TableIndex, IApplicationEntity>>>,
		context: IContext
	): Promise<IDataCheckResult> {
		const forImmediateProcessing: IOperationHistory[] = []
		const forDelayedProcessing: IOperationHistory[] = []
		const history = message.history
		if (!(history.operationHistory instanceof Array) || !history.operationHistory.length) {
			throw new Error(`Invalid RepositorySynchronizationMessage.history.operationHistory`)
		}

		const systemWideOperationIds = getSysWideOpIds(
			history.operationHistory.length, this.airportDatabase, this.sequenceGenerator)

		let orderNumber = 0

		for (let i = 0; i < history.operationHistory.length; i++) {
			const operationHistory = history.operationHistory[i]
			if (typeof operationHistory !== 'object') {
				throw new Error(`Invalid operationHistory`)
			}
			if (operationHistory.orderNumber) {
				throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.orderNumber cannot be specified,
				the position of orderHistory record determines it's order`)
			}
			operationHistory.orderNumber = ++orderNumber

			switch (operationHistory.changeType) {
				case ChangeType.DELETE_ROWS:
				case ChangeType.INSERT_VALUES:
				case ChangeType.UPDATE_ROWS:
					break;
				default:
					throw new Error(`Invalid operationHistory.changeType: ${operationHistory.changeType}`)
			}
			if (typeof operationHistory.entity !== 'object') {
				throw new Error(`Invalid operationHistory.entity`)
			}
			if (typeof operationHistory.entity.applicationVersion !== 'number') {
				throw new Error(`Expecting "in-message index" (number)
					in 'operationHistory.entity.applicationVersion'`)
			}
			const actor = message.actors[operationHistory.actor as any]
			if (!actor) {
				throw new Error(`Cannot find Actor for "in-message id" RepositorySynchronizationMessage.history.actor`)
			}

			operationHistory.actor = actor
			const applicationVersion = message.applicationVersions[operationHistory.entity.applicationVersion as any]
			if (!applicationVersion) {
				throw new Error(`Invalid index into message.applicationVersions [${operationHistory.entity.applicationVersion}],
				in operationHistory.entity.applicationVersion`)
			}
			const applicationEntity = applicationEntityMap.get(applicationVersion.application.domain.name)
				.get(applicationVersion.application.name).get(operationHistory.entity.index)
			if (!applicationEntity) {
				throw new Error(`Invalid operationHistory.entity.index: ${operationHistory.entity.index}`)
			}
			operationHistory.entity = applicationEntity

			if (operationHistory.repositoryTransactionHistory) {
				throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.repositoryTransactionHistory cannot be specified`)
			}
			operationHistory.repositoryTransactionHistory = history

			if (operationHistory.systemWideOperationId) {
				throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.systemWideOperationId cannot be specified`)
			}
			operationHistory.systemWideOperationId = systemWideOperationIds[i]

			delete operationHistory._localId

			let actorIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn> = new Map()
			let referencedRelationIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn> = new Map()
			let repositoryIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn> = new Map()
			let isInternalDomain = this.appTrackerUtils.isInternalDomain(applicationVersion.application.domain.name)
			let delayOperationHistoryProcessing = false
			for (const column of operationHistory.entity.columns) {
				switch (column.name) {
					case airEntity.COPY_ACTOR_LID:
					case airEntity.MANY_SIDE_ACTOR_LID:
					case airEntity.ONE_SIDE_ACTOR_LID:
						actorIdColumnMapByIndex.set(column.index, column)
						break
					case airEntity.COPY_REPOSITORY_LID:
					case airEntity.MANY_SIDE_REPOSITORY_LID:
					case airEntity.ONE_SIDE_REPOSITORY_LID:
						repositoryIdColumnMapByIndex.set(column.index, column)
						break
					case airEntity.MANY_SIDE_APPLICATION_RELATION_LID:
					case airEntity.ONE_SIDE_APPLICATION_RELATION_LID:
						referencedRelationIdColumnMapByIndex.set(column.index, column)
						if (isInternalDomain) {
							delayOperationHistoryProcessing = true
						}
						break
				}
				if (/.*_AID_[\d]+$/.test(column.name)
					&& column.manyRelationColumns.length) {
					actorIdColumnMapByIndex.set(column.index, column)
				}
				if (/.*_RID_[\d]+$/.test(column.name)
					&& column.manyRelationColumns.length) {
					repositoryIdColumnMapByIndex.set(column.index, column)
				}
			}

			if (delayOperationHistoryProcessing) {
				forDelayedProcessing.push(operationHistory)
			} else {
				forImmediateProcessing.push(operationHistory)
			}

			await this.checkRecordHistories(operationHistory,
				actorIdColumnMapByIndex, repositoryIdColumnMapByIndex,
				referencedRelationIdColumnMapByIndex, message, context)
		}
		return {
			forImmediateProcessing,
			forDelayedProcessing
		}
	}

	private async checkRecordHistories(
		operationHistory: IOperationHistory,
		actorIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		repositoryIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		referencedRelationIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<void> {
		const recordHistories = operationHistory.recordHistory
		if (!(recordHistories instanceof Array) || !recordHistories.length) {
			throw new Error(`Inalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory`)
		}

		for (const recordHistory of recordHistories) {
			if (!recordHistory._actorRecordId || typeof recordHistory._actorRecordId !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory._actorRecordId`)
			}
			switch (operationHistory.changeType) {
				case ChangeType.INSERT_VALUES:
					if (recordHistory.actor) {
						throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.actor
for ChangeType.INSERT_VALUES`)
					}
					recordHistory.actor = operationHistory.actor
					break
				case ChangeType.DELETE_ROWS:
				case ChangeType.UPDATE_ROWS: {
					// If no actor is present on record level its the same actor that created the repositoryTransactionHistory
					if (recordHistory.actor === undefined) {
						recordHistory.actor = operationHistory.actor
					} else {
						const actor = message.actors[recordHistory.actor as any]
						if (!actor) {
							throw new Error(`Did find Actor for "in-message id" in RepositorySynchronizationMessage.history -> operationHistory.actor`)
						}
						recordHistory.actor = actor
					}
					break
				}
			}

			if (recordHistory.operationHistory) {
				throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.recordHistory.operationHistory cannot be specified`)
			}

			this.checkNewValues(recordHistory, actorIdColumnMapByIndex,
				repositoryIdColumnMapByIndex, referencedRelationIdColumnMapByIndex,
				operationHistory, message, context)
			this.checkOldValues(recordHistory, actorIdColumnMapByIndex,
				repositoryIdColumnMapByIndex, referencedRelationIdColumnMapByIndex,
				operationHistory, message, context)

			recordHistory.operationHistory = operationHistory

			delete recordHistory._localId
		}
	}

	private checkNewValues(
		recordHistory: IRecordHistory,
		actorIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		repositoryIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		referencedRelationIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		operationHistory: IOperationHistory,
		message: RepositorySynchronizationMessage,
		context: IContext
	): void {
		switch (operationHistory.changeType) {
			case ChangeType.DELETE_ROWS:
				if (recordHistory.newValues) {
					throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.DELETE_ROWS`)
				}
				return
			case ChangeType.INSERT_VALUES:
			case ChangeType.UPDATE_ROWS:
				if (!(recordHistory.newValues instanceof Array) || !recordHistory.newValues.length) {
					throw new Error(`Must specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.INSERT_VALUES|UPDATE_ROWS`)
				}
				break
		}
		for (const newValue of recordHistory.newValues) {
			if (newValue.recordHistory) {
				throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.recordHistory`)
			}
			newValue.recordHistory = recordHistory
			if (typeof newValue.columnIndex !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.columnIndex`)
			}
			if (typeof newValue.newValue === undefined) {
				throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue`)
			}
		}

		for (const newValue of recordHistory.newValues) {
			const actorIdColumn = actorIdColumnMapByIndex.get(newValue.columnIndex)
			if (actorIdColumn) {
				const sourceActor = message.actors[newValue.newValue]
				if (!sourceActor) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
Value is for ${actorIdColumn.name} and could find RepositorySynchronizationMessage.actors[${newValue.newValue}]`)
				}
				newValue.newValue = sourceActor._localId
			}

			const repositoryIdColumn = repositoryIdColumnMapByIndex.get(newValue.columnIndex)
			if (repositoryIdColumn) {
				if (newValue.newValue === -1) {
					newValue.newValue = message.history.repository._localId
				} else {
					const sourceRepository = message.referencedRepositories[newValue.newValue]
					if (!sourceRepository) {
						throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
Value is for ${repositoryIdColumn.name} and could find RepositorySynchronizationMessage.referencedRepositories[${newValue.newValue}]`)
					}
					newValue.newValue = sourceRepository._localId
				}
			}

			const relationIdColumn = referencedRelationIdColumnMapByIndex.get(newValue.columnIndex)
			if (relationIdColumn) {
				const sourceRelation = message.referencedApplicationRelations[newValue.newValue]
				if (!sourceRelation) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
Value is for ${relationIdColumn.name} and could find RepositorySynchronizationMessage.referencedApplicationRelations[${newValue.newValue}]`)
				}
				newValue.newValue = sourceRelation._localId
			}
		}
	}

	private checkOldValues(
		recordHistory: IRecordHistory,
		actorIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		repositoryIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		referencedRelationIdColumnMapByIndex: Map<ApplicationColumn_Index, IApplicationColumn>,
		operationHistory: IOperationHistory,
		message: RepositorySynchronizationMessage,
		context: IContext
	): void {
		switch (operationHistory.changeType) {
			case ChangeType.DELETE_ROWS:
			case ChangeType.INSERT_VALUES:
				if (recordHistory.oldValues) {
					throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.DELETE_ROWS|INSERT_VALUES`)
				}
				return
			case ChangeType.UPDATE_ROWS:
				if (!(recordHistory.newValues instanceof Array) || !recordHistory.oldValues.length) {
					throw new Error(`Must specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.UPDATE_ROWS`)
				}
				break
		}
		for (const oldValue of recordHistory.oldValues) {
			if (oldValue.recordHistory) {
				throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.recordHistory`)
			}
			oldValue.recordHistory = recordHistory
			if (typeof oldValue.columnIndex !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.columnIndex`)
			}
			if (typeof oldValue.oldValue === undefined) {
				throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue`)
			}
		}

		for (const oldValue of recordHistory.oldValues) {
			const actorIdColumn = actorIdColumnMapByIndex.get(oldValue.columnIndex)
			if (actorIdColumn) {
				const sourceActor = message.actors[oldValue.oldValue]
				if (!sourceActor) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
Value is for ${actorIdColumn.name} and could find RepositorySynchronizationMessage.actors[${oldValue.oldValue}]`)
				}
				oldValue.oldValue = sourceActor._localId
			}

			const repositoryIdColumn = repositoryIdColumnMapByIndex.get(oldValue.columnIndex)
			if (repositoryIdColumn) {
				const sourceRepository = message.referencedRepositories[oldValue.oldValue]
				if (!sourceRepository) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
Value is for ${repositoryIdColumn.name} and could find RepositorySynchronizationMessage.referencedRepositories[${oldValue.oldValue}]`)
				}
				oldValue.oldValue = sourceRepository._localId
			}

			const relationIdColumn = referencedRelationIdColumnMapByIndex.get(oldValue.columnIndex)
			if (relationIdColumn) {
				const sourceRelation = message.referencedApplicationRelations[oldValue.oldValue]
				if (!sourceRelation) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
Value is for ${relationIdColumn.name} and could find RepositorySynchronizationMessage.referencedApplicationRelations[${oldValue.oldValue}]`)
				}
				oldValue.oldValue = sourceRelation._localId
			}
		}
	}
}
