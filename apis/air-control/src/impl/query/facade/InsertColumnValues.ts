import {
	DbColumn,
	JSONEntityRelation,
	JsonInsertValues
}                              from '@airport/ground-control'
import {
	IQEntity,
	IQEntityInternal
}                              from '../../../lingo/core/entity/Entity'
import {RawInsertColumnValues} from '../../../lingo/query/facade/InsertValues'
import {IFieldUtils}           from '../../../lingo/utils/FieldUtils'
import {IQueryUtils}           from '../../../lingo/utils/QueryUtils'
import {AbstractInsertValues}  from './AbstractInsertValues'

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertColumnValues<IQE extends IQEntity<any>>
	extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonInsertValues {
		const entityDriver = (<IQEntityInternal<any>><any>this.rawInsertValues.insertInto).__driver__
		const insertInto   = <JSONEntityRelation>entityDriver.getRelationJson(
			this.columnAliases, queryUtils, fieldUtils)

		const columnMap = entityDriver.dbEntity.columnMap

		const dbColumns: DbColumn[] = []
		const columnIndexes         = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((
			columnName: string
		) => {
			const dbColumn = columnMap[columnName]
			this.validateColumn(dbColumn, entityDriver.dbEntity, columnName);
			dbColumns.push(dbColumn)

			return dbColumn.index
		})

		return {
			II: insertInto,
			C: columnIndexes,
			V: this.valuesToJSON(
				this.rawInsertValues.values, dbColumns, queryUtils, fieldUtils)
		}
	}

}
