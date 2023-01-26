import { JsonSheetQuery } from '@airport/ground-control'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQuery } from '../../../definition/query/facade/Query'
import { RawSheetQuery } from '../../../definition/query/facade/SheetQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { QField } from '../../core/field/Field'
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE,
} from './NonEntityQuery'

/**
 * Created by Papa on 10/23/2016.
 */

export class SheetQuery
	extends DistinguishableQuery
	implements IQuery {

	constructor(
		public rawQuery: RawSheetQuery
	) {
		super()
	}

	nonDistinctSelectClauseToJSON(
		rawSelect: any[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): any {
		if (!(rawSelect instanceof Array)) {
			throw new Error(`Flat Queries an array of fields in SELECT clause.`)
		}
		return rawSelect.map((selectField) => {
			if (!(selectField instanceof QField)) {
				throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE)
			}
			this.columnAliases.entityAliases.getNextAlias(
				selectField.q.__driver__.getRootJoinEntity())
			const jsonClauseField = selectField.toJSON(
				this.columnAliases, true, this.trackedRepoGUIDSet,
				queryUtils, fieldUtils, relationManager)

			return jsonClauseField
		})
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonSheetQuery {
		let select = this.selectClauseToJSON(
			this.rawQuery.SELECT,
			queryUtils, fieldUtils, relationManager)

		let jsonFieldQuery: JsonSheetQuery = {
			S: select,
			forUpdate: this.rawQuery.FOR_UPDATE
		}

		return <JsonSheetQuery>this.getNonEntityQuery(
			this.rawQuery, jsonFieldQuery, null,
			queryUtils, fieldUtils, relationManager)
	}

}
