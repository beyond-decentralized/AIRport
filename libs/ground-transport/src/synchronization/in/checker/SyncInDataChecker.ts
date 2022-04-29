import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	ChangeType,
	ColumnIndex,
	repositoryEntity,
	TableIndex
} from '@airport/ground-control'
import {
	IApplicationEntity,
	IApplicationColumn
} from '@airport/airspace'
import { IAirportDatabase } from '@airport/air-control'
import {
	getSysWideOpIds,
	ISequenceGenerator
} from '@airport/check-in'
import {
	IOperationHistory,
	IRecordHistory,
	RepositoryTransactionType
} from '@airport/holding-pattern'
import { ITerminalStore } from '@airport/terminal-map'

export interface ISyncInDataChecker {

	checkData(
		message: RepositorySynchronizationMessage
	): Promise<boolean>

}

export class SyncInDataChecker
	implements ISyncInDataChecker {

	airportDatabase: IAirportDatabase
	sequenceGenerator: ISequenceGenerator
	terminalStore: ITerminalStore

	/**
	 * Every dataMessage.data.repoTransHistories array must be sorted before entering
	 * this method.
	 *
	 * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
	 * @returns {DataCheckResults}
	 */
	async checkData(
		message: RepositorySynchronizationMessage
	): Promise<boolean> {
		const history = message.history
		try {
			if (!history || typeof history !== 'object') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history`)
			}
			if (typeof history.uuId !== 'string' || history.uuId.length !== 36) {
				return false
			}
			if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
				return false
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
			delete history.id

			const applicationEntityMap = await this.populateApplicationEntityMap(message)

			await this.checkOperationHistories(message, applicationEntityMap)
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async populateApplicationEntityMap(
		message: RepositorySynchronizationMessage
	): Promise<Map<string, Map<string, Map<TableIndex, IApplicationEntity>>>> {
		const applicationVersionsByIds = this.terminalStore.getAllApplicationVersionsByIds()
		const applicationEntityMap: Map<string, Map<string, Map<TableIndex, IApplicationEntity>>> = new Map()
		for (const messageApplicationVersion of message.applicationVersions) {
			const applicationVersion = applicationVersionsByIds[messageApplicationVersion.id]
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
		applicationEntityMap: Map<string, Map<string, Map<TableIndex, IApplicationEntity>>>
	): Promise<void> {
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

			delete operationHistory.id

			let originalRepositoryColumnIndex: ColumnIndex
			let originalActorColumnIndex: ColumnIndex
			let actorIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn> = new Map()
			let repositoryIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn> = new Map()
			for (const column of operationHistory.entity.columns) {
				switch (column.name) {
					case repositoryEntity.ORIGINAL_ACTOR_ID:
						actorIdColumnMapByIndex.set(column.index, column)
						originalActorColumnIndex = column.index
						break
					case repositoryEntity.ORIGINAL_REPOSITORY_ID:
						repositoryIdColumnMapByIndex.set(column.index, column)
						originalRepositoryColumnIndex = column.index
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

			await this.checkRecordHistories(operationHistory,
				actorIdColumnMapByIndex, repositoryIdColumnMapByIndex, message)
		}
	}

	private async checkRecordHistories(
		operationHistory: IOperationHistory,
		actorIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn>,
		repositoryIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn>,
		message: RepositorySynchronizationMessage
	): Promise<void> {
		const recordHistories = operationHistory.recordHistory
		if (!(recordHistories instanceof Array) || !recordHistories.length) {
			throw new Error(`Inalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory`)
		}

		for (const recordHistory of recordHistories) {
			if (!recordHistory.actorRecordId || typeof recordHistory.actorRecordId !== 'number') {
				throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.actorRecordId`)
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
				repositoryIdColumnMapByIndex, operationHistory, message)
			this.checkOldValues(recordHistory, actorIdColumnMapByIndex,
				repositoryIdColumnMapByIndex, operationHistory, message)

			recordHistory.operationHistory = operationHistory

			delete recordHistory.id
		}
	}

	private checkNewValues(
		recordHistory: IRecordHistory,
		actorIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn>,
		repositoryIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn>,
		operationHistory: IOperationHistory,
		message: RepositorySynchronizationMessage
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
				const originalActor = message.actors[newValue.newValue]
				if (!originalActor) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
Value is for ${actorIdColumn.name} and could find RepositorySynchronizationMessage.actors[${newValue.newValue}]`)
				}
				newValue.newValue = originalActor.id
			}
			const repositoryIdColumn = repositoryIdColumnMapByIndex.get(newValue.columnIndex)
			if (repositoryIdColumn) {
				if (newValue.newValue === -1) {
					newValue.newValue = message.history.repository.id
				} else {
					const originalRepository = message.referencedRepositories[newValue.newValue]
					if (!originalRepository) {
						throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
	Value is for ${repositoryIdColumn.name} and could find RepositorySynchronizationMessage.referencedRepositories[${newValue.newValue}]`)
					}
					newValue.newValue = originalRepository.id
				}
			}
		}
	}

	private checkOldValues(
		recordHistory: IRecordHistory,
		actorIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn>,
		repositoryIdColumnMapByIndex: Map<ColumnIndex, IApplicationColumn>,
		operationHistory: IOperationHistory,
		message: RepositorySynchronizationMessage
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
				const originalActor = message.actors[oldValue.oldValue]
				if (!originalActor) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
Value is for ORIGINAL_ACTOR_ID and could find RepositorySynchronizationMessage.actors[${oldValue.oldValue}]`)
				}
				oldValue.oldValue = originalActor.id
			}
			const repositoryIdColumn = repositoryIdColumnMapByIndex.get(oldValue.columnIndex)
			if (repositoryIdColumn) {
				const originalRepository = message.referencedRepositories[oldValue.oldValue]
				if (!originalRepository) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
Value is for ORIGINAL_REPOSITORY_ID and could find RepositorySynchronizationMessage.referencedRepositories[${oldValue.oldValue}]`)
				}
				oldValue.oldValue = originalRepository.id
			}
		}
	}
}
