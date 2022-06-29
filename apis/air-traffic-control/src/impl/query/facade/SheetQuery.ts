import { JsonSheetQuery } from '@airport/ground-control'
import { IQuery } from '../../../lingo/query/facade/Query'
import { RawSheetQuery } from '../../../lingo/query/facade/SheetQuery'
import { IFieldUtils } from '../../../lingo/utils/FieldUtils'
import { IQueryUtils } from '../../../lingo/utils/QueryUtils'
import { IRelationManager } from '../../core/entity/RelationManager'
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
			return selectField.toJSON(
				this.columnAliases, true,
				queryUtils, fieldUtils, relationManager)
		})
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonSheetQuery {
		let select = this.selectClauseToJSON(
			this.rawQuery.select,
			queryUtils, fieldUtils, relationManager)

		let jsonFieldQuery: JsonSheetQuery = {
			S: select,
			forUpdate: this.rawQuery.forUpdate
		}

		return <JsonSheetQuery>this.getNonEntityQuery(
			this.rawQuery, jsonFieldQuery, null,
			queryUtils, fieldUtils, relationManager)
	}

}
