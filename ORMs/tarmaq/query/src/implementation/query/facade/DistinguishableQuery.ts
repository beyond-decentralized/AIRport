import { Repository_GUID, Repository_LocalId } from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/IAliases'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/aliases'
import { QDistinctFunction } from '../../core/field/functions'
import { AbstractQuery } from './AbstractQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export const NON_ENTITY_SELECT_ERROR_MESSAGE
	= `Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by "bool","date","num","str" | query wrapped by "field"`

export abstract class DistinguishableQuery
	extends AbstractQuery {

	protected isHierarchicalEntityQuery: boolean = false

	constructor(
		entityAliases: IEntityAliases = new EntityAliases(),
		trackedRepoGUIDSet?: Set<Repository_GUID>,
		trackedRepoLidSet?: Set<Repository_LocalId>,
	) {
		super(entityAliases,
			entityAliases.getNewFieldColumnAliases(),
			trackedRepoGUIDSet, trackedRepoLidSet)
	}

	protected rawToQuerySelectClause(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): any {
		if (rawSelect instanceof QDistinctFunction) {
			if (this.isHierarchicalEntityQuery) {
				throw new Error(`Distinct cannot be used in SELECT of Hierarchical/Bridged Entity queries.`)
			}
			let rawInnerSelect = rawSelect.getSelectClause()
			let innerSelect = this.rawToQueryNonDistinctSelectClause(
				rawInnerSelect, queryUtils, fieldUtils, queryRelationManager)
			return rawSelect.toQueryFragment(innerSelect)
		} else {
			return this.rawToQueryNonDistinctSelectClause(
				rawSelect, queryUtils, fieldUtils, queryRelationManager)
		}
	}

	protected abstract rawToQueryNonDistinctSelectClause(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): any;

}
