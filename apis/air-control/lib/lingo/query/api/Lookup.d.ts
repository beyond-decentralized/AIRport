import { QueryResultType } from '@airport/ground-control';
import { IEntityOperationContext } from '../../..';
import { UpdateCacheType } from '../../core/data/UpdateCacheType';
import { IAbstractQuery } from '../facade/AbstractQuery';
import { RawNonEntityQuery } from '../facade/NonEntityQuery';
import { RawQuery } from '../facade/Query';
export interface ILookup {
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => IAbstractQuery, ctx: IEntityOperationContext, cacheForUpdate?: UpdateCacheType, mapResults?: boolean): Promise<any>;
}
//# sourceMappingURL=Lookup.d.ts.map