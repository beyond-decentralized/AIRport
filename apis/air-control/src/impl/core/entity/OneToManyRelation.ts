import {DbRelation}       from '@airport/ground-control'
import {IQEntityInternal} from '../../../lingo/core/entity/Entity'
import {extend}           from '../../utils/qSchemaBuilderUtils'
import {QRelation}        from './Relation'

/**
 * Created by Papa on 10/25/2016.
 */

export function QOneToManyRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
) {
	(<any>QOneToManyRelation).base.constructor.call(this, dbRelation, parentQ)
}

extend(QRelation, QOneToManyRelation, {})
