import {
	JSONEntityRelation,
	JsonInsertValues
}                              from "@airport/ground-control";
import {
	IQEntity,
	IQEntityInternal
}                              from "../../../lingo/core/entity/Entity";
import {RawInsertColumnValues} from "../../../lingo/query/facade/InsertValues";
import {AbstractInsertValues}  from "./AbstractInsertValues";

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertColumnValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {

	toJSON(): JsonInsertValues {
		const entityDriver = (<IQEntityInternal><any>this.rawInsertValues.insertInto).__driver__;
		const insertInto   = <JSONEntityRelation>entityDriver.getRelationJson(this.columnAliases);

		const columnMap = entityDriver.dbEntity.columnMap;

		return {
			II: insertInto,
			C: this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((
				columnName: string
			) => {
				const dbColumn = columnMap[columnName];
				if (!dbColumn) {
					throw new Error(`
		Could not find column ${columnName} in entity: ${entityDriver.dbEntity.name}
				(table: ${entityDriver.dbEntity.tableConfig.name})
						`);
				}
				return dbColumn.index;
			}),
			V: this.valuesToJSON(this.rawInsertValues.values)
		};
	}

}