import { DbRelation } from '@airport/ground-control'
import { IQEntity, IQEntityInternal } from '../../../lingo/core/entity/Entity'
import { QRelation, QRepositoryEntityRelation } from './Relation'

/**
 * Created by Papa on 10/25/2016.
 */

export class QOneToManyRelation<IQ extends IQEntity>
	extends QRelation<IQ> {

	constructor(
		dbRelation: DbRelation,
		parentQ: IQEntityInternal,
	) {
		super(dbRelation, parentQ)
	}

}

export class QRepositoryEntityOneToManyRelation<Entity, IQ extends IQEntity>
	extends QRepositoryEntityRelation<Entity, IQ> {

	constructor(
		dbRelation: DbRelation,
		parentQ: IQEntityInternal,
	) {
		super(dbRelation, parentQ)
	}

}
