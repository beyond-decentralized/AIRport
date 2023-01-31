import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntityQueryContext, IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query';
import {
	Observable,
	from
} from 'rxjs';
import { IEntitySearchOne } from '../../definition/query/IEntitySearchOne';
import { EntityLookup } from './EntityLookup';

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
	extends EntityLookup<EntitySearchOne<Entity, IESP>, IESP>
	implements IEntitySearchOneInternal<Entity, IESP> {

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<Entity> {
		return from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context));
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<Entity> {
		return from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context));
	}

	// TODO: return Observable from deep within the framework
	// and detect changes to the underlying data
	async searchOne(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		context?: IContext
	): Promise<Entity> {
		return await this.entityLookup(rawEntityQuery, queryResultType,
			true, true, this.ensureContext(context) as IEntityQueryContext);
	}

}
