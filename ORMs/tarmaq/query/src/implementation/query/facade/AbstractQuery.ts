import { IOC } from '@airport/direction-indicator'
import {
	QueryFieldInGroupBy,
	QueryFieldInOrderBy,
	QueryNonEntity,
	QueryRelation,
	QueryWhereBase,
	Repository_GUID,
	Repository_LocalId
} from '@airport/ground-control'
import {
	IEntityAliases,
	IFieldColumnAliases,
	Parameter
} from '../../../definition/core/entity/IAliases'
import {
	IEntityRelationFrom,
	IFrom
} from '../../../definition/core/entity/IQEntity'
import { IFieldInOrderBy } from '../../../definition/core/field/IFieldInOrderBy'
import { IQOperableField } from '../../../definition/core/field/IQOperableField'
import { IAbstractQuery } from '../../../definition/query/facade/IAbstractQuery'
import { RawNonEntityQuery } from '../../../definition/query/facade/RawNonEntityQuery'
import { RawTreeQuery } from '../../../definition/query/facade/RawTreeQuery'
import { EntityAliases, } from '../../core/entity/Aliases'
import { FieldInOrderBy } from '../../core/field/FieldInOrderBy'
import { ENTITY_UTILS } from '../../../injection'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'

/**
 * Created by Papa on 10/27/2016.
 */
export abstract class AbstractQuery
	implements IAbstractQuery {

	values: any[]
	protected isEntityQuery: boolean = false

	constructor(
		protected entityAliases: IEntityAliases = new EntityAliases(),
		protected columnAliases: IFieldColumnAliases<any> = entityAliases.getNewFieldColumnAliases(),
		public trackedRepoGUIDSet: Set<Repository_GUID> = new Set(),
		public trackedRepoLocalIdSet: Set<Repository_LocalId> = new Set()
	) {
	}

	getParameters( //
	): { [alias: string]: Parameter } {
		return this.entityAliases.getParams().getParameters()
	}

	abstract toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryWhereBase;

	protected getNonEntityQuery(
		rawQuery: RawNonEntityQuery,
		queryNonEntity: QueryNonEntity,
		createSelectCallback: { (queryNonEntity: QueryNonEntity): void },
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryNonEntity {
		let from = this.rawToQueryFromClause(rawQuery.FROM,
			queryUtils, fieldUtils, relationManager)
		queryNonEntity.F = from
		if (createSelectCallback) {
			createSelectCallback(queryNonEntity)
		}

		queryNonEntity.W = queryUtils.whereClauseToQueryOperation(
			rawQuery.WHERE, this.columnAliases,
			this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		queryNonEntity.GB = this.groupByClauseToQuery(rawQuery.GROUP_BY)
		queryNonEntity.H = queryUtils.whereClauseToQueryOperation(
			rawQuery.HAVING, this.columnAliases,
			this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		queryNonEntity.OB = this.orderByClauseToQuery(rawQuery.ORDER_BY)
		queryNonEntity.L = rawQuery.LIMIT
		queryNonEntity.O = rawQuery.OFFSET

		return queryNonEntity
	}

	protected rawToQueryFromClause(
		fromClause: (IFrom | IEntityRelationFrom | RawTreeQuery<any>)[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryRelation[] {
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
				.getQueryRelation(this.columnAliases,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, relationManager)
		})
	}

	protected groupByClauseToQuery(
		groupBy: IQOperableField<any, any, any, any>[]
	): QueryFieldInGroupBy[] {
		if (!groupBy || !groupBy.length) {
			return null
		}
		return groupBy.map((field) => {
			if (!this.columnAliases.hasAliasFor(field)) {
				throw new Error(`Field used in group by clause is not present in SELECT clause`)
			}
			return {
				fa: this.columnAliases.getExistingAlias(field)
			}
		})
	}

	protected orderByClauseToQuery(
		orderBy: IFieldInOrderBy<any>[]
	): QueryFieldInOrderBy[] {
		if (!orderBy || !orderBy.length) {
			return null
		}
		return orderBy.map((field) => {
			return (<FieldInOrderBy<any>><any>field).toQueryFragment(this.columnAliases)
		})
	}

}
