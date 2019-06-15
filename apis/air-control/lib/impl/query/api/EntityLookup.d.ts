import { QueryResultType } from '@airport/ground-control';
import { IEntityLookup, UpdateCacheType } from '../../../lingo/query/api/EntityLookup';
export declare abstract class EntityLookup<Child, MappedChild> implements IEntityLookup<Child, MappedChild> {
    isMapped: boolean;
    private saveNextCallInUpdateCache;
    readonly mapped: MappedChild;
    getQueryResultType(baseQueryResultType: QueryResultType): QueryResultType;
    andCacheForUpdate(cacheForUpdateState?: UpdateCacheType): Child;
    protected cleanNextCallState(): UpdateCacheType;
}
