import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	ChangeType,
	ColumnIndex,
	EntityId,
	TableIndex
} from '@airport/ground-control'
import {
	IApplicationEntity,
	IApplicationVersion,
	APPLICATION_ENTITY_DAO
} from '@airport/airspace'
import {
	SYNC_IN_DATA_CHECKER
} from '../../../tokens'
import { AIRPORT_DATABASE } from '@airport/air-control'
import {
	getSysWideOpIds,
	SEQUENCE_GENERATOR
} from '@airport/check-in'
import {
	IOperationHistory,
	IRecordHistory,
	RepositoryTransactionType
} from '@airport/holding-pattern'

export interface ISyncInDataChecker {

	checkData(
		message: RepositorySynchronizationMessage
	): Promise<boolean>

}

export class SyncInDataChecker
	implements ISyncInDataChecker {

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
				throw new Error(`RepositorySynchronizationMessage.history.synced cannot be specified`)
			}
			const actor = message.actors[history.actor as any]
			if (!actor) {
				throw new Error(`Cannot find Actor for "in-message id" RepositorySynchronizationMessage.history.actor`)
			}
			// Repository is already set in SyncInRepositoryChecker

			history.actor = actor
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
		let applicationVersionsById: Map<number, IApplicationVersion> = new Map()
		let applicationVersionIds: number[] = []

		for (const applicationVersion of message.applicationVersions) {
			applicationVersionIds.push(applicationVersion.id)
			applicationVersionsById.set(applicationVersion.id, applicationVersion)
		}
		const applicationEntityDao = await container(this).get(APPLICATION_ENTITY_DAO)
		const applicationEntities = await applicationEntityDao.findAllForApplicationVersions(applicationVersionIds);
		const applicationEntityMap: Map<string, Map<string, Map<TableIndex, IApplicationEntity>>> = new Map()

		for (let applicationEntity of applicationEntities) {
			const applicationVersion = applicationVersionsById.get(applicationEntity.applicationVersion.id)
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

		const [airDb, sequenceGenerator] = await container(this)
			.get(AIRPORT_DATABASE, SEQUENCE_GENERATOR)

		const systemWideOperationIds = getSysWideOpIds(
			history.operationHistory.length, airDb, sequenceGenerator)

		let orderNumber = 0

		const originalRepositoryColumnIndexMap: Map<EntityId, ColumnIndex> = new Map()

		for (let i = 0; i < history.operationHistory.length; i++) {
			const operationHistory = history.operationHistory[i]
			if (typeof operationHistory !== 'object') {
				throw new Error(`Invalid operationHistory`)
			}
			if (operationHistory.orderNumber) {
				throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.orderNumber cannot be specified`)
			}
			operationHistory.orderNumber = ++orderNumber

			switch (operationHistory.changeType) {
				case ChangeType.DELETE_ROWS:
				case ChangeType.INSERT_VALUES:
				case ChangeType.UPDATE_ROWS:
				case ChangeType.INSERT_REFERENCE_VALUES:
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

			if (!originalRepositoryColumnIndexMap.has(operationHistory.entity.id)) {
				for (const column of operationHistory.entity.columns) {
					if (column.name === 'ORIGINAL_REPOSITORY_ID') {
						originalRepositoryColumnIndexMap.set(operationHistory.entity.id, column.index)
					}
				}
			}

			await this.checkRecordHistories(operationHistory,
				originalRepositoryColumnIndexMap.get(operationHistory.entity.id), message)
		}
	}

	private async checkRecordHistories(
		operationHistory: IOperationHistory,
		originalRepositoryColumnIndex: ColumnIndex,
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
					recordHistory.actor = operationHistory.repositoryTransactionHistory.actor
				case ChangeType.DELETE_ROWS:
				case ChangeType.UPDATE_ROWS:
				case ChangeType.INSERT_REFERENCE_VALUES: {
					const actor = message.actors[recordHistory.actor as any]
					if (!actor) {
						throw new Error(`Did find Actor for "in-message id" in RepositorySynchronizationMessage.history -> operationHistory.actor`)
					}
					recordHistory.actor = actor
					break
				}
			}

			if (recordHistory.operationHistory) {
				throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.recordHistory.operationHistory cannot be specified`)
			}

			this.checkNewValues(recordHistory, originalRepositoryColumnIndex, operationHistory, message)
			this.checkOldValues(recordHistory, originalRepositoryColumnIndex, operationHistory, message)

			recordHistory.operationHistory = operationHistory

			delete recordHistory.id
		}
	}

	private checkNewValues(
		recordHistory: IRecordHistory,
		originalRepositoryColumnIndex: ColumnIndex,
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
			case ChangeType.INSERT_REFERENCE_VALUES:
				if (!(recordHistory.newValues instanceof Array) || !recordHistory.newValues.length) {
					throw new Error(`Must specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.INSERT_VALUES|UPDATE_ROWS|INSERT_REFERENCE_VALUES`)
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
			if (newValue.columnIndex === originalRepositoryColumnIndex) {
				const originalRepository = message.referencedRepositories[newValue.newValue]
				if (!originalRepository) {
					throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
	Value is for ORIGINAL_REPOSITORY_ID and could find RepositorySynchronizationMessage.referencedRepositories[${newValue.newValue}]`)
				}
				newValue.newValue = originalRepository.id
			}
		}
	}

	private checkOldValues(
		recordHistory: IRecordHistory,
		originalRepositoryColumnIndex: ColumnIndex,
		operationHistory: IOperationHistory,
		message: RepositorySynchronizationMessage
	): void {
		switch (operationHistory.changeType) {
			case ChangeType.DELETE_ROWS:
			case ChangeType.INSERT_REFERENCE_VALUES:
			case ChangeType.INSERT_VALUES:
				if (recordHistory.oldValues) {
					throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.DELETE_ROWS|INSERT_REFERENCE_VALUES|INSERT_VALUES`)
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
			if (oldValue.columnIndex === originalRepositoryColumnIndex) {
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
DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker)
