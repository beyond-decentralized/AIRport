import {DI}                      from '@airport/di'
import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {
	IObservable,
	Observable
}                                from '@airport/observe'
import {ENTITY_UTILS}            from '../../../diTokens'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IDatabaseFacade}         from '../../../lingo/core/repository/DatabaseFacade'
import {IEntitySearchOne}        from '../../../lingo/query/api/EntitySearchOne'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {EntityQuery}             from '../facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearchOne<Entity, IESP>, EntitySearchOne<Entity, IESP>>
	implements IEntitySearchOne<Entity, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade
	) {
		super()
	}

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<Entity> {
		return Observable.from(this.doSearch(rawGraphQuery, QueryResultType.ENTITY_GRAPH))
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<Entity> {
		return Observable.from(this.doSearch(rawTreeQuery, QueryResultType.ENTITY_TREE))
	}

	private async doSearch(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<IObservable<Entity>> {
		let entityQuery: EntityQuery<IESP> = (await DI.get(ENTITY_UTILS)).getEntityQuery(rawTreeQuery)
		const cacheForUpdate               = this.cleanNextCallState()

		return this.dbFacade.entity.searchOne(
			this.dbEntity, entityQuery, queryResultType, cacheForUpdate)

	}

}
