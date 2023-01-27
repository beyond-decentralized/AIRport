import {
	ChangeType,
	ApplicationColumn_Index,
	ApplicationEntity_TableIndex,
	Dictionary,
	IAppTrackerUtils,
	IDatastructureUtils,
	Domain_Name,
	Application_Name,
	DbApplicationVersion,
	DbColumn,
	RepositoryTransactionType,
	IOperationHistory,
	DbEntity,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
	RepositorySynchronizationMessage,
	IApplicationUtils,
	RepositorySynchronizationData,
} from '@airport/ground-control'
import {
	IAirportDatabase,
	ISystemWideOperationIdUtils
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { ITerminalStore } from '@airport/terminal-map'
import { IRepositoriesAndMembersCheckResult } from './SyncInRepositoryChecker'

export interface IDataCheckResult
	extends IRepositoriesAndMembersCheckResult,
	IInternalDataCheckResult {
	// Delay processing of ledger tables because it might require
	// loading of additional Apps
}

export interface IInternalDataCheckResult {
	// Delay processing of ledger tables because it might require
	// loading of additional Apps
	forDelayedProcessing?: IOperationHistory[]
	forImmediateProcessing?: IOperationHistory[]
}


export interface IEntityColumnMapsByIndex {

	actorIds: Map<ApplicationColumn_Index, DbColumn>
	referencedRelationIds: Map<ApplicationColumn_Index, DbColumn>
	repositoryIds: Map<ApplicationColumn_Index, DbColumn>
	terminalIds: Map<ApplicationColumn_Index, DbColumn>
	userAccountIds: Map<ApplicationColumn_Index, DbColumn>

}

export interface ISyncInDataChecker {

	checkData(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult>

	populateApplicationEntityMap(
		messageApplicationVersions: DbApplicationVersion[]
	): Promise<Map<Domain_Name, Map<Application_Name, Map<ApplicationEntity_TableIndex, DbEntity>>>>

}

@Injected()
export class SyncInDataChecker
	implements ISyncInDataChecker {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	systemWideOperationIdUtils: ISystemWideOperationIdUtils

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
		const history = message.data.history
		let operationHistoryCheckResult: IInternalDataCheckResult
		try {
			if (!history || typeof history !== 'object') {
				throw new Error(`Invalid RepositorySynchronizationData.history`)
			}
			if (typeof history.GUID !== 'string' || history.GUID.length !== 36) {
				throw new Error(`Invalid RepositorySynchronizationData.history.GUID`)
			}
			if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
				throw new Error(`Invalid RepositorySynchronizationData.history.operationHistory`)
			}
			if (!history.saveTimestamp || typeof history.saveTimestamp !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationData.history.saveTimestamp`)
			}
			if (history.transactionHistory) {
				throw new Error(`RepositorySynchronizationData.history.transactionHistory cannot be specified`)
			}
			if (history.repositoryTransactionType) {
				throw new Error(`RepositorySynchronizationData.history.repositoryTransactionType cannot be specified`)
			}
			if (history.syncTimestamp) {
				throw new Error(`RepositorySynchronizationData.history.syncTimestamp cannot be specified`)
			}

			const actor = message.data.actors[history.actor as any]
			if (!actor) {
				throw new Error(`Cannot find Actor for "in-message id"
RepositorySynchronizationData.history.actor`)
			}
			history.actor = actor

			// Repository is already set in SyncInRepositoryChecker
			history.repositoryTransactionType = RepositoryTransactionType.REMOTE
			history.syncTimestamp = message.syncTimestamp
			delete history._localId

			const applicationEntityMap = await this.populateApplicationEntityMap(
				message.data.applicationVersions)

			operationHistoryCheckResult = await this.checkOperationHistories(
				message.data, applicationEntityMap, context)
		} catch (e) {
			console.error(e)

			return {
				isValid: false
			}
		}

		return {
			...operationHistoryCheckResult,
			isValid: true
		}
	}

	async populateApplicationEntityMap(
		messageApplicationVersions: DbApplicationVersion[]
	): Promise<Map<Domain_Name, Map<Application_Name, Map<ApplicationEntity_TableIndex, DbEntity>>>> {
		const applicationVersionsByIds = this.terminalStore.getAllApplicationVersionsByIds()
		const applicationEntityMap: Map<Domain_Name, Map<Application_Name, Map<ApplicationEntity_TableIndex, DbEntity>>>
			= new Map()
		for (const messageApplicationVersion of messageApplicationVersions) {
			const applicationVersion = applicationVersionsByIds[messageApplicationVersion._localId]
			for (const applicationEntity of applicationVersion.entities) {
				const entitiesForApplication = this.datastructureUtils.ensureChildJsMap(
					this.datastructureUtils.ensureChildJsMap(applicationEntityMap,
						applicationVersion.application.domain.name),
					applicationVersion.application.name)

				entitiesForApplication.set(applicationEntity.index, applicationEntity)
			}
		}

		return applicationEntityMap
	}

	private async checkOperationHistories(
		data: RepositorySynchronizationData,
		applicationEntityMap: Map<string, Map<string, Map<ApplicationEntity_TableIndex, DbEntity>>>,
		context: IContext
	): Promise<IInternalDataCheckResult> {
		const forImmediateProcessing: IOperationHistory[] = []
		const forDelayedProcessing: IOperationHistory[] = []
		const history = data.history
		if (!(history.operationHistory instanceof Array) || !history.operationHistory.length) {
			throw new Error(`Invalid RepositorySynchronizationData.history.operationHistory Array`)
		}

		const systemWideOperationIds = this.systemWideOperationIdUtils.getSysWideOpIds(
			history.operationHistory.length)

		let orderNumber = 0

		for (let i = 0; i < history.operationHistory.length; i++) {
			const operationHistory = history.operationHistory[i]
			if (typeof operationHistory !== 'object') {
				throw new Error(`Invalid operationHistory[${i}]`)
			}
			if (operationHistory.orderNumber) {
				throw new Error(
					`RepositorySynchronizationData.history -> operationHistory[${i}].orderNumber cannot be specified,
the position of orderHistory record determines it's order`)
			}
			operationHistory.orderNumber = ++orderNumber

			switch (operationHistory.changeType) {
				case ChangeType.DELETE_ROWS:
				case ChangeType.INSERT_VALUES:
				case ChangeType.UPDATE_ROWS:
					break;
				default:
					throw new Error(`Invalid operationHistory[${i}].changeType: ${operationHistory.changeType}`)
			}
			if (typeof operationHistory.entity !== 'object') {
				throw new Error(`Invalid operationHistory[${i}].entity`)
			}
			if (typeof operationHistory.entity.applicationVersion !== 'number') {
				throw new Error(`Expecting "in-message index" (number)
					in 'operationHistory[${i}].entity.applicationVersion'`)
			}
			const applicationVersion = data.applicationVersions[operationHistory.entity.applicationVersion as any]
			if (!applicationVersion) {
				throw new Error(`Invalid index into message.applicationVersions [${operationHistory.entity.applicationVersion}],
				in operationHistory[${i}].entity.applicationVersion`)
			}
			const applicationEntity = applicationEntityMap.get(applicationVersion.application.domain.name)
				.get(applicationVersion.application.name).get(operationHistory.entity.index)
			if (!applicationEntity) {
				throw new Error(`Invalid operationHistory[${i}].entity.index: ${operationHistory.entity.index}`)
			}
			operationHistory.entity = applicationEntity

			if (operationHistory.repositoryTransactionHistory) {
				throw new Error(`RepositorySynchronizationData.history -> operationHistory[${i}].repositoryTransactionHistory cannot be specified`)
			}
			operationHistory.repositoryTransactionHistory = history

			if (operationHistory.systemWideOperationId) {
				throw new Error(`RepositorySynchronizationData.history -> operationHistory[${i}].systemWideOperationId cannot be specified`)
			}
			operationHistory.systemWideOperationId = systemWideOperationIds[i]

			delete operationHistory._localId

			const entityColumnMapsByIndex: IEntityColumnMapsByIndex = {
				actorIds: new Map(),
				referencedRelationIds: new Map(),
				repositoryIds: new Map(),
				terminalIds: new Map(),
				userAccountIds: new Map()
			}

			let delayOperationHistoryProcessing = false

			for (const dbColumn of operationHistory.entity.columns) {
				if (this.applicationUtils.isManyRelationColumn(dbColumn as DbColumn)) {
					const oneSideDbEntity = this.applicationUtils
						.getOneSideEntityOfManyRelationColumn(dbColumn as DbColumn)
					if (this.dictionary.isActor(oneSideDbEntity)) {
						entityColumnMapsByIndex.actorIds.set(dbColumn.index, dbColumn)
					} else if (this.dictionary.isRepository(oneSideDbEntity)) {
						entityColumnMapsByIndex.repositoryIds.set(dbColumn.index, dbColumn)
					} else if (this.dictionary.isTerminal(oneSideDbEntity)) {
						entityColumnMapsByIndex.terminalIds.set(dbColumn.index, dbColumn)
					} else if (this.dictionary.isUserAccount(oneSideDbEntity)) {
						entityColumnMapsByIndex.userAccountIds.set(dbColumn.index, dbColumn)
					} else if (this.dictionary.isApplicationRelation(oneSideDbEntity)) {
						entityColumnMapsByIndex.referencedRelationIds.set(dbColumn.index, dbColumn)
					}
				}
			}

			if (delayOperationHistoryProcessing) {
				forDelayedProcessing.push(operationHistory)
			} else {
				forImmediateProcessing.push(operationHistory)
			}

			await this.checkRecordHistories(operationHistory,
				entityColumnMapsByIndex, data, context)
		}
		return {
			forImmediateProcessing,
			forDelayedProcessing
		}
	}

	private async checkRecordHistories(
		operationHistory: IOperationHistory,
		entityColumnMapsByIndex: IEntityColumnMapsByIndex,
		data: RepositorySynchronizationData,
		context: IContext
	): Promise<void> {
		const recordHistories = operationHistory.recordHistory
		if (!(recordHistories instanceof Array) || !recordHistories.length) {
			throw new Error(`Inalid RepositorySynchronizationData.history -> operationHistory.recordHistory`)
		}

		for (const recordHistory of recordHistories) {
			if (!recordHistory._actorRecordId || typeof recordHistory._actorRecordId !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationData.history -> operationHistory.recordHistory._actorRecordId`)
			}
			switch (operationHistory.changeType) {
				case ChangeType.INSERT_VALUES:
					if (recordHistory.actor) {
						throw new Error(`Cannot specify RepositorySynchronizationData.history -> operationHistory.recordHistory.actor
for ChangeType.INSERT_VALUES`)
					}
					recordHistory.actor = data.history.actor
					break
				case ChangeType.DELETE_ROWS:
				case ChangeType.UPDATE_ROWS: {
					// If no actor is present on record level its the same actor that created the repositoryTransactionHistory
					if (recordHistory.actor === undefined) {
						recordHistory.actor = data.history.actor
					} else {
						const actor = data.actors[recordHistory.actor as any]
						if (!actor) {
							throw new Error(`Did find Actor for "in-message id" in RepositorySynchronizationData.history -> operationHistory.actor`)
						}
						recordHistory.actor = actor
					}
					break
				}
			}

			if (recordHistory.operationHistory) {
				throw new Error(`RepositorySynchronizationData.history -> operationHistory.recordHistory.operationHistory cannot be specified`)
			}

			this.checkNewValues(recordHistory, entityColumnMapsByIndex,
				operationHistory, data)
			this.checkOldValues(recordHistory, entityColumnMapsByIndex,
				operationHistory, data)

			recordHistory.operationHistory = operationHistory

			delete recordHistory._localId
		}
	}

	private checkNewValues(
		recordHistory: IRecordHistory,
		entityColumnMapsByIndex: IEntityColumnMapsByIndex,
		operationHistory: IOperationHistory,
		data: RepositorySynchronizationData
	): void {
		switch (operationHistory.changeType) {
			case ChangeType.DELETE_ROWS:
				if (recordHistory.newValues) {
					throw new Error(`Cannot specify RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues
for ChangeType.DELETE_ROWS`)
				}
				return
			case ChangeType.INSERT_VALUES:
			case ChangeType.UPDATE_ROWS:
				if (!(recordHistory.newValues instanceof Array) || !recordHistory.newValues.length) {
					throw new Error(`Must specify RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues
for ChangeType.INSERT_VALUES|UPDATE_ROWS`)
				}
				break
		}
		for (const newValue of recordHistory.newValues) {
			if (newValue.recordHistory) {
				throw new Error(`Cannot specify RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues.recordHistory`)
			}
			newValue.recordHistory = recordHistory
			if (typeof newValue.columnIndex !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues.columnIndex`)
			}
			if (typeof newValue.newValue === undefined) {
				throw new Error(`Invalid RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues.newValue`)
			}
		}

		for (const newValue of recordHistory.newValues) {
			this.checkRelatedObjectInNewValue(
				newValue,
				entityColumnMapsByIndex.actorIds,
				data.actors,
				'actors'
			)
			this.checkRelatedObjectInNewValue(
				newValue,
				entityColumnMapsByIndex.referencedRelationIds,
				data.referencedApplicationRelations,
				'referencedApplicationRelations'
			)
			this.checkRelatedObjectInNewValue(
				newValue,
				entityColumnMapsByIndex.repositoryIds,
				data.referencedRepositories,
				'referencedRepositories'
			)
			this.checkRelatedObjectInNewValue(
				newValue,
				entityColumnMapsByIndex.terminalIds,
				data.terminals,
				'terminals'
			)
			this.checkRelatedObjectInNewValue(
				newValue,
				entityColumnMapsByIndex.userAccountIds,
				data.userAccounts,
				'userAccounts'
			)
		}
	}

	private checkOldValues(
		recordHistory: IRecordHistory,
		entityColumnMapsByIndex: IEntityColumnMapsByIndex,
		operationHistory: IOperationHistory,
		data: RepositorySynchronizationData
	): void {
		switch (operationHistory.changeType) {
			case ChangeType.DELETE_ROWS:
			case ChangeType.INSERT_VALUES:
				if (recordHistory.oldValues) {
					throw new Error(`Cannot specify RepositorySynchronizationData.history -> operationHistory.recordHistory.oldValues
for ChangeType.DELETE_ROWS|INSERT_VALUES`)
				}
				return
			case ChangeType.UPDATE_ROWS:
				if (!(recordHistory.newValues instanceof Array) || !recordHistory.oldValues.length) {
					throw new Error(`Must specify RepositorySynchronizationData.history -> operationHistory.recordHistory.oldValues
for ChangeType.UPDATE_ROWS`)
				}
				break
		}
		for (const oldValue of recordHistory.oldValues) {
			if (oldValue.recordHistory) {
				throw new Error(`Cannot specify RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues.recordHistory`)
			}
			oldValue.recordHistory = recordHistory
			if (typeof oldValue.columnIndex !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationData.history -> operationHistory.recordHistory.oldValues.columnIndex`)
			}
			if (typeof oldValue.oldValue === undefined) {
				throw new Error(`Invalid RepositorySynchronizationData.history -> operationHistory.recordHistory.oldValues.oldValue`)
			}
		}

		for (const oldValue of recordHistory.oldValues) {
			this.checkRelatedObjectInOldValue(
				oldValue,
				entityColumnMapsByIndex.actorIds,
				data.actors,
				'actors'
			)
			this.checkRelatedObjectInOldValue(
				oldValue,
				entityColumnMapsByIndex.repositoryIds,
				data.referencedRepositories,
				'referencedRepositories'
			)
			this.checkRelatedObjectInOldValue(
				oldValue,
				entityColumnMapsByIndex.referencedRelationIds,
				data.referencedApplicationRelations,
				'referencedApplicationRelations'
			)
			this.checkRelatedObjectInOldValue(
				oldValue,
				entityColumnMapsByIndex.terminalIds,
				data.terminals,
				'terminals'
			)
			this.checkRelatedObjectInOldValue(
				oldValue,
				entityColumnMapsByIndex.userAccountIds,
				data.userAccounts,
				'userAccounts'
			)
		}
	}

	private checkRelatedObjectInNewValue(
		newValue: IRecordHistoryNewValue,
		entityIdColumnMapByIndex: Map<number, DbColumn>,
		entityArrayByInMessageIndex: {
			_localId?: number
		}[],
		inMessageEntityArrayName: string
	): void {
		this.checkRelatedObject(
			newValue,
			'newValue',
			entityIdColumnMapByIndex,
			entityArrayByInMessageIndex,
			inMessageEntityArrayName
		)
	}

	private checkRelatedObjectInOldValue(
		oldValue: IRecordHistoryOldValue,
		entityIdColumnMapByIndex: Map<number, DbColumn>,
		entityArrayByInMessageIndex: {
			_localId?: number
		}[],
		inMessageEntityArrayName: string
	): void {
		this.checkRelatedObject(
			oldValue,
			'oldValue',
			entityIdColumnMapByIndex,
			entityArrayByInMessageIndex,
			inMessageEntityArrayName
		)
	}

	private checkRelatedObject(
		value: IRecordHistoryNewValue | IRecordHistoryOldValue,
		valueColumnName: 'newValue' | 'oldValue',
		entityIdColumnMapByIndex: Map<number, DbColumn>,
		entityArrayByInMessageIndex: {
			_localId?: number
		}[],
		inMessageEntityArrayName: string
	): void {
		const relationIdColumn = entityIdColumnMapByIndex.get(value.columnIndex)
		if (relationIdColumn) {
			const sourceEntity = entityArrayByInMessageIndex[value[valueColumnName]]
			if (!sourceEntity) {
				throw new Error(`Invalid RepositorySynchronizationData.history -> operationHistory.recordHistory.newValues.newValue
Value is for ${relationIdColumn.name} and could find RepositorySynchronizationData.${inMessageEntityArrayName}[${value[valueColumnName]}]`)
			}
			value[valueColumnName] = sourceEntity._localId
		}
	}

}
