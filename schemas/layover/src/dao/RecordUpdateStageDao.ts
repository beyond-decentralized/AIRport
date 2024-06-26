import {
	IAirportDatabase
} from '@airport/air-traffic-control'
import { IContext, Inject, Injected } from '@airport/direction-indicator';
import {
	DbColumn_Index,
	QueryBaseOperation,
	Application_Index,
	ApplicationVersion_LocalId,
	DbEntity_TableIndex,
	Dictionary,
	Repository_LocalId,
	Actor_LocalId,
	ActorRecordId
} from '@airport/ground-control'
import {
	AND,
	field,
	OR,
} from '@airport/tarmaq-query'
import { BaseRecordUpdateStageDao, IBaseRecordUpdateStageDao } from '../generated/baseDaos';
import { QRecordUpdateStage } from '../generated/qInterfaces';

export type RecordUpdateStageValue = any;

export type RecordUpdateStageValues = [
	ApplicationVersion_LocalId,
	DbEntity_TableIndex,
	Repository_LocalId,
	Actor_LocalId,
	ActorRecordId,
	DbColumn_Index,
	RecordUpdateStageValue
];

export interface IRecordUpdateStageDao
	extends IBaseRecordUpdateStageDao {

	insertValues(
		values: RecordUpdateStageValues[],
		context: IContext
	): Promise<number[][]>;

	updateEntityWhereIds(
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		entityIndex: DbEntity_TableIndex,
		idMap: Map<Repository_LocalId, Map<Actor_LocalId, Set<ActorRecordId>>>,
		updatedColumnIndexes: DbColumn_Index[],
		context: IContext
	): Promise<void>;

	delete(
		context: IContext
	): Promise<number>;

}

@Injected()
export class RecordUpdateStageDao
	extends BaseRecordUpdateStageDao
	implements IRecordUpdateStageDao {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	dictionary: Dictionary

	async insertValues(
		values: RecordUpdateStageValues[],
		context: IContext
	): Promise<number[][]> {

		const rus: QRecordUpdateStage = this.qSchema.RecordUpdateStage

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
			...context,
			generateOnSync: true
		}) as number[][]

	}

	async updateEntityWhereIds(
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		entityIndex: DbEntity_TableIndex,
		idMap: Map<Repository_LocalId, Map<Actor_LocalId, Set<ActorRecordId>>>,
		updatedColumnIndexes: DbColumn_Index[],
		context: IContext
	): Promise<void> {
		const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
			.applicationVersion.entities[entityIndex]
		const qEntity = this.airportDatabase.qApplications[applicationIndex][dbEntity.name]

		const repositoryEquals: QueryBaseOperation[] = []
		const AirEntityId = this.dictionary.AirEntityId
		for (const [repositoryLid, idsForRepository] of idMap) {
			const actorEquals: QueryBaseOperation[] = []
			for (const [actorLid, idsForActor] of idsForRepository) {
				actorEquals.push(AND(
					qEntity[AirEntityId.properties.actor]._localId.equals(actorLid),
					qEntity[AirEntityId.properties._actorRecordId].IN(Array.from(idsForActor))
				))
			}
			repositoryEquals.push(AND(
				qEntity[AirEntityId.properties.repository]._localId.equals(repositoryLid),
				OR(...actorEquals)
			))
		}

		const setClause = {}
		for (const columnIndex of updatedColumnIndexes) {
			const column = dbEntity.columns[columnIndex]
			let columnRus = this.qSchema.RecordUpdateStage
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
		}, context)
	}

	async delete(
		context: IContext
	): Promise<number> {
		return await this.db.deleteWhere({
			DELETE_FROM: this.qSchema.RecordUpdateStage
		}, context)
	}

}
