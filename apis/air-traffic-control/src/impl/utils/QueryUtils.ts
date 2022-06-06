import {
	IRepositoryEntity,
	JSONBaseOperation,
	JSONValueOperation,
	OperationCategory,
	SqlOperator
} from '@airport/ground-control'
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases'
import { JSONLogicalOperation } from '../../lingo/core/operation/LogicalOperation'
import { JSONRawValueOperation } from '../../lingo/core/operation/Operation'
import { RawFieldQuery } from '../../lingo/query/facade/FieldQuery'
import { IFieldUtils } from '../../lingo/utils/FieldUtils'
import { IQueryUtils } from '../../lingo/utils/QueryUtils'
import { IRelationManager } from '../core/entity/RelationManager'
import { QExistsFunction } from '../core/field/Functions'
import { QOperableField } from '../core/field/OperableField'
import { wrapPrimitive } from '../core/field/WrapperFunctions'
import { Inject, Injected } from '@airport/direction-indicator'
import { TreeQuery } from '../query/facade/TreeQuery'
import { IQEntityInternal, IQRepositoryEntity } from '../../lingo/core/entity/Entity'
import { IQRepositoryEntityRelation } from '../../lingo/core/entity/Relation'
import { IRepositoryEntityUtils, RepositoryEntityId } from '@airport/aviation-communication'
import { and } from '../core/operation/LogicalOperation'

@Injected()
export class QueryUtils
	implements IQueryUtils {

	@Inject()
	fieldUtils: IFieldUtils
	@Inject()
	relationManager: IRelationManager
	@Inject()
	repositoryEntityUtils: IRepositoryEntityUtils

	equals<Entity extends IRepositoryEntity, IQ extends IQEntityInternal>(
		entityOrIdOrUuId: Entity | IQRepositoryEntity
			| IQRepositoryEntityRelation<Entity, IQ> | RepositoryEntityId | string,
		toObject
	): JSONLogicalOperation {
		if (!entityOrIdOrUuId) {
			throw new Error(`null entity/Id/UuId is passed into equals method`)
		}
		let entityId: RepositoryEntityId
		let entityUuId: RepositoryEntityId
		if (typeof entityOrIdOrUuId === 'string') {
			if (entityOrIdOrUuId.split('-').length == 3) {
				entityId = this.repositoryEntityUtils.parseId(entityOrIdOrUuId)
			} else {
				entityUuId = this.repositoryEntityUtils.parseId(entityOrIdOrUuId)
			}
		} else if (entityOrIdOrUuId.repository.uuId
			&& entityOrIdOrUuId.actor.uuId) {
			entityUuId = entityOrIdOrUuId as RepositoryEntityId
		} else {
			entityId = entityOrIdOrUuId as RepositoryEntityId
		}
		if (entityId) {
			return and(
				toObject.repository.id.equals(entityId.repository.id),
				toObject.actor.id.equals(entityId.actor.id),
				toObject.actorRecordId.equals(entityId.actorRecordId)
			)
		} else {
			return and(
				toObject.repository.id.equals(entityUuId.repository.uuId),
				toObject.actor.id.equals(entityUuId.actor.uuId),
				toObject.actorRecordId.equals(entityUuId.actorRecordId)
			)
		}
	}

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation {
		if (!whereClause) {
			return null
		}
		let operation: JSONBaseOperation = whereClause
		let jsonOperation: JSONBaseOperation = {
			c: operation.c,
			o: operation.o
		}
		switch (operation.c) {
			case OperationCategory.LOGICAL:
				let logicalOperation = <JSONLogicalOperation>operation
				let jsonLogicalOperation = <JSONLogicalOperation>jsonOperation
				switch (operation.o) {
					case SqlOperator.NOT:
						jsonLogicalOperation.v = this.whereClauseToJSON(
							<JSONBaseOperation>logicalOperation.v, columnAliases)
						break
					case SqlOperator.AND:
					case SqlOperator.OR:
						jsonLogicalOperation.v = (<JSONBaseOperation[]>logicalOperation.v).map((value) =>
							this.whereClauseToJSON(value, columnAliases)
						)
						break
					default:
						throw new Error(`Unsupported logical operation '${operation.o}'`)
				}
				break
			case OperationCategory.FUNCTION:
				// TODO: verify that cast of Q object is valid
				let functionOperation: QExistsFunction<any> = <QExistsFunction<any>><any>operation
				let query = functionOperation.getQuery()
				let jsonQuery = new TreeQuery(
					query, columnAliases.entityAliases).toJSON(this,
						this.fieldUtils, this.relationManager)
				jsonOperation = functionOperation.toJSON(jsonQuery)
				break
			case OperationCategory.BOOLEAN:
			case OperationCategory.DATE:
			case OperationCategory.NUMBER:
			case OperationCategory.STRING:
			case OperationCategory.UNTYPED:
				let valueOperation: JSONRawValueOperation<any> = <JSONRawValueOperation<any>>operation
				// All Non logical or exists operations are value operations (eq, isNull, like,
				// etc.)
				let jsonValueOperation: JSONValueOperation = <JSONValueOperation>jsonOperation
				jsonValueOperation.l = this.convertLRValue(
					valueOperation.l, columnAliases)
				let rValue = valueOperation.r
				if (rValue instanceof Array) {
					jsonValueOperation.r = rValue.map((anRValue) => {
						return this.convertLRValue(anRValue, columnAliases)
					})
				} else {
					jsonValueOperation.r = this.convertLRValue(rValue, columnAliases)
				}
				break
		}

		return jsonOperation
	}

	private convertLRValue(
		value,
		columnAliases: IFieldColumnAliases<any>
	): any {
		value = wrapPrimitive(value)
		switch (typeof value) {
			case 'undefined':
				throw new Error(`'undefined' is not a valid L or R value`)
			default:
				if (value instanceof QOperableField) {
					return value.toJSON(columnAliases, false,
						this, this.fieldUtils, this.relationManager)
				} // Must be a Field Query
				else {
					let rawFieldQuery: RawFieldQuery<any> = value
					return this.fieldUtils.getFieldQueryJson(
						rawFieldQuery, columnAliases.entityAliases, this)
				}
		}
	}
}
