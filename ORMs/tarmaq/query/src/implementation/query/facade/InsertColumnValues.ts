import {
	DbColumn,
	QueryEntityRelation,
	QueryInsertValues
} from '@airport/ground-control'
import {
	IQEntity
} from '../../../definition/core/entity/IQEntity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { RawInsertColumnValues } from '../../../definition/query/facade/RawInsertValues'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { AbstractInsertValues } from './AbstractInsertValues'

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertColumnValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryInsertValues {
		const entityDriver = (<IQEntityInternal><any>this.rawInsertValues.INSERT_INTO).__driver__
		const insertInto = <QueryEntityRelation>entityDriver.getQueryRelation(
			this.columnAliases,
			this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
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
			V: this.rawToQueryValuesClause(
				this.rawInsertValues.VALUES, dbColumns,
				queryUtils, fieldUtils, relationManager)
		}
	}

}
