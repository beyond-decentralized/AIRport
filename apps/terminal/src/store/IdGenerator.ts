import {
	AirportDatabaseToken,
	DbEntity,
	IAirportDatabase,
	IQOrderableField, IUtils,
	max,
	Primitive,
	RawNonEntityQuery,
	RawSheetQuery,
	unionAll,
	Utils,
	UtilsToken,
} from "@airport/air-control";
import {Q}                from "@airport/holding-pattern";
import {
	Inject,
	Service
}                         from "typedi";
import {IdGeneratorToken} from "../InjectionTokens";

export interface IIdGenerator {

	generateTransHistoryId( //
	): number;

	generateRepoTransHistoryId( //
	): number

	generateOperationHistoryId( //
	): number;

	generateRecordHistoryId( //
	): number;

	generateHoldingPatternEntityId(
		holdingPatternEntityName: string
	): number;

	generateEntityId(
		dbEntity: DbEntity,
		entity: any,
	): number;

	loadLatestIds( //
	): Promise<void>;

}

/**
 * Created by Papa on 9/2/2016.
 */

@Service(IdGeneratorToken)
export class IdGenerator
	implements IIdGenerator {

	private lastIds: number[][];

	constructor(
		@Inject(
			_ => AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(
			_ => UtilsToken)
		private utils: IUtils
	) {
	}

	generateTransHistoryId( //
	): number {
		return this.generateHoldingPatternEntityId(
			'TransactionHistory');
	}

	generateRepoTransHistoryId( //
	): number {
		return this.generateHoldingPatternEntityId(
			'RepositoryTransactionHistory');
	}

	generateOperationHistoryId( //
	): number {
		return this.generateHoldingPatternEntityId(
			'OperationHistory');
	}

	generateRecordHistoryId( //
	): number {
		return this.generateHoldingPatternEntityId(
			'RecordHistory');
	}

	generateHoldingPatternEntityId(
		holdingPatternEntityName: string
	): number {
		const dbEntity = Q.db.entityMapByName[holdingPatternEntityName];

		return this.generateEntityId(dbEntity);
	}

	generateEntityId(
		dbEntity: DbEntity,
		entity: any = null,
	): number {
		if (!this.lastIds) {
			throw `Id cache is not loaded.`;
			// await this.loadLatestIds();
		}
		let newId = ++this.lastIds[dbEntity.schema.index][dbEntity.index];

		if (!entity) {
			return newId;
		}

		const recordWithId = {
			...entity,
		};

		let columnName = dbEntity.idColumns[0].name;
		recordWithId[columnName] = newId;

		return recordWithId;
	}

	/**
	 * Ids are tracked on per-Entity basis.  Id's are assigned optimistically can be
	 * retroactively updated if sync conflicts arise.  At load time latest ids
	 * are loaded into memory and then are maintained in memory for the uptime of the
	 * db server.
	 * @returns {Promise<void>}
	 */
	async loadLatestIds( //
	): Promise<void> {
		const maxIdRecords = await this.airportDb.db.find.sheet(this.getMaxIdQueries());

		this.lastIds = [];
		for (const maxIdRecord of maxIdRecords) {
			const schemaLastIds = this.utils.ensureChildArray(this.lastIds, maxIdRecord[0]);
			let id = maxIdRecord[2];
			if (!id) {
				id = 0;
			}
			schemaLastIds[maxIdRecord[1]] = id;
		}
	}

	private generateByHoldingPatternEntityName(
		entityName: string
	): Promise<number> {
		const dbEntity = Q.db.entityMapByName[entityName];

		return <any>this.generateEntityId(dbEntity);
	}

	private getMaxIdQueries(): RawNonEntityQuery {
		const idQueries: RawSheetQuery[] = [];
		for (const schema of this.airportDb.schemas) {
			const qSchema = this.airportDb.qSchemas[schema.index];
			for (const entity of schema.entities) {
				if (entity.idColumns.length > 1) {
					continue;
				}
				const idColumn = entity.idColumns[0];
				if (!idColumn.isGenerated) {
					continue;
				}
				const qEntity = qSchema[entity.name];
				const select: (IQOrderableField<any> | Primitive)[] = [];
				select.push(schema.index);
				select.push(entity.index);
				select.push(max(qEntity[idColumn.name]));
				let query: RawSheetQuery = {
					select,
					from: [qEntity],
				};
				idQueries.push(query);
			}
		}

		return unionAll(...idQueries);
	};

}
