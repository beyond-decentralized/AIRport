import {DI}              from '@airport/di'
import {
	JSONFieldInGroupBy,
	JSONFieldInOrderBy,
	JsonNonEntityQuery,
	JSONRelation,
	JsonStatement
}                        from '@airport/ground-control'
import {
	IFieldUtils,
	IQueryUtils
} from '../../..'
import {QUERY_UTILS}     from '../../../diTokens'
import {
	IEntityAliases,
	IFieldColumnAliases,
	Parameter
}                        from '../../../lingo/core/entity/Aliases'
import {
	IEntityRelationFrom,
	IFrom,
	IQEntityInternal
}                        from '../../../lingo/core/entity/Entity'
import {IFieldInOrderBy} from '../../../lingo/core/field/FieldInOrderBy'
import {IQOperableField} from '../../../lingo/core/field/OperableField'
import {IAbstractQuery}  from '../../../lingo/query/facade/AbstractQuery'
import {RawNonEntityQuery} from '../../../lingo/query/facade/NonEntityQuery'
import {RawTreeQuery}      from '../../../lingo/query/facade/TreeQuery'
import {EntityAliases,}    from '../../core/entity/Aliases'
import {
	QEntity,
	QTree
}                          from '../../core/entity/Entity'
import {FieldInOrderBy}    from '../../core/field/FieldInOrderBy'

/**
 * Created by Papa on 10/27/2016.
 */
export abstract class AbstractQuery
	implements IAbstractQuery {

	values: any[]
	protected isEntityQuery: boolean = false

	constructor(
		protected entityAliases: IEntityAliases           = new EntityAliases(),
		protected columnAliases: IFieldColumnAliases<any> = entityAliases.getNewFieldColumnAliases()
	) {
	}

	getParameters( //
	): { [alias: string]: Parameter } {
		return this.entityAliases.getParams().getParameters()
	}

	abstract toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonStatement;

	protected getNonEntityQuery(
		rawQuery: RawNonEntityQuery,
		jsonQuery: JsonNonEntityQuery,
		createSelectCallback: { (jsonQuery: JsonNonEntityQuery): void },
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonNonEntityQuery {
		let from    = this.fromClauseToJSON(rawQuery.from)
		jsonQuery.F = from
		if (createSelectCallback) {
			createSelectCallback(jsonQuery)
		}

		jsonQuery.W  = queryUtils.whereClauseToJSON(
			rawQuery.where, this.columnAliases, fieldUtils)
		jsonQuery.GB = this.groupByClauseToJSON(rawQuery.groupBy)
		jsonQuery.H  = queryUtils.whereClauseToJSON(
			rawQuery.having, this.columnAliases, fieldUtils)
		jsonQuery.OB = this.orderByClauseToJSON(rawQuery.orderBy)
		jsonQuery.L  = rawQuery.limit
		jsonQuery.O  = rawQuery.offset

		return jsonQuery
	}

	protected fromClauseToJSON(
		fromClause: (IFrom | IEntityRelationFrom | RawTreeQuery<any>)[]
	): JSONRelation[] {
		if (!fromClause) {
			if (this.isEntityQuery) {
				return []
			} else {
				throw 'From clause must be present in a non-Entity based query.'
			}
		}
		return fromClause.map((fromEntity) => {
			if (!(fromEntity instanceof QEntity)) {
				throw `FROM clause can contain only Views or Entities.`
			}
			if (this.isEntityQuery) {
				if (fromEntity instanceof QTree) {
					throw `Entity FROM clauses can contain only Entities.`
				}
			}
			return (fromEntity as IQEntityInternal).__driver__.getRelationJson(this.columnAliases)
		})
	}

	protected groupByClauseToJSON(groupBy: IQOperableField<any, any, any, any>[]): JSONFieldInGroupBy[] {
		if (!groupBy || !groupBy.length) {
			return null
		}
		return groupBy.map((field) => {
			if (!this.columnAliases.hasAliasFor(field)) {
				throw `Field used in group by clause is not present in select clause`
			}
			return {
				fa: this.columnAliases.getExistingAlias(field)
			}
		})
	}

	protected orderByClauseToJSON(orderBy: IFieldInOrderBy<any>[]): JSONFieldInOrderBy[] {
		if (!orderBy || !orderBy.length) {
			return null
		}
		return orderBy.map((field) => {
			return (<FieldInOrderBy<any>><any>field).toJSON(this.columnAliases)
		})
	}

}
