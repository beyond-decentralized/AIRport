import {
	AirEntityId,
	IAirEntityUtils
} from '@airport/aviation-communication'
import {
	Inject,
	Injected,
	IOC
} from '@airport/direction-indicator'
import {
	IAirEntity,
	JSONBaseOperation,
	JSONValueOperation,
	OperationCategory,
	SqlOperator
} from '@airport/ground-control'
import {
	and,
	ENTITY_UTILS,
	IEntityUtils,
	IFieldColumnAliases,
	IFieldUtils,
	IQAirEntity,
	IQAirEntityRelation,
	IQEntityInternal,
	IQueryUtils,
	IRelationManager,
	JSONLogicalOperation,
	JSONRawValueOperation,
	QExistsFunction,
	QOperableField,
	RawFieldQuery,
	wrapPrimitive
} from '@airport/tarmaq-query'

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
		entityOrId: Entity | IQAirEntity
			| IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string,
		toObject: IQ
		// | IQRelation<IQ>
	): JSONLogicalOperation {
		if (!entityOrId) {
			throw new Error(`null entity/Id is passed into equals method`)
		}
		// if(entityOrId instanceof QEntity) {
		let entityId: AirEntityId
		let theEntityOrId: AirEntityId = entityOrId as AirEntityId
		if (typeof entityOrId === 'string') {
			entityId = this.airEntityUtils.parseEGUID(entityOrId)
		} else {
			if (!theEntityOrId.repository
				|| !theEntityOrId.repository.GUID
				|| typeof theEntityOrId.repository.GUID !== 'string'
				|| !theEntityOrId.actor
				|| !theEntityOrId.actor.GUID
				|| typeof theEntityOrId.actor.GUID !== 'number'
				|| !theEntityOrId._actorRecordId
				|| typeof theEntityOrId._actorRecordId !== 'number') {
				throw new Error(`Passed in AirEntity does not have
				the necessary fields to query by id.  Expecting:
					interface AnInterface extends AirEntity {
						repository: {
							GUID: string
						},
						actor: {
							GUID: string
						},
						_actorRecordId: number
					}
					`)
			}
			entityId = theEntityOrId as AirEntityId
		}

		const {
			qActor,
			qRepository
		} = this.entityUtils.ensureRepositoryAndActorJoin(toObject as any as IQEntityInternal)

		return and(
			qRepository.GUID.equals(entityId.repository.GUID),
			qActor.GUID.equals(entityId.actor.GUID),
			(toObject as any)._actorRecordId.equals(entityId._actorRecordId)
		)
		// } else {
		// Relations can only be joined by a local Id, implement if necessary
		// only, as this might confuse developers and won't work properly in
		// distributed environments (for @CrossRepository() queries, if
		// the referenced repository is not yet loaded) without additional
		// logic to join against the composing GUIDs for the object (anyway).
		// return and(
		// 	toObject.repository._localId.equals(entityId.repository._localId),
		// 	toObject.actor._localId.equals(entityId.actor._localId),
		// 	toObject._actorRecordId.equals(entityId._actorRecordId)
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
