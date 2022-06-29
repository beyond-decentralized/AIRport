import {
	JsonNonEntityQuery,
	JsonTreeQuery
} from '@airport/ground-control'
import { IEntityAliases } from '../../../lingo/core/entity/Aliases'
import { IQuery } from '../../../lingo/query/facade/Query'
import {
	ITreeEntity,
	RawTreeQuery
} from '../../../lingo/query/facade/TreeQuery'
import { IFieldUtils } from '../../../lingo/utils/FieldUtils'
import { IQueryUtils } from '../../../lingo/utils/QueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { IRelationManager } from '../../core/entity/RelationManager'
import { MappableQuery } from './MappableQuery'

export class TreeQuery<ITE extends ITreeEntity>
	extends MappableQuery
	implements IQuery {

	constructor(
		public rawQuery: RawTreeQuery<ITE>,
		entityAliases: IEntityAliases = new EntityAliases(),
	) {
		super(entityAliases)
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonTreeQuery {
		let jsonMappedQuery: JsonTreeQuery
			= <JsonTreeQuery>this.getNonEntityQuery(this.rawQuery, <any>{}, (
				jsonQuery: JsonNonEntityQuery
			) => {
				jsonQuery.S = this.selectClauseToJSON(
					this.rawQuery.select,
					queryUtils, fieldUtils, relationManager)
				jsonQuery.forUpdate = this.rawQuery.forUpdate

			}, queryUtils, fieldUtils, relationManager)

		return jsonMappedQuery
	}

}
