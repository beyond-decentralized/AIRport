import { InternalFragments, JsonSheetQuery, QueryResultType } from '@airport/ground-control';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export declare class SheetSQLQuery extends NonEntitySQLQuery<JsonSheetQuery> {
    constructor(jsonQuery: JsonSheetQuery, dialect: SQLDialect, context: IFuelHydrantContext);
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[], internalFragments: InternalFragments): any;
}
//# sourceMappingURL=SheetSQLQuery.d.ts.map