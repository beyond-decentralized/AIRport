import {
	DbRelation,
	JoinType
} from '@airport/ground-control'
import { IQEntityInternal } from '../../../lingo/core/entity/Entity'
import { IQRepositoryEntityRelation } from '../../../lingo/core/entity/Relation'
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation'
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils'
import { extend } from '../../utils/qApplicationBuilderUtils'
import { and } from '../operation/LogicalOperation'
import { IRelationManager } from './RelationManager'

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
	appliationUtils: IApplicationUtils,
	relationManager: IRelationManager
) {
	this.dbRelation = dbRelation
	this.parentQ = parentQ
	this.appliationUtils = appliationUtils
	this.relationManager = relationManager
}

QRelation.prototype.innerJoin = function <IQ extends IQEntityInternal>(): IQ {
	return this.getNewQEntity(JoinType.INNER_JOIN)
}

QRelation.prototype.leftJoin = function <IQ extends IQEntityInternal>(): IQ {
	return this.getNewQEntity(JoinType.LEFT_JOIN)
}

QRelation.prototype.getNewQEntity = function <IQ extends IQEntityInternal>(joinType: JoinType): IQ {
	const dbEntity = this.dbRelation.relationEntity

	const qEntityConstructor = this.applicationUtils.getQEntityConstructor(
		this.dbRelation.relationEntity)

	let newQEntity: IQEntityInternal = new qEntityConstructor(
		dbEntity,
		this.appliationUtils,
		this.relationManager,
		this.relationManager.getNextChildJoinPosition(this.parentQ.__driver__),
		this.dbRelation,
		joinType,
		this.appliationUtils,
		this.relationManager
	)
	newQEntity.__driver__.parentJoinEntity = this.parentQ
	return <IQ>newQEntity
}


export function QRepositoryEntityRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
) {
	(<any>QRepositoryEntityRelation).base.constructor.call(this, dbRelation, parentQ)
}

QRepositoryEntityRelation.prototype.equals = function <Entity, IQ extends IQEntityInternal>(
	entity: Entity | IQRepositoryEntityRelation<Entity, IQ>
): JSONLogicalOperation {
	let thisRelation = this as any
	let other = entity as any
	return and(
		thisRelation.actor.id.equals(other.actor.id),
		thisRelation.actorRecordId.equals(other.actorRecordId),
		thisRelation.id.equals(other.repository.id)
	)
}
extend(QRelation, QRepositoryEntityRelation, {})
