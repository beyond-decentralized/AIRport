import { QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { UpdateCacheType } from '../../..';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntitySearch } from '../../../lingo/query/api/EntitySearch';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { MappedEntityArray } from '../../../lingo/query/MappedEntityArray';
import { EntityLookup } from './EntityLookup';
export interface IEntitySearchInternal<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends IEntitySearch<Entity, EntityArray, IESP> {
    search(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType): Promise<IObservable<EntityArray>>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>, IESP> implements IEntitySearchInternal<Entity, EntityArray, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): IObservable<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): IObservable<EntityArray>;
    search(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType): Promise<IObservable<EntityArray>>;
    map(isMapped?: boolean): EntitySearch<Entity, MappedEntityArray<Entity>, IESP>;
    noCache(): EntitySearch<Entity, Entity[], IESP>;
    cache(cacheForUpdate?: UpdateCacheType): EntitySearch<Entity, Entity[], IESP>;
}
//# sourceMappingURL=EntitySearch.d.ts.map