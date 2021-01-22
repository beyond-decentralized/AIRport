import {IContext}                from '@airport/di'
import {QueryResultType}         from '@airport/ground-control'
import {
	IObservable,
	from
}                                from '@airport/observe'
import {IEntityContext}          from '../../../lingo/core/data/EntityContext'
import {UpdateCacheType}         from '../../../lingo/core/data/UpdateCacheType'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntitySearchOne}        from '../../../lingo/query/api/EntitySearchOne'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

export interface IEntitySearchOneInternal<Entity, IESP extends IEntitySelectProperties>
	extends IEntitySearchOne<Entity, IESP> {

	searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<Entity>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearchOne<Entity, IESP>,
		EntitySearchOne<Entity, IESP>, IESP>
	implements IEntitySearchOneInternal<Entity, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): IObservable<Entity> {
		return from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context))
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): IObservable<Entity> {
		return from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context))
	}

	searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<Entity> {
		return this.entityLookup(rawEntityQuery, queryResultType,
			true, true, this.ensureContext(context) as IEntityContext)
	}

	map(
		isMapped?: boolean
	): EntitySearchOne<Entity, IESP> {
		return this.setMap(EntitySearchOne, isMapped)
	}

	noCache(): EntitySearchOne<Entity, IESP> {
		return this.setNoCache(EntitySearchOne)
	}

	cache(
		cacheForUpdate?: UpdateCacheType
	): EntitySearchOne<Entity, IESP> {
		return this.setCache(EntitySearchOne, cacheForUpdate)
	}

}
