import { IContext } from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { UpdateCacheType } from '../../../lingo/core/data/UpdateCacheType';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntitySearchOne } from '../../../lingo/query/api/EntitySearchOne';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { EntityLookup } from './EntityLookup';
export interface IEntitySearchOneInternal<Entity, IESP extends IEntitySelectProperties> extends IEntitySearchOne<Entity, IESP> {
    searchOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, ctx?: IContext): Promise<IObservable<Entity>>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearchOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearchOne<Entity, IESP>, EntitySearchOne<Entity, IESP>, IESP> implements IEntitySearchOneInternal<Entity, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, ctx?: IContext): IObservable<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, ctx?: IContext): IObservable<Entity>;
    searchOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, ctx?: IContext): Promise<IObservable<Entity>>;
    map(isMapped?: boolean): EntitySearchOne<Entity, IESP>;
    noCache(): EntitySearchOne<Entity, IESP>;
    cache(cacheForUpdate?: UpdateCacheType): EntitySearchOne<Entity, IESP>;
}
//# sourceMappingURL=EntitySearchOne.d.ts.map