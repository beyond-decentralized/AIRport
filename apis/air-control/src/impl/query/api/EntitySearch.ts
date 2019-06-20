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
import {IEntitySearch}           from '../../../lingo/query/api/EntitySearch'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {MappedEntityArray}       from '../../../lingo/query/MappedEntityArray'
import {EntityLookup}            from './EntityLookup'

/**
 * Created by Papa on 11/12/2016.
 */

export class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>>
	implements IEntitySearch<Entity, EntityArray, IESP> {

	constructor(
		protected dbEntity: DbEntity
	) {
		super()
	}

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<EntityArray> {
		return Observable.from(this.doSearch(rawGraphQuery, QueryResultType.ENTITY_TREE))
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<EntityArray> {
		return Observable.from(this.doSearch(rawTreeQuery, QueryResultType.ENTITY_TREE))
	}

	private async doSearch(
		rawQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<IObservable<EntityArray>> {
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const entityQuery             = entityUtils.getEntityQuery(rawQuery)
		const cacheForUpdate          = this.cleanNextCallState()

		return queryFacade.search(
			this.dbEntity, entityQuery, queryResultType, cacheForUpdate)

	}

}
