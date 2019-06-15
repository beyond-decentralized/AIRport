import {IEntityAliases}    from '../../../lingo/core/entity/Aliases'
import {IFieldUtils}       from '../../../lingo/utils/FieldUtils'
import {IQueryUtils}       from '../../../lingo/utils/QueryUtils'
import {QDistinctFunction} from '../../core/field/Functions'
import {AbstractQuery}     from './AbstractQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export const NON_ENTITY_SELECT_ERROR_MESSAGE
	= `Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by "bool","date","num","str" | query wrapped by "field"`

export abstract class DistinguishableQuery
	extends AbstractQuery {

	protected isHierarchicalEntityQuery: boolean = false

	constructor(
		entityAliases?: IEntityAliases
	) {
		super(entityAliases)
	}

	protected selectClauseToJSON(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): any {
		if (rawSelect instanceof QDistinctFunction) {
			if (this.isHierarchicalEntityQuery) {
				throw `Distinct cannot be used in SELECT of Hierarchical/Bridged Entity queries.`
			}
			let rawInnerSelect = rawSelect.getSelectClause()
			let innerSelect    = this.nonDistinctSelectClauseToJSON(
				rawInnerSelect, queryUtils, fieldUtils)
			return rawSelect.toJSON(innerSelect)
		} else {
			return this.nonDistinctSelectClauseToJSON(
				rawSelect, queryUtils, fieldUtils)
		}
	}

	protected abstract nonDistinctSelectClauseToJSON(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): any;

}
