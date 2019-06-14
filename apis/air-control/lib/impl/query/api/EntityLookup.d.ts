import { QueryResultType } from "@airport/ground-control";
import { IUtils } from '../../../lingo/utils/Utils';
import { IEntityLookup, UpdateCacheType } from "../../../lingo/query/api/EntityLookup";
export declare abstract class EntityLookup<Child, MappedChild> implements IEntityLookup<Child, MappedChild> {
    isMapped: boolean;
    private saveNextCallInUpdateCache;
    protected DI: import("@airport/di").IContainer;
    protected UTILS: import("@airport/di").DiToken<IUtils>;
    readonly mapped: MappedChild;
    getQueryResultType(baseQueryResultType: QueryResultType): QueryResultType;
    andCacheForUpdate(cacheForUpdateState?: UpdateCacheType): Child;
    protected cleanNextCallState(): UpdateCacheType;
}
