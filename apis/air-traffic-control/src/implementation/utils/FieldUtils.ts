import { QueryField, Repository_GUID, Repository_LocalId } from '@airport/ground-control'
import { Inject, Injected } from '@airport/direction-indicator'
import {
	FieldQuery,
	IEntityAliases,
	IFieldUtils,
	IQOrderableField,
	IQueryUtils,
	IQueryRelationManager,
	RawFieldQuery
} from '@airport/tarmaq-query'

@Injected()
export class FieldUtils
	implements IFieldUtils {

	@Inject()
	relationManager: IQueryRelationManager

	FieldQuery: typeof FieldQuery

	getFieldQueryJson<IQF extends IQOrderableField<IQF>>(
		fieldSubQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils
	): QueryField {
		let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases,
			trackedRepoGUIDSet, trackedRepoLocalIdSet)

		return subSelectQuery.toQuery(queryUtils, this, this.relationManager)
	}
}
