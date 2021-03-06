import {
	ACTOR_PROPERTY_NAME,
	ACTOR_RECORD_ID_PROPERTY_NAME,
	IAirportDatabase,
	REPOSITORY_PROPERTY_NAME
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
	Actor_LocalId,
	RecordHistory_ActorRecordId,
	AirEntity_ActorRecordId,
	Repository_LocalId
} from '@airport/holding-pattern'
import {
	AND,
	field,
	OR,
} from '@airport/tarmaq-query'
import { Inject } from 'typedi';
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
	Repository_LocalId,
	Actor_LocalId,
	RecordHistory_ActorRecordId,
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
		idMap: Map<Repository_LocalId, Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>>,
		updatedColumnIndexes: ApplicationColumn_Index[]
	): Promise<void>;

	delete( //
	): Promise<number>;

}

@Injected()
export class RecordUpdateStageDao
	extends BaseRecordUpdateStageDao
	implements IRecordUpdateStageDao {

	@Inject()
	airportDatabase: IAirportDatabase

	async insertValues(
		values: RecordUpdateStageValues[]
	): Promise<number[][]> {

		const rus: QRecordUpdateStage = Q.RecordUpdateStage

		const columns = [
			rus.applicationVersion._localId,
			rus.entity._localId,
			rus.repository._localId,
			rus.actor._localId,
			rus._actorRecordId,
			rus.column._localId,
			rus.updatedValue
		]

		return await this.db.insertValuesGenerateIds({
			INSERT_INTO: rus,
			columns,
			VALUES: values
		}, {
			generateOnSync: true
		}) as number[][]

	}

	async updateEntityWhereIds(
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		tableIndex: ApplicationEntity_TableIndex,
		idMap: Map<Repository_LocalId, Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>>,
		updatedColumnIndexes: ApplicationColumn_Index[]
	): Promise<void> {
		const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
			.applicationVersion.entities[tableIndex]
		const qEntity = this.airportDatabase.qApplications[applicationIndex][dbEntity.name]

		const repositoryEquals: JSONBaseOperation[] = []
		for (const [repositoryId, idsForRepository] of idMap) {
			const actorEquals: JSONBaseOperation[] = []
			for (const [actorId, idsForActor] of idsForRepository) {
				actorEquals.push(AND(
					qEntity[ACTOR_PROPERTY_NAME]._localId.equals(actorId),
					qEntity[ACTOR_RECORD_ID_PROPERTY_NAME].IN(Array.from(idsForActor))
				))
			}
			repositoryEquals.push(AND(
				qEntity[REPOSITORY_PROPERTY_NAME]._localId.equals(repositoryId),
				OR(...actorEquals)
			))
		}

		const setClause = {}
		for (const columnIndex of updatedColumnIndexes) {
			const column = dbEntity.columns[columnIndex]
			let columnRus = Q.RecordUpdateStage
			let columnSetClause = field({
				FROM: [
					columnRus
				],
				SELECT: columnRus.updatedValue,
				WHERE:
					AND(
						columnRus.applicationVersion._localId.equals(applicationVersionId),
						columnRus.entity._localId.equals(dbEntity.index),
						columnRus.repository._localId.equals(qEntity.repository._localId),
						columnRus.actor._localId.equals(qEntity.actor._localId),
						columnRus._actorRecordId.equals(qEntity._actorRecordId),
						columnRus.column._localId.equals(column.index)
					)
			})
			setClause[column.name] = columnSetClause
		}

		await this.db.updateColumnsWhere({
			UPDATE: qEntity,
			SET: setClause,
			WHERE: OR(...repositoryEquals)
		})
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			DELETE_FROM: Q.RecordUpdateStage
		})
	}

}
