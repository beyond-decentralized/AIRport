import {IContext}                from '@airport/di'
import {QueryResultType}         from '@airport/ground-control'
import {IEntityContext}          from '../../../lingo/core/data/EntityContext'
import {UpdateCacheType}         from '../../../lingo/core/data/UpdateCacheType'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntityFindOne}          from '../../../lingo/query/api/EntityFindOne'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

export interface IEntityFindOneInternal<Entity, IESP extends IEntitySelectProperties>
	extends IEntityFindOne<Entity, IESP> {

	findOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context: IContext
	): Promise<Entity>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFindOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFindOne<Entity, IESP>,
		EntityFindOne<Entity, IESP>, IESP>
	implements IEntityFindOneInternal<Entity, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Promise<Entity> {
		return this.findOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context)
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Promise<Entity> {
		return this.findOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context)
	}

	findOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<Entity> {
		return this.entityLookup(rawEntityQuery, queryResultType,
			false, true, this.ensureContext(context) as IEntityContext)
	}

	map(
		isMapped?: boolean
	): EntityFindOne<Entity, IESP> {
		return this.setMap(EntityFindOne, isMapped)
	}

	noCache(): EntityFindOne<Entity, IESP> {
		return this.setNoCache(EntityFindOne)
	}

	cache(
		cacheForUpdate?: UpdateCacheType
	): EntityFindOne<Entity, IESP> {
		return this.setCache(EntityFindOne, cacheForUpdate)
	}

}
