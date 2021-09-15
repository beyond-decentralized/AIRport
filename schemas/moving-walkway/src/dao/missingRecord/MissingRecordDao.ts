import {
	and,
	or
} from '@airport/air-control'
import { AIRPORT_DATABASE } from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	JSONBaseOperation,
	SchemaVersionId,
	TableIndex
} from '@airport/ground-control'
import {
	ActorId,
	RepositoryEntity_ActorRecordId,
	RepositoryId
} from '@airport/holding-pattern'
import { ISchemaVersion } from '@airport/traffic-pattern'
import {
	MissingRecordId,
	MissingRecordStatus,
} from '../../ddl/ddl'
import { MISSING_RECORD_DAO } from '../../tokens'
import {
	BaseMissingRecordDao,
	IBaseMissingRecordDao,
	Q,
	QMissingRecord
} from '../../generated/generated'

export interface IMissingRecordDao
	extends IBaseMissingRecordDao {

	setStatusWhereIdsInAndReturnIds(
		recordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>,
		status: MissingRecordStatus
	): Promise<MissingRecordId[]>;

	findActualIdsByRecordIds(
		recordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>
	): Promise<MissingRecordId[]>;

	deleteWhereIdsIn(
		ids: MissingRecordId[]
	): Promise<void>;

}

export class MissingRecordDao
	extends BaseMissingRecordDao
	implements IMissingRecordDao {

	async setStatusWhereIdsInAndReturnIds(
		recordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>,
		status: MissingRecordStatus
	): Promise<MissingRecordId[]> {
		const ids = await this.findActualIdsByRecordIds(recordIdMap)

		if (!ids.length) {
			return ids
		}

		let mr: QMissingRecord

		await this.db.updateWhere({
			update: mr = Q.MissingRecord,
			set: {
				status
			},
			where: mr.id.in(ids)
		})

		return ids
	}

	async findActualIdsByRecordIds(
		recordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>
	): Promise<MissingRecordId[]> {
		const mr = Q.MissingRecord

		let numClauses = 0

		const currentSchemaVersionMapById: { [schemaVersionId: number]: ISchemaVersion } = {}

		const airDb = await container(this).get(AIRPORT_DATABASE)

		for (const schema of airDb.schemas) {
			const schemaVersion = schema.currentVersion[0].schemaVersion
			currentSchemaVersionMapById[schemaVersion.id] = schemaVersion
		}

		let repositoryWhereFragments: JSONBaseOperation[] = []
		for (const [repositoryId, recordIdsForRepository] of recordIdMap) {
			let schemaWhereFragments: JSONBaseOperation[] = []
			for (const [schemaVersionId, recordIdsForSchema] of recordIdsForRepository) {
				let tableWhereFragments: JSONBaseOperation[] = []
				for (const [tableIndex, recordIdsForTable] of recordIdsForSchema) {
					const dbEntity = currentSchemaVersionMapById[schemaVersionId].entities[tableIndex]
					let actorWhereFragments: JSONBaseOperation[] = []
					for (const [actorId, recordIdsForActor] of recordIdsForTable) {
						numClauses++
						actorWhereFragments.push(and(
							mr.actorRecordId.in(Array.from(recordIdsForActor)),
							mr.actor.id.equals(actorId)
						))
					}
					tableWhereFragments.push(and(
						mr.entity.id.equals(dbEntity.id),
						or(...actorWhereFragments)
					))
				}
				schemaWhereFragments.push(and(
					mr.schemaVersion.id.equals(schemaVersionId),
					or(...tableWhereFragments)
				))
			}
			repositoryWhereFragments.push(and(
				mr.repository.id.equals(repositoryId),
				or(...schemaWhereFragments)
			))
		}

		if (!numClauses) {
			return []
		}

		return await airDb.find.field({
			select: mr.id,
			from: [mr],
			where: or(...repositoryWhereFragments)
		})
	}

	async deleteWhereIdsIn(
		ids: MissingRecordId[]
	): Promise<void> {
		let mr: QMissingRecord
		await this.db.deleteWhere({
			deleteFrom: mr = Q.MissingRecord,
			where: mr.id.in(ids)
		})
	}

}

DI.set(MISSING_RECORD_DAO, MissingRecordDao)
