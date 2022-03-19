import {
	JsonDelete,
	JSONEntityRelation
}                      from '@airport/ground-control'
import {
	IFieldUtils
}                      from '../../../lingo/utils/FieldUtils'
import {
	IQueryUtils
}                      from '../../../lingo/utils/QueryUtils'
import {
	IQEntity,
	IQEntityInternal
}                      from '../../../lingo/core/entity/Entity'
import {RawDelete}     from '../../../lingo/query/facade/Delete'
import {AbstractQuery} from './AbstractQuery'

/**
 * Created by Papa on 10/2/2016.
 */

export class Delete<IQE extends IQEntity>
	extends AbstractQuery {

	constructor(
		public rawDelete: RawDelete<IQE>
	) {
		super()
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonDelete {
		return {
			DF: <JSONEntityRelation>(<IQEntityInternal><any>this.rawDelete.deleteFrom)
				.__driver__.getRelationJson(
					this.columnAliases, queryUtils, fieldUtils),
			W: queryUtils.whereClauseToJSON(this.rawDelete.where, this.columnAliases, fieldUtils)
		}
	}
}
