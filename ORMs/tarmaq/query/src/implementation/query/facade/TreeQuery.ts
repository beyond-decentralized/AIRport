import {
	QueryNonEntity,
	QueryTree,
	Repository_GUID
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/IAliases'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IReadQuery } from '../../../definition/query/facade/RawReadQuery'
import {
	ITreeEntity,
	RawOneTimeTreeQuery
} from '../../../definition/query/facade/RawTreeQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { MappableQuery } from './MappableQuery'

export class TreeQuery<ITE extends ITreeEntity>
	extends MappableQuery
	implements IReadQuery {

	constructor(
		public rawQuery: RawOneTimeTreeQuery<ITE>,
		entityAliases: IEntityAliases = new EntityAliases(),
		trackedRepoGUIDSet?: Set<Repository_GUID>,
	) {
		super(entityAliases, trackedRepoGUIDSet)
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryTree {
		let queryTree: QueryTree
			= <QueryTree>this.getNonEntityQuery(this.rawQuery, <any>{}, (
				nonEntityQuery: QueryNonEntity
			) => {
				nonEntityQuery.SELECT = this.rawToQuerySelectClause(
					this.rawQuery.SELECT,
					queryUtils, fieldUtils, queryRelationManager)
				nonEntityQuery.forUpdate = this.rawQuery.FOR_UPDATE

			}, queryUtils, fieldUtils, queryRelationManager)

		return queryTree
	}

}
