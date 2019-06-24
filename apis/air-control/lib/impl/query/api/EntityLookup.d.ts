import { DbEntity, QueryResultType } from '@airport/ground-control';
import { UpdateCacheType } from '../../../lingo/core/data/UpdateCacheType';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntityLookup } from '../../../lingo/query/api/EntityLookup';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { LookupProxy } from './Lookup';
export interface IEntityLookupInternal<Child, MappedChild, IESP extends IEntitySelectProperties> extends IEntityLookup<Child, MappedChild> {
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean): Promise<any>;
}
export declare abstract class EntityLookup<Child, MappedChild, IESP extends IEntitySelectProperties> extends LookupProxy implements IEntityLookupInternal<Child, MappedChild, IESP> {
    protected dbEntity: DbEntity;
    static cacheForUpdate: UpdateCacheType;
    static mapResults: boolean;
    protected mapResults: boolean;
    protected cacheForUpdate: UpdateCacheType;
    constructor(dbEntity: DbEntity);
    map(isMapped?: boolean): MappedChild;
    noCache(): Child;
    cache(cacheForUpdate?: UpdateCacheType): Child;
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean): Promise<any>;
}
