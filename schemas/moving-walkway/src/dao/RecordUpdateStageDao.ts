import {
	and,
	field,
	or
} from '@airport/air-traffic-control'
import { Injected } from '@airport/direction-indicator';
import {
	ApplicationColumn_Index,
	JSONBaseOperation,
	Application_Index,
	ApplicationVersion_LocalId,
	ApplicationEntity_TableIndex
} from '@airport/ground-control'
import {
	Actor_Id,
	RecordHistoryActorRecordId,
	AirEntity_ActorRecordId,
	Repository_Id
} from '@airport/holding-pattern'
import {
	BaseRecordUpdateStageDao,
	IBaseRecordUpdateStageDao,
	Q,
	QRecordUpdateStage
} from '../generated/generated'

export type RecordUpdateStageValue = any;

export type RecordUpdateStageValues = [
	ApplicationVersion_LocalId,
	ApplicationEntity_TableIndex,
	Repository_Id,
	Actor_Id,
	RecordHistoryActorRecordId,
	ApplicationColumn_Index,
	RecordUpdateStageValue
];

export interface IRecordUpdateStageDao
	extends IBaseRecordUpdateStageDao {

	insertValues(
		values: RecordUpdateStageValues[]
	): Promise<number[][]>;

	updateEntityWhereIds(
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		tableIndex: ApplicationEntity_TableIndex,
		idMap: Map<Repository_Id, Map<Actor_Id, Set<AirEntity_ActorRecordId>>>,
		updatedColumnIndexes: ApplicationColumn_Index[]
	): Promise<void>;

	delete( //
	): Promise<number>;

}

@Injected()
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
			rus.repository._localId,
			rus.actor._localId,
			rus._actorRecordId,
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
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		tableIndex: ApplicationEntity_TableIndex,
		idMap: Map<Repository_Id, Map<Actor_Id, Set<AirEntity_ActorRecordId>>>,
		updatedColumnIndexes: ApplicationColumn_Index[]
	): Promise<void> {
		const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
			.applicationVersion.entities[tableIndex]
		const qEntity = this.airportDatabase.qApplications[applicationIndex][dbEntity.name]

		const repositoryEquals: JSONBaseOperation[] = []
		for (const [repositoryId, idsForRepository] of idMap) {
			const actorEquals: JSONBaseOperation[] = []
			for (const [actorId, idsForActor] of idsForRepository) {
				actorEquals.push(and(
					qEntity['actor'].id.equals(actorId),
					qEntity['_actorRecordId'].in(Array.from(idsForActor))
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
						columnRus.entity.id.equals(dbEntity.index),
						columnRus.repository._localId.equals(qEntity.repository._localId),
						columnRus.actor._localId.equals(qEntity.actor._localId),
						columnRus._actorRecordId.equals(qEntity._actorRecordId),
						columnRus.column.id.equals(column.index)
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
