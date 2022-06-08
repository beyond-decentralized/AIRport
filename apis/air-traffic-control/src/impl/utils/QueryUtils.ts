import { AirEntityUuId, IAirEntityUtils } from '@airport/aviation-communication'
import { Inject, Injected, IOC } from '@airport/direction-indicator'
import {
	IAirEntity,
	JSONBaseOperation,
	JSONValueOperation,
	OperationCategory,
	SqlOperator
} from '@airport/ground-control'
import { ENTITY_UTILS } from '../../core-tokens'
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases'
import { IQAirEntity, IQEntityInternal } from '../../lingo/core/entity/Entity'
import { IQAirEntityRelation } from '../../lingo/core/entity/Relation'
import { JSONLogicalOperation } from '../../lingo/core/operation/LogicalOperation'
import { JSONRawValueOperation } from '../../lingo/core/operation/Operation'
import { RawFieldQuery } from '../../lingo/query/facade/FieldQuery'
import { IEntityUtils } from '../../lingo/utils/EntityUtils'
import { IFieldUtils } from '../../lingo/utils/FieldUtils'
import { IQueryUtils } from '../../lingo/utils/QueryUtils'
import { IRelationManager } from '../core/entity/RelationManager'
import { QExistsFunction } from '../core/field/Functions'
import { QOperableField } from '../core/field/OperableField'
import { wrapPrimitive } from '../core/field/WrapperFunctions'
import { and } from '../core/operation/LogicalOperation'

@Injected()
export class QueryUtils
	implements IQueryUtils {

	@Inject()
	entityUtils: IEntityUtils
	@Inject()
	fieldUtils: IFieldUtils
	@Inject()
	relationManager: IRelationManager
	@Inject()
	airEntityUtils: IAirEntityUtils

	equals<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entityOrUuId: Entity | IQAirEntity
			| IQAirEntityRelation<Entity, IQ> 
			| AirEntityUuId | string,
		toObject: IQ
		// | IQRelation<IQ>
	): JSONLogicalOperation {
		if (!entityOrUuId) {
			throw new Error(`null entity/Id/UuId is passed into equals method`)
		}
		// if(entityOrUuId instanceof QEntity) {
		let entityUuId: AirEntityUuId
		let entityOrId: AirEntityUuId = entityOrUuId as AirEntityUuId
		if (typeof entityOrUuId === 'string') {
			entityUuId = this.airEntityUtils.parseUuId(entityOrUuId)
		} else  {
			if (!entityOrId.repository
				|| !entityOrId.repository.uuId
				|| typeof entityOrId.repository.uuId !== 'string'
				|| !entityOrId.actor
				|| !entityOrId.actor.uuId
				|| typeof entityOrId.actor.uuId !== 'number'
				|| !entityOrId.actorRecordId
				|| typeof entityOrId.actorRecordId !== 'number') {
				throw new Error(`Passed in AirEntity does not have
				the necessary fields to query by uuId.  Expecting:
					interface AnInterface extends AirEntity {
						repository: {
							uuId: string
						},
						actor: {
							uuId: string
						},
						actorRecordId: number
					}
					`)
			}
			entityUuId = entityOrUuId as AirEntityUuId
		}

		const {
			qActor,
			qRepository
		} = this.entityUtils.ensureRepositoryAndActorJoin(toObject as any as IQEntityInternal)

		return and(
			qRepository.uuId.equals(entityUuId.repository.uuId),
			qActor.uuId.equals(entityUuId.actor.uuId),
			(toObject as any).actorRecordId.equals(entityUuId.actorRecordId)
		)
		// } else {
		// Relations can only be joined by a local Id, implement if necessary
		// only, as this might confuse users and won't work properly in
		// distributed environments (for @CrossRepository() queries, if
		// the referenced repository is not yet loaded) without additional
		// logic to join against the UuIds of the object (anyway).
		// return and(
		// 	toObject.repository.id.equals(entityUuId.repository.id),
		// 	toObject.actor.id.equals(entityUuId.actor.id),
		// 	toObject.actorRecordId.equals(entityUuId.actorRecordId)
		// )
		// }
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
				let jsonQuery = IOC.getSync(ENTITY_UTILS).getTreeQuery(
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
