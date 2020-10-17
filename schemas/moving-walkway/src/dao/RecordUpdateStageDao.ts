import {
	AIR_DB,
	and,
	field,
	or
}                                from '@airport/air-control'
import {container, DI}                      from '@airport/di'
import {
	ColumnIndex,
	JSONBaseOperation,
	SchemaIndex,
	SchemaVersionId,
	TableIndex
}                                from '@airport/ground-control'
import {
	ActorId,
	RecordHistoryActorRecordId,
	RepositoryEntity_ActorRecordId,
	RepositoryId
}                                from '@airport/holding-pattern'
import {RECORD_UPDATE_STAGE_DAO} from '../tokens'
import {
	BaseRecordUpdateStageDao,
	IBaseRecordUpdateStageDao,
	Q,
	QRecordUpdateStage
}                                from '../generated/generated'

export type RecordUpdateStageValue = any;

export type RecordUpdateStageValues = [
	SchemaVersionId,
	TableIndex,
	RepositoryId,
	ActorId,
	RecordHistoryActorRecordId,
	ColumnIndex,
	RecordUpdateStageValue
	];

export interface IRecordUpdateStageDao
	extends IBaseRecordUpdateStageDao {

	insertValues(
		values: RecordUpdateStageValues[]
	): Promise<number>;

	updateEntityWhereIds(
		schemaIndex: SchemaIndex,
		schemaVersionId: SchemaVersionId,
		tableIndex: TableIndex,
		idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>,
		updatedColumnIndexes: ColumnIndex[]
	): Promise<void>;

	delete( //
	): Promise<number>;

}

export class RecordUpdateStageDao
	extends BaseRecordUpdateStageDao
	implements IRecordUpdateStageDao {

	async insertValues(
		values: RecordUpdateStageValues[]
	): Promise<number> {

		const rus: QRecordUpdateStage = Q.RecordUpdateStage

		const columns = [
			rus.schemaVersion.id,
			rus.entity.id,
			rus.repository.id,
			rus.actor.id,
			rus.actorRecordId,
			rus.column.id,
			rus.updatedValue
		]

		for (let i = 1; i <= 50; i++) {
			columns.push(rus[`updatedColumn${i}Value`])
		}

		return await this.db.insertValues({
			insertInto: rus,
			columns,
			values
		})

	}

	async updateEntityWhereIds(
		schemaIndex: SchemaIndex,
		schemaVersionId: SchemaVersionId,
		tableIndex: TableIndex,
		idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>,
		updatedColumnIndexes: ColumnIndex[]
	): Promise<void> {
		const airDb = await container(this).get(AIR_DB)

		const dbEntity = airDb.schemas[schemaIndex].currentVersion.entities[tableIndex]
		const qEntity  = airDb.qSchemas[schemaIndex][dbEntity.name]

		const repositoryEquals: JSONBaseOperation[] = []
		for (const [repositoryId, idsForRepository] of idMap) {
			const actorEquals: JSONBaseOperation[] = []
			for (const [actorId, idsForActor] of idsForRepository) {
				actorEquals.push(and(
					qEntity['actor'].id.equals(actorId),
					qEntity['actorRecordId'].in(Array.from(idsForActor))
				))
			}
			repositoryEquals.push(and(
				qEntity['repository'].id.equals(repositoryId),
				or(...actorEquals)
			))
		}

		const setClause = {}
		for (const columnIndex of updatedColumnIndexes) {
			const column            = dbEntity.columns[columnIndex]
			let columnRus           = Q.RecordUpdateStage
			let columnSetClause     = field({
				from: [
					columnRus
				],
				select: columnRus.updatedValue,
				where:
					and(
						columnRus.schemaVersion.id.equals(schemaVersionId),
						columnRus.entity.id.equals(dbEntity.id),
						columnRus.repository.id.equals(qEntity.repository.id),
						columnRus.actor.id.equals(qEntity.actor.id),
						columnRus.actorRecordId.equals(qEntity.actorRecordId),
						columnRus.column.id.equals(column.id)
					)
			})
			const propertyName      = column
				.propertyColumns[0].property.name
			setClause[propertyName] = columnSetClause
		}

		await this.db.updateColumnsWhere({
			update: qEntity,
			set: setClause,
			where: or(...repositoryEquals)
		})
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.RecordUpdateStage
		})
	}

}

DI.set(RECORD_UPDATE_STAGE_DAO, RecordUpdateStageDao)
