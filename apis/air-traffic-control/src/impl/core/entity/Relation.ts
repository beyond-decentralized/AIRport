import { RepositoryEntityId } from '@airport/aviation-communication'
import { IOC } from '@airport/direction-indicator'
import {
	DbRelation,
	IRepositoryEntity,
	JoinType
} from '@airport/ground-control'
import { IQEntityInternal, IQRepositoryEntity } from '../../../lingo/core/entity/Entity'
import { IQRepositoryEntityRelation } from '../../../lingo/core/entity/Relation'
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation'
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils'
import { QUERY_UTILS } from '../../../tokens'
import { extend } from '../../utils/qApplicationBuilderUtils'
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
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager
) {
	this.dbRelation = dbRelation
	this.parentQ = parentQ
	this.applicationUtils = applicationUtils
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


export function QRepositoryEntityRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager,
) {
	(<any>QRepositoryEntityRelation).base.constructor.call(
		this, dbRelation, parentQ, applicationUtils, relationManager)
}

export const qRepositoryEntityRelationMethods = {
	equals: function <Entity extends IRepositoryEntity, IQ extends IQEntityInternal>(
		entity: Entity | IQRepositoryEntity |
			IQRepositoryEntityRelation<Entity, IQ> | RepositoryEntityId | string
	): JSONLogicalOperation {
		return IOC.getSync(QUERY_UTILS).equals(entity, this)
	}
}
extend(QRelation, QRepositoryEntityRelation, qRepositoryEntityRelationMethods)
