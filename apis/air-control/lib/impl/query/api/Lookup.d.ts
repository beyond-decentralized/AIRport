import { DbEntity, QueryResultType } from '@airport/ground-control';
import { UpdateCacheType } from '../../../lingo/core/data/UpdateCacheType';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawQuery } from '../../../lingo/query/facade/Query';
export declare class LookupProxy implements ILookup {
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, dbEntity?: DbEntity, cacheForUpdate?: UpdateCacheType, mapResults?: boolean): Promise<any>;
}
export declare class Lookup implements ILookup {
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, dbEntity?: DbEntity, cacheForUpdate?: UpdateCacheType, mapResults?: boolean): Promise<any>;
    private getQueryResultType;
}
