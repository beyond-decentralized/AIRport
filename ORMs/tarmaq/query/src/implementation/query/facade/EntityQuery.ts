import {
	JSONEntityFieldInOrderBy,
	JsonEntityQuery,
	JSONEntityRelation,
	JsonLimitedEntityQuery,
	Repository_GUID
} from '@airport/ground-control'
import { IEntitySelectProperties } from '../../../definition/core/entity/Entity'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IFieldInOrderBy } from '../../../definition/core/field/FieldInOrderBy'
import {
	RawEntityQuery,
	RawLimitedEntityQuery
} from '../../../definition/query/facade/EntityQuery'
import { IQuery } from '../../../definition/query/facade/Query'
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
	implements IQuery {

	constructor(
		protected rawQuery: RawEntityQuery<IEP>,
		trackedRepoGUIDSet?: Set<Repository_GUID>,
	) {
		super(new EntityAliases(), trackedRepoGUIDSet)
		this.isEntityQuery = true
		this.isHierarchicalEntityQuery = true
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonEntityQuery<IEP> {
		return {
			S: this.selectClauseToJSON(
				this.rawQuery.SELECT,
				queryUtils, fieldUtils, relationManager),
			F: <JSONEntityRelation[]>this.fromClauseToJSON(
				this.rawQuery.FROM,
				queryUtils, fieldUtils, relationManager),
			forUpdate: this.rawQuery.FOR_UPDATE,
			W: queryUtils.whereClauseToJSON(
				this.rawQuery.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet),
			OB: this.orderByClauseToJSON(this.rawQuery.ORDER_BY)
		}
	}

	protected nonDistinctSelectClauseToJSON(rawSelect: any): any {
		for (let field in rawSelect) {
			let value = rawSelect[field]
			if (value instanceof QField) {
				throw new Error(`Field References cannot be used in Entity Queries`)
			} else if (value instanceof Object && !(value instanceof Date)) {
				this.nonDistinctSelectClauseToJSON(value)
			}
		}
		return rawSelect
	}

	protected orderByClauseToJSON(orderBy: IFieldInOrderBy<any>[]): JSONEntityFieldInOrderBy[] {
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

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonLimitedEntityQuery<IEP> {
		let limitedJsonEntity: JsonLimitedEntityQuery<IEP> = super.toJSON(
			queryUtils, fieldUtils, relationManager
		)
		limitedJsonEntity.L = this.rawQuery.LIMIT
		limitedJsonEntity.O = this.rawQuery.OFFSET

		return limitedJsonEntity
	}

}
