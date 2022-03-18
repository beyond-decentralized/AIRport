import { DbRelation } from '@airport/ground-control'
import { IQEntity, IQEntityInternal } from '../../../lingo/core/entity/Entity'
import { QRelation, QRepositoryEntityRelation } from './Relation'

/**
 * Created by Papa on 10/25/2016.
 */

export class QOneToManyRelation<Entity, IQ extends IQEntity<Entity>>
	extends QRelation<Entity, IQ> {

	constructor(
		dbRelation: DbRelation,
		parentQ: IQEntityInternal<any>,
	) {
		super(dbRelation, parentQ)
	}

}

export class QRepositoryEntityOneToManyRelation<Entity, IQ extends IQEntity<Entity>>
	extends QRepositoryEntityRelation<Entity, IQ> {

	constructor(
		dbRelation: DbRelation,
		parentQ: IQEntityInternal<any>,
	) {
		super(dbRelation, parentQ)
	}

}
