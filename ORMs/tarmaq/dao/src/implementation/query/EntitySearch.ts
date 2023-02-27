import {
	IContext
} from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import {
	IEntityQueryContext,
	IEntitySelectProperties,
	RawEntityQuery
} from '@airport/tarmaq-query';
import {
	Observable
} from 'rxjs';
import { IEntitySearch } from '../../definition/query/IEntitySearch';
import { EntityLookup } from './EntityLookup';

export interface IEntitySearchInternal<Entity, EntityArray extends Array<Entity>,
	IESP extends IEntitySelectProperties>
	extends IEntitySearch<Entity, EntityArray, IESP> {

	search(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Observable<EntityArray>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, IESP>
	implements IEntitySearchInternal<Entity, EntityArray, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<EntityArray> {
		return this.search(rawGraphQuery, QueryResultType.ENTITY_TREE, context);
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<EntityArray> {
		return this.search(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
	}

	search(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Observable<EntityArray> {
		return this.entityLookup(rawEntityQuery, queryResultType, true, false,
			this.ensureContext(context) as IEntityQueryContext) as Observable<EntityArray>;
	}

	noCache(): EntitySearch<Entity, Entity[], IESP> {
		return this.setNoCache(EntitySearch);
	}

}
