import {
	IAirportDatabase,
	IEntityUpdateProperties,
	IUtils,
	ManyToOneColumnMapping,
	QRelation,
	Utils
} from "@airport/air-control";
import { JSONClauseObjectType, JsonUpdate } from "@airport/ground-control";
import { SQLNoJoinQuery } from "./SQLNoJoinQuery";
import { SQLDialect } from "./SQLQuery";
import { ClauseType } from "./SQLWhereBase";

/**
 * Created by Papa on 10/2/2016.
 */

export class SQLUpdate
	extends SQLNoJoinQuery {

	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		public jsonUpdate: JsonUpdate<IEntityUpdateProperties>,
		dialect: SQLDialect,
	) {
		super(airportDb, utils, airportDb.schemas[jsonUpdate.U.si][jsonUpdate.U.ti], dialect);
	}

	toSQL(): string {
		if (!this.jsonUpdate.U) {
			throw `Expecting exactly one table in UPDATE clause`;
		}
		let updateFragment = this.getTableFragment(this.jsonUpdate.U);
		let setFragment = this.getSetFragment(this.jsonUpdate.S);
		let whereFragment = '';
		let jsonQuery = this.jsonUpdate;
		if (jsonQuery.W) {
			whereFragment = `WHERE
${this.getWHEREFragment(jsonQuery.W, '')}`;
			// Always replace the root entity alias reference with the table name
			let tableAlias = QRelation.getAlias(this.jsonUpdate.U);
			let tableName = this.utils.Schema.getTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity);
			whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName);
		}

		return `UPDATE
${updateFragment}
SET
${setFragment}
${whereFragment}`;
	}

	protected getSetFragment(
		setClauseFragment: IEntityUpdateProperties
	): string {
		let setFragments = [];
		for (let columnName in setClauseFragment) {
			let value = setClauseFragment[columnName];
			// Skip undefined values
			if (value === undefined) {
				continue;
			}
			this.validator.validateUpdateColumn(this.dbEntity.columnMap[columnName]);
			this.addSetFragment(columnName, value, setFragments);
		}

		return setFragments.join(', \n');
	}

	private addSetFragment(
		columnName: string,
		value: any,
		setFragments: any[]
	) {
		let fieldValue;
		if (typeof value === 'number') {
			this.parameterReferences.push(value);
			fieldValue = this.sqlAdaptor.getParameterReference(this.parameterReferences, value);
		} else {
			fieldValue = this.getFieldValue(value, ClauseType.WHERE_CLAUSE);
		}
		setFragments.push(`\t${columnName} = ${fieldValue}`);
	}

	private isManyToOneRelation(
		value: any
	): boolean {
		return typeof value === 'object'
			&& value.ot === JSONClauseObjectType.MANY_TO_ONE_RELATION;
	}

	private addManyToOneMappings(
		parentMapping: ManyToOneColumnMapping
	): ManyToOneColumnMapping[] {
		let mappings: ManyToOneColumnMapping[] = [];
		const value = parentMapping.value;
		if (typeof value === 'object' &&
			(!value.ot
				|| value.ot === JSONClauseObjectType.MANY_TO_ONE_RELATION)) {
			for (const key in value) {
				if (key === 'ot'
					&& value[key] === JSONClauseObjectType.MANY_TO_ONE_RELATION) {
					continue;
				}
				const mapping: ManyToOneColumnMapping = {
					tableIndex: parentMapping.tableIndex,
					propertyChain: parentMapping.propertyChain.concat([key]),
					value: value[key]
				};
				const childMappings = this.addManyToOneMappings(mapping);
				mappings = mappings.concat(childMappings);
			}
		} else {
			mappings.push(parentMapping);
		}

		return mappings;
	}

}
