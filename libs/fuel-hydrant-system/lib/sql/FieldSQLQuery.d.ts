import { InternalFragments, JsonFieldQuery, QueryResultType } from '@airport/ground-control';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export declare class FieldSQLQuery extends NonEntitySQLQuery<JsonFieldQuery> {
    constructor(jsonQuery: JsonFieldQuery, dialect: SQLDialect, context: IFuelHydrantContext);
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
//# sourceMappingURL=FieldSQLQuery.d.ts.map