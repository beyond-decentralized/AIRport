import { IOC } from '@airport/direction-indicator'
import {
	JSONFieldInGroupBy,
	JSONFieldInOrderBy,
	JsonNonEntityQuery,
	JSONRelation,
	JsonStatement
} from '@airport/ground-control'
import {
	IEntityAliases,
	IFieldColumnAliases,
	Parameter
} from '../../../definition/core/entity/Aliases'
import {
	IEntityRelationFrom,
	IFrom,
	IQEntityInternal
} from '../../../definition/core/entity/Entity'
import { IFieldInOrderBy } from '../../../definition/core/field/FieldInOrderBy'
import { IQOperableField } from '../../../definition/core/field/OperableField'
import { IAbstractQuery } from '../../../definition/query/facade/AbstractQuery'
import { RawNonEntityQuery } from '../../../definition/query/facade/NonEntityQuery'
import { RawTreeQuery } from '../../../definition/query/facade/TreeQuery'
import { EntityAliases, } from '../../core/entity/Aliases'
import { FieldInOrderBy } from '../../core/field/FieldInOrderBy'
import { ENTITY_UTILS } from '../../../tokens'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'

/**
 * Created by Papa on 10/27/2016.
 */
export abstract class AbstractQuery
	implements IAbstractQuery {

	values: any[]
	protected isEntityQuery: boolean = false

	constructor(
		protected entityAliases: IEntityAliases = new EntityAliases(),
		protected columnAliases: IFieldColumnAliases<any> = entityAliases.getNewFieldColumnAliases()
	) {
	}

	getParameters( //
	): { [alias: string]: Parameter } {
		return this.entityAliases.getParams().getParameters()
	}

	abstract toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonStatement;

	protected getNonEntityQuery(
		rawQuery: RawNonEntityQuery,
		jsonQuery: JsonNonEntityQuery,
		createSelectCallback: { (jsonQuery: JsonNonEntityQuery): void },
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonNonEntityQuery {
		let from = this.fromClauseToJSON(rawQuery.from,
			queryUtils, fieldUtils, relationManager)
		jsonQuery.F = from
		if (createSelectCallback) {
			createSelectCallback(jsonQuery)
		}

		jsonQuery.W = queryUtils.whereClauseToJSON(
			rawQuery.where, this.columnAliases)
		jsonQuery.GB = this.groupByClauseToJSON(rawQuery.groupBy)
		jsonQuery.H = queryUtils.whereClauseToJSON(
			rawQuery.having, this.columnAliases)
		jsonQuery.OB = this.orderByClauseToJSON(rawQuery.orderBy)
		jsonQuery.L = rawQuery.limit
		jsonQuery.O = rawQuery.offset

		return jsonQuery
	}

	protected fromClauseToJSON(
		fromClause: (IFrom | IEntityRelationFrom | RawTreeQuery<any>)[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONRelation[] {
		if (!fromClause) {
			if (this.isEntityQuery) {
				return []
			} else {
				throw new Error('From clause must be present in a non-Entity based query.')
			}
		}
		return fromClause.map((fromEntity) => {
			if (!(IOC.getSync(ENTITY_UTILS).isQEntity(fromEntity))) {
				throw new Error(`FROM clause can contain only Views or Entities.`)
			}
			if (this.isEntityQuery) {
				if (IOC.getSync(ENTITY_UTILS).isQTree(fromEntity)) {
					throw new Error(`Entity FROM clauses can contain only Entities.`)
				}
			}
			return (fromEntity as IQEntityInternal).__driver__
				.getRelationJson(this.columnAliases,
					queryUtils, fieldUtils, relationManager)
		})
	}

	protected groupByClauseToJSON(
		groupBy: IQOperableField<any, any, any, any>[]
	): JSONFieldInGroupBy[] {
		if (!groupBy || !groupBy.length) {
			return null
		}
		return groupBy.map((field) => {
			if (!this.columnAliases.hasAliasFor(field)) {
				throw new Error(`Field used in group by clause is not present in select clause`)
			}
			return {
				fa: this.columnAliases.getExistingAlias(field)
			}
		})
	}

	protected orderByClauseToJSON(
		orderBy: IFieldInOrderBy<any>[]
	): JSONFieldInOrderBy[] {
		if (!orderBy || !orderBy.length) {
			return null
		}
		return orderBy.map((field) => {
			return (<FieldInOrderBy<any>><any>field).toJSON(this.columnAliases)
		})
	}

}
