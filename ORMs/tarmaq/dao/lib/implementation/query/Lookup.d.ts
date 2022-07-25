import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { ILookup } from '../../definition/query/Lookup';
import { IAbstractQuery, IEntityQueryContext, IEntityUtils, IQueryContext, RawQuery } from '@airport/tarmaq-query';
import { IQueryFacade } from '../../definition/IDatabaseFacade';
import { IDao } from '../../definition/IDao';
export declare class LookupProxy implements ILookup {
    protected dao: IDao<any, any, any, any, any, any, any, any>;
    ensureContext<C extends IContext = IContext>(context?: C): C;
    constructor(dao: IDao<any, any, any, any, any, any, any, any>);
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
    }, queryResultType: QueryResultType, search: boolean, one: boolean, QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery, context: IQueryContext): Promise<any>;
}
export declare function doEnsureContext<C extends IContext = IContext>(context?: C): C;
//# sourceMappingURL=Lookup.d.ts.map