import {
	QueryEntityFieldInOrderBy,
	QueryEntity,
	QueryEntityRelation,
	QueryEntityLimited,
	Repository_GUID
} from '@airport/ground-control'
import { IEntitySelectProperties } from '../../../definition/core/entity/IQEntity'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IFieldInOrderBy } from '../../../definition/core/field/IFieldInOrderBy'
import {
	RawEntityQuery,
	RawLimitedEntityQuery
} from '../../../definition/query/facade/RawEntityQuery'
import { IReadQuery } from '../../../definition/query/facade/RawReadQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { QField } from '../../core/field/Field'
import { FieldInOrderBy } from '../../core/field/FieldInOrderBy'
import { MappableQuery } from './MappableQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export class EntityQuery<IEP extends IEntitySelectProperties>
	extends MappableQuery
	implements IReadQuery {

	constructor(
		protected rawQuery: RawEntityQuery<IEP>,
		trackedRepoGUIDSet?: Set<Repository_GUID>,
	) {
		super(new EntityAliases(), trackedRepoGUIDSet)
		this.isEntityQuery = true
		this.isHierarchicalEntityQuery = true
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryEntity<IEP> {
		return {
			S: this.rawToQuerySelectClause(
				this.rawQuery.SELECT,
				queryUtils, fieldUtils, relationManager),
			F: <QueryEntityRelation[]>this.rawToQueryFromClause(
				this.rawQuery.FROM,
				queryUtils, fieldUtils, relationManager),
			forUpdate: this.rawQuery.FOR_UPDATE,
			W: queryUtils.whereClauseToQueryOperation(
				this.rawQuery.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet),
			OB: this.orderByClauseToQuery(this.rawQuery.ORDER_BY)
		}
	}

	protected rawToQueryNonDistinctSelectClause(rawSelect: any): any {
		for (let field in rawSelect) {
			let value = rawSelect[field]
			if (value instanceof QField) {
				throw new Error(`Field References cannot be used in Entity Queries`)
			} else if (value instanceof Object && !(value instanceof Date)) {
				this.rawToQueryNonDistinctSelectClause(value)
			}
		}
		return rawSelect
	}

	protected orderByClauseToQuery(orderBy: IFieldInOrderBy<any>[]): QueryEntityFieldInOrderBy[] {
		if (!orderBy || !orderBy.length) {
			return null
		}
		return orderBy.map((field) => {
			return (<FieldInOrderBy<any>><any>field).toEntityJSON()
		})
	}

}

export class LimitedEntityQuery<IEP extends IEntitySelectProperties>
	extends EntityQuery<IEP> {

	constructor(
		public rawQuery: RawLimitedEntityQuery<IEP>
	) {
		super(rawQuery)
		this.isHierarchicalEntityQuery = false
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryEntityLimited<IEP> {
		let queryEntityLimited: QueryEntityLimited<IEP> = super.toQuery(
			queryUtils, fieldUtils, relationManager
		)
		queryEntityLimited.L = this.rawQuery.LIMIT
		queryEntityLimited.O = this.rawQuery.OFFSET

		return queryEntityLimited
	}

}
