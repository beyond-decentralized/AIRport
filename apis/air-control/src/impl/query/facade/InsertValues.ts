import {
	DbColumn,
	JSONEntityRelation,
	JsonInsertValues
}                                from '@airport/ground-control'
import {
	IQEntity,
	IQEntityInternal
}                                from '../../../lingo/core/entity/Entity'
import {IQOperableFieldInternal} from '../../../lingo/core/field/OperableField'
import {RawInsertValues}         from '../../../lingo/query/facade/InsertValues'
import {IFieldUtils}             from '../../../lingo/utils/FieldUtils'
import {IQueryUtils}             from '../../../lingo/utils/QueryUtils'
import {AbstractInsertValues}    from './AbstractInsertValues'

/**
 * Created by Papa on 11/17/2016.
 */

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonInsertValues {
		const insertInto            = <JSONEntityRelation>
			(<IQEntityInternal><any>this.rawInsertValues.insertInto)
				.__driver__.getRelationJson(
					this.columnAliases, queryUtils, fieldUtils)
		const dbColumns: DbColumn[] = []
		const columnIndexes         = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map(
			column => {
				const dbColumn = (<IQOperableFieldInternal<any, any, any, any>>column).dbColumn
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
