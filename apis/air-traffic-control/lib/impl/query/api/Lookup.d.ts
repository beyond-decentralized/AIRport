import { IContext } from '@airport/direction-indicator';
import { IEntityStateManager, QueryResultType } from '@airport/ground-control';
import { IAirportDatabase } from '../../../lingo/AirportDatabase';
import { IEntityQueryContext } from '../../../lingo/core/EntityContext';
import { IQueryFacade } from '../../../lingo/core/repository/DatabaseFacade';
import { IUpdateCacheManager } from '../../../lingo/core/UpdateCacheManager';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawQuery } from '../../../lingo/query/facade/Query';
import { IQueryContext } from '../../../lingo/query/QueryContext';
import { IEntityUtils } from '../../../lingo/utils/EntityUtils';
export interface IDaoStub {
    airportDatabase: IAirportDatabase;
    entityStateManager: IEntityStateManager;
    lookup: ILookup;
    updateCacheManager: IUpdateCacheManager;
}
export declare class LookupProxy implements ILookup {
    protected dao: IDaoStub;
    ensureContext<C extends IContext = IContext>(context?: C): C;
    constructor(dao: IDaoStub);
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, context: IEntityQueryContext, mapResults?: boolean): Promise<any>;
}
export declare class Lookup implements ILookup {
    entityUtils: IEntityUtils;
    queryFacade: IQueryFacade;
    ensureContext<C extends IContext = IContext>(context?: C): C;
    lookup(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, context: IQueryContext, mapResults?: boolean): Promise<any>;
    private getQueryResultType;
}
export declare function doEnsureContext<C extends IContext = IContext>(context?: C): C;
//# sourceMappingURL=Lookup.d.ts.map