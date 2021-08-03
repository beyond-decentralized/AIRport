import { IContext } from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import {
	Observable,
	from
} from 'rxjs';
import { IEntityContext } from '../../../lingo/core/EntityContext';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntitySearchOne } from '../../../lingo/query/api/EntitySearchOne';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
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
	extends EntityLookup<EntitySearchOne<Entity, IESP>,
	EntitySearchOne<Entity, IESP>, IESP>
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
			true, true, this.ensureContext(context) as IEntityContext);
	}

	map(
		isMapped?: boolean
	): EntitySearchOne<Entity, IESP> {
		return this.setMap(EntitySearchOne, isMapped);
	}

}
