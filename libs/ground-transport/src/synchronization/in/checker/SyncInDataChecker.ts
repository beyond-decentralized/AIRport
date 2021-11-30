import { TerminalMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	ChangeType,
	TableIndex
} from '@airport/ground-control'
import {
	ISchemaEntity,
	ISchemaVersion,
	SCHEMA_ENTITY_DAO
} from '@airport/airspace'
import {
	SYNC_IN_DATA_CHECKER
} from '../../../tokens'
import { AIRPORT_DATABASE } from '@airport/air-control'
import {
	getSysWideOpIds,
	SEQUENCE_GENERATOR
} from '@airport/check-in'
import { IRecordHistory, RepositoryTransactionType } from '@airport/holding-pattern'

export interface ISyncInDataChecker {

	checkData(
		message: TerminalMessage
	): Promise<boolean>

}

export class SyncInDataChecker
	implements ISyncInDataChecker {

	/**
	 * Every dataMessage.data.repoTransHistories array must be sorted before entering
	 * this method.
	 *
	 * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
	 * @returns {DataCheckResults}
	 */
	async checkData(
		message: TerminalMessage
	): Promise<boolean> {
		const history = message.history
		try {
			if (!history || typeof history !== 'object') {
				throw new Error(`Invalid TerminalMessage.history`)
			}
			if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
				return false
			}

			if (!history.saveTimestamp || typeof history.saveTimestamp !== 'number') {
				throw new Error(`Invalid TerminalMessage.history.saveTimestamp`)
			}

			delete history.id
			delete history.transactionHistory
			history.repositoryTransactionType = RepositoryTransactionType.REMOTE
			history.synced = true

			const schemaEntityMap = await this.populateSchemaEntityMap(message)

			await this.checkOperationHistories(message, schemaEntityMap)
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async populateSchemaEntityMap(
		message: TerminalMessage
	): Promise<Map<string, Map<string, Map<TableIndex, ISchemaEntity>>>> {
		let schemaVersionsById: Map<number, ISchemaVersion> = new Map()
		let schemaVersionIds: number[] = []

		for (const schemaVersion of message.schemaVersions) {
			schemaVersionIds.push(schemaVersion.id)
			schemaVersionsById.set(schemaVersion.id, schemaVersion)
		}
		const schemaEntityDao = await container(this).get(SCHEMA_ENTITY_DAO)
		const schemaEntities = await schemaEntityDao.findAllForSchemaVersions(schemaVersionIds);
		const schemaEntityMap: Map<string, Map<string, Map<TableIndex, ISchemaEntity>>> = new Map()

		for (let schemaEntity of schemaEntities) {
			const schemaVersion = schemaVersionsById.get(schemaEntity.schemaVersion.id)
			let entitiesForDomain = schemaEntityMap.get(schemaVersion.schema.domain.name)
			if (!entitiesForDomain) {
				entitiesForDomain = new Map()
				schemaEntityMap.set(schemaVersion.schema.domain.name, entitiesForDomain)
			}
			let entitiesForSchema = entitiesForDomain.get(schemaVersion.schema.name)
			if (!entitiesForSchema) {
				entitiesForSchema = new Map()
				entitiesForDomain.set(schemaVersion.schema.name, entitiesForSchema)
			}
			entitiesForSchema.set(schemaEntity.index, schemaEntity)
		}

		return schemaEntityMap
	}

	private async checkOperationHistories(
		message: TerminalMessage,
		schemaEntityMap: Map<string, Map<string, Map<TableIndex, ISchemaEntity>>>
	): Promise<void> {
		const history = message.history
		if (!(history.operationHistory instanceof Array) || !history.operationHistory.length) {
			throw new Error(`Invalid TerminalMessage.history.operationHistory`)
		}

		const [airDb, sequenceGenerator] = await container(this)
			.get(AIRPORT_DATABASE, SEQUENCE_GENERATOR)

		const systemWideOperationIds = getSysWideOpIds(
			history.operationHistory.length, airDb, sequenceGenerator)

		let orderNumber = 0

		for (let i = 0; i < history.operationHistory.length; i++) {
			const operationHistory = history.operationHistory[i]
			if (typeof operationHistory !== 'object') {
				throw new Error(`Invalid operationHistory`)
			}
			orderNumber++
			if (operationHistory.orderNumber !== orderNumber) {
				throw new Error(`Invalid operationHistory.orderNumber`)
			}
			let isInsertReferenceValues = false
			switch (operationHistory.changeType) {
				case ChangeType.DELETE_ROWS:
				case ChangeType.INSERT_VALUES:
				case ChangeType.UPDATE_ROWS:
					break;
				case ChangeType.INSERT_REFERENCE_VALUES:
					isInsertReferenceValues = true
					break;
				default:
					throw new Error(`Invalid operationHistory.changeType: ${operationHistory.changeType}`)
			}
			if (typeof operationHistory.entity !== 'object') {
				throw new Error(`Invalid operationHistory.entity`)
			}
			if (typeof operationHistory.entity.schemaVersion !== 'number') {
				throw new Error(`Expecting "in-message index" (number)
					in 'operationHistory.entity.schemaVersion'`)
			}
			const schemaVersion = message.schemaVersions[operationHistory.entity.schemaVersion as any]
			if (!schemaVersion) {
				throw new Error(`Invalid index into message.schemaVersions [${operationHistory.entity.schemaVersion}],
				in operationHistory.entity.schemaVersion`)
			}
			const schemaEntity = schemaEntityMap.get(schemaVersion.schema.domain.name)
				.get(schemaVersion.schema.name).get(operationHistory.entity.index)
			if (!schemaEntity) {
				throw new Error(`Invalid operationHistory.entity.index: ${operationHistory.entity.index}`)
			}
			operationHistory.entity = schemaEntity
			operationHistory.repositoryTransactionHistory = history
			operationHistory.systemWideOperationId = systemWideOperationIds[i]

			delete operationHistory.id

			await this.checkRecordHistories(operationHistory.recordHistory, message)
		}
	}

	private async checkRecordHistories(
		recordHistories: IRecordHistory[],
		message: TerminalMessage
	): Promise<void> {
		if (!(recordHistories instanceof Array) || !recordHistories.length) {
			throw new Error(`Inalid TerminalMessage.history -> operationHistory.recordHistory`)
		}

		for (const recordHistory of recordHistories) {
			// TODO: populate actors and repositories
		}
	}

}

DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker)
