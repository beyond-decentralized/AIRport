import { IContext } from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import { IEntityContext } from '../../../lingo/core/data/EntityContext';
import { UpdateCacheType } from '../../../lingo/core/data/UpdateCacheType';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawQuery } from '../../../lingo/query/facade/Query';
import { IQueryContext } from '../../../lingo/query/QueryContext';
export declare class LookupProxy implements ILookup {
    ensureContext<C extends IContext = IContext>(context?: C): C;
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, context: IEntityContext, cacheForUpdate?: UpdateCacheType, mapResults?: boolean): Promise<any>;
}
export declare class Lookup implements ILookup {
    ensureContext<C extends IContext = IContext>(context?: C): C;
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, context: IQueryContext<any>, cacheForUpdate?: UpdateCacheType, mapResults?: boolean): Promise<any>;
    private getQueryResultType;
}
export declare function doEnsureContext<C extends IContext = IContext>(context?: C): C;
//# sourceMappingURL=Lookup.d.ts.map