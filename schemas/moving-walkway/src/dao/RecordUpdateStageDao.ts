import {
	AIRPORT_DATABASE,
	and,
	field,
	or
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	ColumnIndex,
	JSONBaseOperation,
	ApplicationIndex,
	ApplicationVersionId,
	TableIndex
} from '@airport/ground-control'
import {
	Actor_Id,
	RecordHistoryActorRecordId,
	RepositoryEntity_ActorRecordId,
	Repository_Id
} from '@airport/holding-pattern'
import { RECORD_UPDATE_STAGE_DAO } from '../tokens'
import {
	BaseRecordUpdateStageDao,
	IBaseRecordUpdateStageDao,
	Q,
	QRecordUpdateStage
} from '../generated/generated'

export type RecordUpdateStageValue = any;

export type RecordUpdateStageValues = [
	ApplicationVersionId,
	TableIndex,
	Repository_Id,
	Actor_Id,
	RecordHistoryActorRecordId,
	ColumnIndex,
	RecordUpdateStageValue
];

export interface IRecordUpdateStageDao
	extends IBaseRecordUpdateStageDao {

	insertValues(
		values: RecordUpdateStageValues[]
	): Promise<number[][]>;

	updateEntityWhereIds(
		applicationIndex: ApplicationIndex,
		applicationVersionId: ApplicationVersionId,
		tableIndex: TableIndex,
		idMap: Map<Repository_Id, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>,
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
	): Promise<number[][]> {

		const rus: QRecordUpdateStage = Q.RecordUpdateStage

		const columns = [
			rus.applicationVersion.id,
			rus.entity.id,
			rus.repository.id,
			rus.actor.id,
			rus.actorRecordId,
			rus.column.id,
			rus.updatedValue
		]

		return await this.db.insertValuesGenerateIds({
			insertInto: rus,
			columns,
			values
		}, {
			generateOnSync: true
		}) as number[][]

	}

	async updateEntityWhereIds(
		applicationIndex: ApplicationIndex,
		applicationVersionId: ApplicationVersionId,
		tableIndex: TableIndex,
		idMap: Map<Repository_Id, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>,
		updatedColumnIndexes: ColumnIndex[]
	): Promise<void> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const dbEntity = airDb.applications[applicationIndex].currentVersion[0]
			.applicationVersion.entities[tableIndex]
		const qEntity = airDb.qApplications[applicationIndex][dbEntity.name]

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
			const column = dbEntity.columns[columnIndex]
			let columnRus = Q.RecordUpdateStage
			let columnSetClause = field({
				from: [
					columnRus
				],
				select: columnRus.updatedValue,
				where:
					and(
						columnRus.applicationVersion.id.equals(applicationVersionId),
						columnRus.entity.id.equals(dbEntity.id),
						columnRus.repository.id.equals(qEntity.repository.id),
						columnRus.actor.id.equals(qEntity.actor.id),
						columnRus.actorRecordId.equals(qEntity.actorRecordId),
						columnRus.column.id.equals(column.id)
					)
			})
			setClause[column.name] = columnSetClause
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
