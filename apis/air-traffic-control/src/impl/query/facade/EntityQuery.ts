import {
	JSONEntityFieldInOrderBy,
	JsonEntityQuery,
	JSONEntityRelation,
	JsonLimitedEntityQuery
} from '@airport/ground-control'
import {
	IFieldUtils
} from '../../../lingo/utils/FieldUtils'
import {
	IQueryUtils
} from '../../../lingo/utils/QueryUtils'
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity'
import { IFieldInOrderBy } from '../../../lingo/core/field/FieldInOrderBy'
import {
	RawEntityQuery,
	RawLimitedEntityQuery
} from '../../../lingo/query/facade/EntityQuery'
import { IQuery } from '../../../lingo/query/facade/Query'
import { QField } from '../../core/field/Field'
import { FieldInOrderBy } from '../../core/field/FieldInOrderBy'
import { MappableQuery } from './MappableQuery'
import { IRelationManager } from '../../core/entity/RelationManager'

/**
 * Created by Papa on 10/24/2016.
 */

export class EntityQuery<IEP extends IEntitySelectProperties>
	extends MappableQuery
	implements IQuery {

	constructor(
		protected rawQuery: RawEntityQuery<IEP>
	) {
		super()
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
				this.rawQuery.select,
				queryUtils, fieldUtils, relationManager),
			F: <JSONEntityRelation[]>this.fromClauseToJSON(
				this.rawQuery.from,
				queryUtils, fieldUtils, relationManager),
			forUpdate: this.rawQuery.forUpdate,
			W: queryUtils.whereClauseToJSON(
				this.rawQuery.where, this.columnAliases),
			OB: this.orderByClauseToJSON(this.rawQuery.orderBy)
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
		limitedJsonEntity.L = this.rawQuery.limit
		limitedJsonEntity.O = this.rawQuery.offset

		return limitedJsonEntity
	}

}
