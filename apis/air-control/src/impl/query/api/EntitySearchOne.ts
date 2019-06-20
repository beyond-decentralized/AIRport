import {DI}                      from '@airport/di'
import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {
	IObservable,
	Observable
}                                from '@airport/observe'
import {
	ENTITY_MANAGER,
	ENTITY_UTILS,
	QUERY_FACADE
} from '../../../diTokens'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntitySearchOne}        from '../../../lingo/query/api/EntitySearchOne'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearchOne<Entity, IESP>, EntitySearchOne<Entity, IESP>>
	implements IEntitySearchOne<Entity, IESP> {

	constructor(
		protected dbEntity: DbEntity
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
		rawQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<IObservable<Entity>> {
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const entityQuery             = entityUtils.getEntityQuery(rawQuery)
		const cacheForUpdate          = this.cleanNextCallState()

		return queryFacade.searchOne(
			this.dbEntity, entityQuery, queryResultType, cacheForUpdate)

	}

}
