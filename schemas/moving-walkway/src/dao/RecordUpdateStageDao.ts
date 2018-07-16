import {
	AirportDatabaseToken,
	and,
	ColumnIndex,
	field,
	IAirportDatabase,
	IUtils,
	or,
	SchemaIndex,
	TableIndex,
	UtilsToken
} from "@airport/air-control";
import {JSONBaseOperation}         from "@airport/ground-control";
import {
	ActorId,
	RecordHistoryActorRecordId,
	RepositoryEntityActorRecordId,
	RepositoryId
}                                  from "@airport/holding-pattern";
import {SchemaEntityIndex}         from "@airport/traffic-pattern";
import {
	Inject,
	Service
}                                  from "typedi";
import {
	BaseRecordUpdateStageDao,
	IBaseRecordUpdateStageDao,
	Q,
	QRecordUpdateStage
}                                  from "../generated/generated";
import {RecordUpdateStageDaoToken} from "../InjectionTokens";

export type RecordUpdateStageValue = any;

export type RecordUpdateStageValues = [
	SchemaIndex,
	SchemaEntityIndex,
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
		tableIndex: TableIndex,
		idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>,
		updatedColumnIndexes: ColumnIndex[]
	): Promise<void>;

	delete( //
	): Promise<number>;

}

@Service(RecordUpdateStageDaoToken)
export class RecordUpdateStageDao
	extends BaseRecordUpdateStageDao
	implements IRecordUpdateStageDao {

	async insertValues(
		values: RecordUpdateStageValues[]
	): Promise<number> {

		const rus: QRecordUpdateStage = Q.RecordUpdateStage;

		const columns = [
			rus.schema.index,
			rus.entity.index,
			rus.repository.id,
			rus.actor.id,
			rus.actorRecordId,
			rus.column.index,
			rus.updatedValue
		];

		for (let i = 1; i <= 50; i++) {
			columns.push(rus[`updatedColumn${i}Value`]);
		}

		return await this.db.insertValues({
			insertInto: rus,
			columns,
			values
		});

	}

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async updateEntityWhereIds(
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>,
		updatedColumnIndexes: ColumnIndex[]
	): Promise<void> {
		const dbEntity = this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
		const qEntity = this.airportDb.qSchemas[schemaIndex][dbEntity.name];

		const repositoryEquals: JSONBaseOperation[] = [];
		for (const [repositoryId, idsForRepository] of idMap) {
			const actorEquals: JSONBaseOperation[] = [];
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

		const setClause = {};
		for (const columnIndex of updatedColumnIndexes) {
			let columnRus = Q.RecordUpdateStage;
			let columnSetClause = field({
				from: [
					columnRus
				],
				select: columnRus.updatedValue,
				where:
					and(
						columnRus.schema.index.equals(schemaIndex),
						columnRus.entity.index.equals(tableIndex),
						columnRus.repository.id.equals(qEntity.repository.id),
						columnRus.actor.id.equals(qEntity.actor.id),
						columnRus.actorRecordId.equals(qEntity.actorRecordId),
						columnRus.column.index.equals(columnIndex)
					)
			});
			const propertyName = dbEntity.columns[columnIndex]
				.propertyColumns[0].property.name;
			setClause[propertyName] = columnSetClause;
		}

		await this.db.updateColumnsWhere({
			update: qEntity,
			set: setClause,
			where: or(...repositoryEquals)
		});
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.RecordUpdateStage
		});
	}

}