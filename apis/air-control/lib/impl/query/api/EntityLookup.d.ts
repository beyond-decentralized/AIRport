import { DbEntity, QueryResultType } from '@airport/ground-control';
import { IEntityContext } from '../../../lingo/core/data/EntityContext';
import { UpdateCacheType } from '../../../lingo/core/data/UpdateCacheType';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IEntityLookup } from '../../../lingo/query/api/EntityLookup';
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { LookupProxy } from './Lookup';
export interface IEntityLookupInternal<Child, MappedChild, IESP extends IEntitySelectProperties> extends IEntityLookup<Child, MappedChild> {
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, context: IEntityContext): Promise<any>;
    setMap(MappedChildClass: new (dbEntity: DbEntity, cacheForUpdate: UpdateCacheType, mapResults: boolean) => MappedChild, isMapped: boolean): MappedChild;
    setNoCache(ChildClass: new (dbEntity: DbEntity, cacheForUpdate: UpdateCacheType, mapResults: boolean) => Child): Child;
    setCache(ChildClass: new (dbEntity: DbEntity, cacheForUpdate: UpdateCacheType, mapResults: boolean) => Child, cacheForUpdate: UpdateCacheType): Child;
}
export declare abstract class EntityLookup<Child, MappedChild, IESP extends IEntitySelectProperties> extends LookupProxy implements IEntityLookupInternal<Child, MappedChild, IESP> {
    protected dbEntity: DbEntity;
    protected cacheForUpdate: UpdateCacheType;
    protected mapResults: boolean;
    static cacheForUpdate: UpdateCacheType;
    static mapResults: boolean;
    constructor(dbEntity: DbEntity, cacheForUpdate?: UpdateCacheType, mapResults?: boolean);
    abstract map(isMapped?: boolean): MappedChild;
    abstract noCache(): Child;
    abstract cache(cacheForUpdate?: UpdateCacheType): Child;
    setMap(MappedChildClass: new (dbEntity: DbEntity, cacheForUpdate: UpdateCacheType, mapResults: boolean) => MappedChild, isMapped?: boolean): MappedChild;
    setNoCache(ChildClass: new (dbEntity: DbEntity, cacheForUpdate: UpdateCacheType, mapResults: boolean) => Child): Child;
    setCache(ChildClass: new (dbEntity: DbEntity, cacheForUpdate: UpdateCacheType, mapResults: boolean) => Child, cacheForUpdate?: UpdateCacheType): Child;
    entityLookup(rawEntityQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, context: IEntityContext): Promise<any>;
}
//# sourceMappingURL=EntityLookup.d.ts.map