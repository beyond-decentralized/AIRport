import { JsonFieldQuery, Repository_GUID, Repository_LocalId } from '@airport/ground-control'
import { Inject, Injected } from '@airport/direction-indicator'
import {
	FieldQuery,
	IEntityAliases,
	IFieldUtils,
	IQOrderableField,
	IQueryUtils,
	IRelationManager,
	RawFieldQuery
} from '@airport/tarmaq-query'

@Injected()
export class FieldUtils
	implements IFieldUtils {

	@Inject()
	relationManager: IRelationManager

	FieldQuery: typeof FieldQuery

	getFieldQueryJson<IQF extends IQOrderableField<IQF>>(
		fieldSubQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils
	): JsonFieldQuery {
		let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases,
			trackedRepoGUIDSet, trackedRepoLocalIdSet)

		return subSelectQuery.toJSON(queryUtils, this, this.relationManager)
	}
}
