import { QueryResultType } from '@airport/ground-control';
import { UpdateCacheType } from '../../..';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntityFindOne } from '../../../lingo/query/api/EntityFindOne';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { EntityLookup } from './EntityLookup';
export interface IEntityFindOneInternal<Entity, IESP extends IEntitySelectProperties> extends IEntityFindOne<Entity, IESP> {
    findOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType): Promise<Entity>;
}
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntityFindOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntityFindOne<Entity, IESP>, EntityFindOne<Entity, IESP>, IESP> implements IEntityFindOneInternal<Entity, IESP> {
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<Entity>;
    findOne(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType): Promise<Entity>;
    map(isMapped?: boolean): EntityFindOne<Entity, IESP>;
    noCache(): EntityFindOne<Entity, IESP>;
    cache(cacheForUpdate?: UpdateCacheType): EntityFindOne<Entity, IESP>;
}
//# sourceMappingURL=EntityFindOne.d.ts.map