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
import { RawInsertColumnValues } from '../../../definition/query/facade/InsertValues'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { AbstractInsertValues } from './AbstractInsertValues'

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertColumnValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonInsertValues {
		const entityDriver = (<IQEntityInternal><any>this.rawInsertValues.INSERT_INTO).__driver__
		const insertInto = <JSONEntityRelation>entityDriver.getRelationJson(
			this.columnAliases, this.trackedRepoGUIDSet,
			queryUtils, fieldUtils, relationManager)

		const columnMap = entityDriver.dbEntity.columnMap

		const dbColumns: DbColumn[] = []
		const columnIndexes = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((
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
				this.rawInsertValues.VALUES, dbColumns,
				queryUtils, fieldUtils, relationManager),
			trackedRepoGUIDs: Array.from(this.trackedRepoGUIDSet)
		}
	}

}
