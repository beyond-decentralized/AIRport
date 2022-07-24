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
	AND,
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
	OR,
	QEntity,
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
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string,
		toObject: IQ // | IQRelation<IQ>
	): JSONLogicalOperation {
		if (!entityOrId) {
			throw new Error(`null entity/Id is passed into 'equals' method`)
		}
		const {
			qActor,
			qRepository
		} = this.entityUtils.ensureRepositoryAndActorJoin(toObject as any as IQEntityInternal)
		if (entityOrId instanceof QEntity) {
			const relationIdEntities = this.entityUtils
				.ensureRepositoryAndActorJoin(entityOrId as any as IQEntityInternal)

			return AND(
				qRepository.GUID.equals(relationIdEntities.qRepository.repository.GUID),
				qActor.GUID.equals(relationIdEntities.qActor.actor.GUID),
				(toObject as any)._actorRecordId.equals((entityOrId as any)._actorRecordId)
			)
		} else {
			let entityId = this.validateEntityId(entityOrId as AirEntityId)

			return AND(
				qRepository.GUID.equals(entityId.repository.GUID),
				qActor.GUID.equals(entityId.actor.GUID),
				(toObject as any)._actorRecordId.equals(entityId._actorRecordId)
			)
		}
	}

	in<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entitiesOrIds: (Entity | AirEntityId | string)[],
		toObject: IQ // | IQRelation<IQ>
	): JSONLogicalOperation {
		if (!entitiesOrIds || !entitiesOrIds.length) {
			throw new Error(`null entity/Id array is passed into 'in' method`)
		}
		let entityIds = entitiesOrIds.map(entityOrId =>
			this.validateEntityId(entityOrId as AirEntityId))

		const {
			qActor,
			qRepository
		} = this.entityUtils.ensureRepositoryAndActorJoin(toObject as any as IQEntityInternal)

		const equalOperations = []
		for (const entityId of entityIds) {
			equalOperations.push(AND(
				qRepository.GUID.equals(entityId.repository.GUID),
				qActor.GUID.equals(entityId.actor.GUID),
				(toObject as any)._actorRecordId.equals(entityId._actorRecordId)))
		}

		return OR(...equalOperations)
	}

	private validateEntityId(
		entityId: AirEntityId
	) {
		if (typeof entityId === 'string') {
			return this.airEntityUtils.parseEGUID(entityId)
		} else {
			if (!entityId.repository
				|| !entityId.repository.GUID
				|| typeof entityId.repository.GUID !== 'string'
				|| !entityId.actor
				|| !entityId.actor.GUID
				|| typeof entityId.actor.GUID !== 'number'
				|| !entityId._actorRecordId
				|| typeof entityId._actorRecordId !== 'number') {
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
			return entityId
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
