import {
	JsonNonEntityQuery,
	JsonTreeQuery
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/Aliases'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQuery } from '../../../definition/query/facade/Query'
import {
	ITreeEntity,
	RawTreeQuery
} from '../../../definition/query/facade/TreeQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
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
