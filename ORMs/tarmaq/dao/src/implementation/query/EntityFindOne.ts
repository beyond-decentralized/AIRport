import { IContext } from '@airport/direction-indicator'
import { QueryResultType } from '@airport/ground-control'
import {
	IEntityQueryContext,
	IEntitySelectProperties,
	RawEntityQuery
} from '@airport/tarmaq-query'
import { IEntityFindOne } from '../../definition/query/IEntityFindOne'
import { EntityLookup } from './EntityLookup'

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
	extends EntityLookup<EntityFindOne<Entity, IESP>, IESP>
	implements IEntityFindOneInternal<Entity, IESP> {

	async graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Promise<Entity> {
		return await this.findOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context)
	}

	async tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Promise<Entity> {
		return await this.findOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context)
	}

	// TODO: return Observable from deep within the framework
	// and detect changes to the underlying data
	async findOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<Entity> {
		return await this.entityLookup(rawEntityQuery, queryResultType,
			false, true, this.ensureContext(context) as IEntityQueryContext)
	}

	noCache(): EntityFindOne<Entity, IESP> {
		return this.setNoCache(EntityFindOne)
	}

}
