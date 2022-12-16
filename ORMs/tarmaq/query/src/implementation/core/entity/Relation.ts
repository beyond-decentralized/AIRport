import { AirEntityId } from '@airport/aviation-communication'
import { extend, IOC } from '@airport/direction-indicator'
import {
	DbRelation,
	IAirEntity,
	JoinType,
	JSONBaseOperation,
} from '@airport/ground-control'
import { IQAirEntity, IQEntityInternal } from '../../../definition/core/entity/Entity'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { JSONLogicalOperation } from '../../../definition/core/operation/LogicalOperation'
import { IApplicationUtils } from '../../../definition/utils/IApplicationUtils'
import { QUERY_UTILS, Q_ENTITY_UTILS } from '../../../tokens'
import { AND, OR } from '../operation/LogicalOperation'

/**
 * Created by Papa on 4/26/2016.
 */

/*
 * Cannot use 'class' syntax because it brakes dynamic creation of subclasses.
 * With 'class' browser reports:
 *   Class constructor QRelation cannot be invoked without 'new'
 * When calling:
 *   Q...Relation.base.constructor.call(this, relation, qEntity)
 */
export function QRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager
) {
	this.dbRelation = dbRelation
	this.parentQ = parentQ
	this.applicationUtils = applicationUtils
	this.relationManager = relationManager
}

QRelation.prototype.INNER_JOIN = function <IQ extends IQEntityInternal>(): IQ {
	const newQEntity = this.getNewQEntity(JoinType.INNER_JOIN)
	this.parentQ.__driver__.childQEntities.push(newQEntity)

	return newQEntity
}

QRelation.prototype.LEFT_JOIN = function <IQ extends IQEntityInternal>(): IQ {
	const newQEntity = this.getNewQEntity(JoinType.LEFT_JOIN)
	this.parentQ.__driver__.childQEntities.push(newQEntity)

	return newQEntity
}

QRelation.prototype.IS_NULL = function (): JSONBaseOperation {
	return this.nullOrNot(true)
}

QRelation.prototype.IS_NOT_NULL = function (): JSONBaseOperation {
	return this.nullOrNot(false)
}

QRelation.prototype.nullOrNot = function (
	isNull: boolean
): JSONBaseOperation {
	const dbRelation: DbRelation = this.dbRelation
	const qEntityUtils = IOC.getSync(Q_ENTITY_UTILS)

	const operations = []
	for (const propertyColumn of dbRelation.property.propertyColumns) {
		const columnField = qEntityUtils.getColumnQField(
			dbRelation.entity,
			dbRelation.property,
			this.parentQ,
			propertyColumn.column)
		operations.push(isNull
			? columnField.IS_NULL()
			: columnField.IS_NOT_NULL())
	}

	if (operations.length > 1) {
		if (isNull) {
			return OR(...operations)
		} else {
			return AND(...operations)
		}
	}

	return operations[0]
}

QRelation.prototype.getNewQEntity = function <IQ extends IQEntityInternal>(joinType: JoinType): IQ {
	const dbEntity = this.dbRelation.relationEntity

	const qEntityConstructor = this.applicationUtils.getQEntityConstructor(
		this.dbRelation.relationEntity)

	let newQEntity: IQEntityInternal = new qEntityConstructor(
		dbEntity,
		this.applicationUtils,
		this.relationManager,
		this.relationManager.getNextChildJoinPosition(this.parentQ.__driver__),
		this.dbRelation,
		joinType,
		this.applicationUtils,
		this.relationManager
	)
	newQEntity.__driver__.parentJoinEntity = this.parentQ
	return <IQ>newQEntity
}



export function QAirEntityRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager,
) {
	(<any>QAirEntityRelation).base.constructor.call(
		this, dbRelation, parentQ, applicationUtils, relationManager)
}

export const qAirEntityRelationMethods = {
}
extend(QRelation, QAirEntityRelation, qAirEntityRelationMethods)



export function QManyToOneAirEntityRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager,
) {
	(<any>QAirEntityRelation).base.constructor.call(
		this, dbRelation, parentQ, applicationUtils, relationManager)
}

export const qManyToOneAirEntityRelationMethods = {
	equals: function <Entity extends IAirEntity, IQ extends IQEntityInternal>(
		entity: Entity | IQAirEntity |
			// IQAirEntityRelation<Entity, IQ> |
			AirEntityId | string
	): JSONLogicalOperation {
		return IOC.getSync(QUERY_UTILS).equals(entity, this)
	},
	IN: function <Entity extends IAirEntity, IQ extends IQEntityInternal>(
		entitiesOrIds: (Entity |
			// IQAirEntity |
			// IQAirEntityRelation<Entity, IQ> |
			AirEntityId | string)[]
	): JSONLogicalOperation {
		return IOC.getSync(QUERY_UTILS).in(entitiesOrIds, this)
	}
}
extend(QAirEntityRelation, QManyToOneAirEntityRelation, qManyToOneAirEntityRelationMethods)



export function QManyToOneInternalRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager,
) {
	(<any>QAirEntityRelation).base.constructor.call(
		this, dbRelation, parentQ, applicationUtils, relationManager)
}

export const qManyToOneInternalRelationMethods = {
	equals: function
		// <Entity extends IAirEntity, IQ extends IQEntityInternal>
		(
			entityId: string | number
		): JSONBaseOperation {
		return IOC.getSync(QUERY_UTILS).equalsInternal(entityId, this)
	},
	IN: function
		// <Entity extends IAirEntity, IQ extends IQEntityInternal>
		(
			entityIds: (string | number)[]
		): JSONBaseOperation {
		return IOC.getSync(QUERY_UTILS).inInternal(entityIds, this)
	}
}
extend(QRelation, QManyToOneInternalRelation, qManyToOneInternalRelationMethods)
