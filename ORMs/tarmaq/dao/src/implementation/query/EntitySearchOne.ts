import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntityQueryContext, IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import {
	Observable
} from 'rxjs';
import { IEntitySearchOne } from '../../definition/query/IEntitySearchOne';
import { EntityLookup } from './EntityLookup';

export interface IEntitySearchOneInternal<Entity, IESP extends IEntitySelectProperties>
	extends IEntitySearchOne<Entity, IESP> {

	searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Observable<Entity>

}

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearchOne<Entity, IESP>, IESP>
	implements IEntitySearchOneInternal<Entity, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<Entity> {
		return this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<Entity> {
		return this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
	}

	searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Observable<Entity> {
		return this.entityLookup(rawEntityQuery, queryResultType, true, true,
			this.ensureContext(context) as IEntityQueryContext) as Observable<Entity>;
	}

}
