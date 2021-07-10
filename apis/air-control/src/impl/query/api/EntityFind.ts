import {IContext}                from '@airport/di'
import {QueryResultType}         from '@airport/ground-control'
import {IEntityContext}          from '../../../lingo/core/EntityContext'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntityFind}             from '../../../lingo/query/api/EntityFind'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {MappedEntityArray}       from '../../../lingo/query/MappedEntityArray'
import {EntityLookup}            from './EntityLookup'

export interface IEntityFindInternal<Entity, EntityArray extends Array<Entity>,
	IESP extends IEntitySelectProperties>
	extends IEntityFind<Entity, EntityArray, IESP> {

	find(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<EntityArray>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>,
		EntityFind<Entity, MappedEntityArray<Entity>, IESP>, IESP>
	implements IEntityFindInternal<Entity, EntityArray, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Promise<EntityArray> {
		return this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context)
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Promise<EntityArray> {
		return this.find(rawTreeQuery, QueryResultType.ENTITY_TREE, context)
	}

	find(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<EntityArray> {
		return this.entityLookup(rawEntityQuery, queryResultType,
			false, false,
			this.ensureContext(context) as IEntityContext)
	}

	map(
		isMapped?: boolean
	): EntityFind<Entity, MappedEntityArray<Entity>, IESP> {
		return this.setMap(EntityFind, isMapped)
	}

	noCache(): EntityFind<Entity, Entity[], IESP> {
		return this.setNoCache(EntityFind)
	}

}
