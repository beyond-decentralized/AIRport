import { extend } from '@airport/direction-indicator'
import { DbRelation, IApplicationUtils } from '@airport/ground-control'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { QRelation, QAirEntityRelation } from './QRelation'

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
	repationManager: IQueryRelationManager,
	queryUtils: IQueryUtils
) {
	(<any>QOneToManyRelation).base.constructor.call(this,
		dbRelation, parentQ, applicationUtils, repationManager, queryUtils)
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
	repationManager: IQueryRelationManager,
	queryUtils: IQueryUtils
) {
	(<any>QAirEntityOneToManyRelation).base.constructor.call(this,
		dbRelation, parentQ, applicationUtils, repationManager, queryUtils)
}
const qAirEntityOneToManyRelationMethods = {
	/*
	yourMethodName: function() {},
	*/
}
extend(QAirEntityRelation, QAirEntityOneToManyRelation,
	qAirEntityOneToManyRelationMethods)
