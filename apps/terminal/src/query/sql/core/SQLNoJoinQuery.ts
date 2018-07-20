import {
	IAirportDatabase,
	DbEntity,
	QEntity,
	QRelation,
	Utils,
	IUtils
} from "@airport/air-control";
import { JSONEntityRelation } from "@airport/ground-control";
import { SQLDialect } from "./SQLQuery";
import { SQLWhereBase } from "./SQLWhereBase";

/**
 * Created by Papa on 10/2/2016.
 */

export abstract class SQLNoJoinQuery extends SQLWhereBase {

	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		dbEntity: DbEntity,
		dialect: SQLDialect,
	) {
		super(airportDb, utils, dbEntity, dialect);
	}

	protected getTableFragment(
		fromRelation: JSONEntityRelation,
	): string {
		if (!fromRelation) {
			throw `Expecting exactly one table in UPDATE/DELETE clause`;
		}
		if (fromRelation.ri || fromRelation.jt) {
			throw `Table in UPDATE/DELETE clause cannot be joined`;
		}

		const firstDbEntity: DbEntity = this.airportDb.schemas[fromRelation.si][fromRelation.ti];
		if (fromRelation.si !== this.dbEntity.schema.index
			|| fromRelation.ti !== this.dbEntity.index) {
			throw `Unexpected table in UPDATE/DELETE clause: '${firstDbEntity.schema.name}.${firstDbEntity.name}', expecting: '${this.dbEntity.schema.name}.${this.dbEntity.name}'`;
		}

		const firstQEntity: QEntity = new QEntity(firstDbEntity);

		const tableAlias = QRelation.getAlias(fromRelation);
		this.qEntityMapByAlias[tableAlias] = firstQEntity;
		const fromFragment = `\t${this.utils.Schema.getTableName(firstDbEntity)}`;

		return fromFragment;
	}
}