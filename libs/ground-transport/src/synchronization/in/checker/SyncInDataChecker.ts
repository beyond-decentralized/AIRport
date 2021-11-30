import { TerminalMessage } from '@airport/arrivals-n-departures'
import { container, DI } from '@airport/di'
import {
	TableIndex
} from '@airport/ground-control'
import {
	ISchemaEntity,
	ISchemaVersion,
	SCHEMA_ENTITY_DAO
} from '@airport/traffic-pattern'
import {
	SYNC_IN_DATA_CHECKER
} from '../../../tokens'

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

		if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
			return false
		}
		let schemaVersionsById: Map<number, ISchemaVersion> = new Map()
		let schemaVersionIds: number[] = []

		try {
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

			for (const operationHistory of history.operationHistory) {
				if (typeof operationHistory.entity !== 'object') {
					throw new Error(`Invalid operationHistory.entity`)
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
			}
		} catch (e) {
			console.error(e)
			return false
		}
	}

}

DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker)
