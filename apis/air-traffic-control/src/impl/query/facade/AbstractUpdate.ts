import {
	JSONEntityRelation,
	JsonEntityUpdateColumns,
	JsonUpdate
} from '@airport/ground-control'
import {
	IFieldUtils
} from '../../../lingo/utils/FieldUtils'
import {
	IQueryUtils
} from '../../../lingo/utils/QueryUtils'
import {
	IQEntity,
	IQEntityInternal
} from '../../../lingo/core/entity/Entity'
import { AbstractRawUpdate } from '../../../lingo/query/facade/Update'
import { AbstractQuery } from './AbstractQuery'
import { IRelationManager } from '../../core/entity/RelationManager'

export abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>>
	extends AbstractQuery {

	protected constructor(
		public rawUpdate: ARE
	) {
		super()
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonUpdate<JsonEntityUpdateColumns> {
		return {
			U: <JSONEntityRelation>(<IQEntityInternal><any>this.rawUpdate.update)
				.__driver__.getRelationJson(
					this.columnAliases,
					queryUtils, fieldUtils, relationManager),
			S: this.setToJSON(this.rawUpdate.set,
				queryUtils, fieldUtils, relationManager),
			W: queryUtils.whereClauseToJSON(
				this.rawUpdate.where, this.columnAliases)
		}
	}


	protected abstract setToJSON(
		set: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonEntityUpdateColumns;

}
