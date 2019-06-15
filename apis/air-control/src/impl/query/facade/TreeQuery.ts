import {
	JsonNonEntityQuery,
	JsonTreeQuery
}                           from '@airport/ground-control'
import {IEntityAliases}     from '../../../lingo/core/entity/Aliases'
import {IQuery}             from '../../../lingo/query/facade/Query'
import {
	ITreeEntity,
	RawTreeQuery
}                           from '../../../lingo/query/facade/TreeQuery'
import {IFieldUtils}        from '../../../lingo/utils/FieldUtils'
import {IQueryUtils}        from '../../../lingo/utils/QueryUtils'
import {EntityAliases}      from '../../core/entity/Aliases'
import {QOneToManyRelation} from '../../core/entity/OneToManyRelation'
import {QField}             from '../../core/field/Field'
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE
}                           from './NonEntityQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export const FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE
	= `Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT`

/**
 * A query whose select facade is a collection of properties.
 */
export abstract class MappableQuery
	extends DistinguishableQuery {

	protected nonDistinctSelectClauseToJSON(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): any {
		let select = {}

		for (let property in rawSelect) {
			let value = rawSelect[property]
			if (value instanceof QField) {
				if (this.isEntityQuery) {
					throw FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE
				}
				// The same value may appear in the select clause more than once.
				// In that case the last one will set the alias for all of them.
				// Because the alias only matters for GROUP BY and ORDER BY
				// that is OK.
				select[property] = value.toJSON(
					this.columnAliases, true, queryUtils, fieldUtils)
			} else if (value instanceof QOneToManyRelation) {
				throw `@OneToMany relation objects can cannot be used in SELECT clauses`
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
								isChildObject    = true
								select[property] = this.nonDistinctSelectClauseToJSON(
									value, queryUtils, fieldUtils)
							}
					}
				} finally {
					if (!isChildObject && !this.isEntityQuery) {
						throw NON_ENTITY_SELECT_ERROR_MESSAGE
					}
				}
			}
		}

		return select
	}
}

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
		fieldUtils: IFieldUtils
	): JsonTreeQuery {
		let jsonMappedQuery: JsonTreeQuery
			    = <JsonTreeQuery>this.getNonEntityQuery(this.rawQuery, <any>{}, (
			jsonQuery: JsonNonEntityQuery
		) => {
			jsonQuery.S = this.selectClauseToJSON(
				this.rawQuery.select, queryUtils, fieldUtils)

		}, queryUtils, fieldUtils)

		return jsonMappedQuery
	}

}
