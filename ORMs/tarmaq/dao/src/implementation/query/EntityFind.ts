import { IContext } from '@airport/direction-indicator'
import { QueryResultType } from '@airport/ground-control'
import {
	IEntityQueryContext,
	IEntitySelectProperties,
	RawOneTimeEntityQuery
} from '@airport/tarmaq-query'
import { IEntityFind } from '../../definition/query/IEntityFind'
import { EntityLookup } from './EntityLookup'

export interface IEntityFindInternal<Entity, EntityArray extends Array<Entity>,
	IESP extends IEntitySelectProperties>
	extends IEntityFind<Entity, EntityArray, IESP> {

	find(
		rawEntityQuery: RawOneTimeEntityQuery<IESP>
			| { (...args: any[]): RawOneTimeEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<EntityArray>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>, IESP>
	implements IEntityFindInternal<Entity, EntityArray, IESP> {

	async graph(
		rawGraphQuery: RawOneTimeEntityQuery<IESP>
			| { (...args: any[]): RawOneTimeEntityQuery<IESP> },
		context?: IContext
	): Promise<EntityArray> {
		return await this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context)
	}

	async tree(
		rawTreeQuery: RawOneTimeEntityQuery<IESP>
			| { (...args: any[]): RawOneTimeEntityQuery<IESP> },
		context?: IContext
	): Promise<EntityArray> {
		return await this.find(rawTreeQuery, QueryResultType.ENTITY_TREE, context)
	}

	async find(
		rawEntityQuery: RawOneTimeEntityQuery<IESP>
			| { (...args: any[]): RawOneTimeEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<EntityArray> {
		return await this.entityFind(rawEntityQuery, queryResultType,
			false, this.ensureContext(context) as IEntityQueryContext)
	}

	noCache(): EntityFind<Entity, Entity[], IESP> {
		return this.setNoCache(EntityFind)
	}

}
