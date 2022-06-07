import { DbRelation } from '@airport/ground-control'
import { IQEntityInternal } from '../../../lingo/core/entity/Entity'
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils'
import { extend } from '../../utils/qApplicationBuilderUtils'
import { QRelation, QAirEntityRelation } from './Relation'
import { IRelationManager } from './RelationManager'

/**
 * Created by Papa on 10/25/2016.
 */

/*
 * Cannot use 'class' syntax because it brakes dynamic creation of subclasses.
 * With 'class' browser reports:
 *   Class constructor QRelation cannot be invoked without 'new'
 * When calling:
 *   Q...Relation.base.constructor.call(this, relation, qEntity)
 */
export function QOneToManyRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	repationManager: IRelationManager,
) {
	(<any>QOneToManyRelation).base.constructor.call(this,
		dbRelation, parentQ, applicationUtils, repationManager)
}
const qOneToManyRelationMethods = {
	/*
	yourMethodName: function() {},
	*/
}
extend(QRelation, QOneToManyRelation, qOneToManyRelationMethods)

export function QAirEntityOneToManyRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils,
	repationManager: IRelationManager,
) {
	(<any>QAirEntityOneToManyRelation).base.constructor.call(this,
		dbRelation, parentQ, applicationUtils, repationManager)
}
const qAirEntityOneToManyRelationMethods = {
	/*
	yourMethodName: function() {},
	*/
}
extend(QAirEntityRelation, QAirEntityOneToManyRelation,
	qAirEntityOneToManyRelationMethods)
