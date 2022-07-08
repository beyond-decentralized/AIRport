import {
	DbColumn,
	JSONEntityRelation,
	JsonInsertValues
} from '@airport/ground-control'
import {
	IQEntity,
	IQEntityInternal
} from '../../../definition/core/entity/Entity'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQOperableFieldInternal } from '../../../definition/core/field/OperableField'
import { RawInsertValues } from '../../../definition/query/facade/InsertValues'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { AbstractInsertValues } from './AbstractInsertValues'

/**
 * Created by Papa on 11/17/2016.
 */

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonInsertValues {
		const driver = (<IQEntityInternal><any>this.rawInsertValues.insertInto)
			.__driver__
		const insertInto = driver.getRelationJson(
			this.columnAliases, queryUtils, fieldUtils, relationManager)
		const dbColumns: DbColumn[] = []
		let columnIndexes: number[]
		if (this.columnIndexes) {
			columnIndexes = this.columnIndexes;
			for (let i = 0; i < columnIndexes.length; i++) {
				const dbColumn = driver.dbEntity.columns[columnIndexes[i]]
				this.validateColumn(dbColumn, driver.dbEntity)
				dbColumns.push(dbColumn)
			}
		} else {
			columnIndexes = this.rawInsertValues.columns.map(
				column => {
					const dbColumn = (<IQOperableFieldInternal<any, any, any, any>>column).dbColumn
					this.validateColumn(dbColumn, driver.dbEntity)
					dbColumns.push(dbColumn)

					return dbColumn.index
				})
		}

		return {
			II: insertInto as JSONEntityRelation,
			C: columnIndexes,
			V: this.valuesToJSON(
				this.rawInsertValues.values, dbColumns,
				queryUtils, fieldUtils, relationManager)
		}
	}

}
