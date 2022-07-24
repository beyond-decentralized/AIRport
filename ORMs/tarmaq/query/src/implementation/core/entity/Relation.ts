import { extend } from '@airport/direction-indicator'
import {
	DbRelation,
	JoinType,
} from '@airport/ground-control'
import { IQEntityInternal } from '../../../definition/core/entity/Entity'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { JSONLogicalOperation } from '../../../definition/core/operation/LogicalOperation'
import { IApplicationUtils } from '../../../definition/utils/IApplicationUtils'
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

QRelation.prototype.innerJoin = function <IQ extends IQEntityInternal>(): IQ {
	const newQEntity = this.getNewQEntity(JoinType.INNER_JOIN)
	this.parentQ.__driver__.childQEntities.push(newQEntity)

	return newQEntity
}

QRelation.prototype.leftJoin = function <IQ extends IQEntityInternal>(): IQ {
	const newQEntity = this.getNewQEntity(JoinType.LEFT_JOIN)
	this.parentQ.__driver__.childQEntities.push(newQEntity)

	return newQEntity
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
	// equals: function <Entity extends IAirEntity, IQ extends IQEntityInternal>(
	// 	entity: Entity | IQAirEntity |
	// 		IQAirEntityRelation<Entity, IQ> | AirEntityId | string
	// ): JSONLogicalOperation {
	// 	return IOC.getSync(QUERY_UTILS).equals(entity, this)
	// }

	isNull(): JSONLogicalOperation {
		return OR(
			this.actor._localId.isNull(),
			this.repository._localId.isNull(),
			this._actorRecordId.isNull(),
		)
	},
	isNotNull(): JSONLogicalOperation {
		return AND(
			this.actor._localId.isNotNull(),
			this.repository._localId.isNotNull(),
			this._actorRecordId.isNotNull(),
		)
	}
}
extend(QRelation, QAirEntityRelation, qAirEntityRelationMethods)
