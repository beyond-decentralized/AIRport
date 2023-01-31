import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { QOneToManyRelation, QAirEntityOneToManyRelation } from '../../core/entity/OneToManyRelation'
import { QField } from '../../core/field/Field'
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE
} from './DistinguishableQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export const FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE
	= `Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT`

/**
 * A query whose SELECT facade is a collection of properties.
 */
export abstract class MappableQuery
	extends DistinguishableQuery {

	protected rawToQueryNonDistinctSelectClause(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): any {
		let select = {}

		for (let property in rawSelect) {
			let value = rawSelect[property]
			if (value instanceof QField) {
				if (this.isEntityQuery) {
					throw new Error(FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE)
				}
				// The same value may appear in the SELECT clause more than once.
				// In that case the last one will set the alias for all of them.
				// Because the alias only matters for GROUP_BY and ORDER_BY
				// that is OK.
				select[property] = value.toQueryFragment(
					this.columnAliases, true,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, relationManager)
			} else if (value instanceof QOneToManyRelation
				|| value instanceof QAirEntityOneToManyRelation) {
				throw new Error(`@OneToMany relation objects can cannot be used in SELECT clauses`)
			} // Must be a primitive
			else {
				let isChildObject = false
				try {
					// Must be an entity query here
					switch (typeof value) {
						case 'boolean':
						case 'number':
						case 'string':
						case 'undefined':
							continue
						case 'object':
							if (value instanceof Date) {

							} else if (value === null) {

							} else {
								isChildObject = true
								select[property] = this.rawToQueryNonDistinctSelectClause(
									value, queryUtils, fieldUtils, relationManager)
							}
					}
				} finally {
					if (!isChildObject && !this.isEntityQuery) {
						throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE)
					}
				}
			}
		}

		return select
	}
}
