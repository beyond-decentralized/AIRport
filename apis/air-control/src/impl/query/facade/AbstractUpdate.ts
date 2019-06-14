import {
	JSONEntityRelation,
	JsonEntityUpdateColumns,
	JsonUpdate
}                          from '@airport/ground-control'
import {
	IFieldUtils
}                          from '../../../lingo/utils/FieldUtils'
import {
	IQueryUtils
}                          from '../../../lingo/utils/QueryUtils'
import {
	IQEntity,
	IQEntityInternal
}                          from '../../../lingo/core/entity/Entity'
import {AbstractRawUpdate} from '../../../lingo/query/facade/Update'
import {AbstractQuery}     from './AbstractQuery'

export abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>>
	extends AbstractQuery {

	constructor(
		public rawUpdate: ARE
	) {
		super()
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonUpdate<JsonEntityUpdateColumns> {
		return {
			U: <JSONEntityRelation>(<IQEntityInternal><any>this.rawUpdate.update)
				.__driver__.getRelationJson(this.columnAliases),
			S: this.setToJSON(this.rawUpdate.set),
			W: queryUtils.whereClauseToJSON(
				this.rawUpdate.where, this.columnAliases, fieldUtils)
		}
	}


	protected abstract setToJSON(set: any): JsonEntityUpdateColumns;

}
