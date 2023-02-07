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
import { IQOperableFieldInternal } from '../../../definition/core/field/IQOperableField'
import { RawInsertValues } from '../../../definition/query/facade/RawInsertValues'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { AbstractInsertValues } from './AbstractInsertValues'

/**
 * Created by Papa on 11/17/2016.
 */

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryInsertValues {
		const driver = (<IQEntityInternal><any>this.rawInsertValues.INSERT_INTO)
			.__driver__
		const insertInto = driver.getQueryRelation(
			this.columnAliases,
			this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
			queryUtils, fieldUtils, queryRelationManager)
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
			INSERT_INTO: insertInto as QueryEntityRelation,
			COLUMNS: columnIndexes,
			VALUES: this.rawToQueryValuesClause(
				this.rawInsertValues.VALUES, dbColumns,
				queryUtils, fieldUtils, queryRelationManager)
		}
	}

}
