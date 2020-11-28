import { InternalFragments, JsonFieldQuery, QueryResultType } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export declare class FieldSQLQuery extends NonEntitySQLQuery<JsonFieldQuery> {
    constructor(jsonQuery: JsonFieldQuery, dialect: SQLDialect, context: IOperationContext<any, any>);
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IOperationContext<any, any>, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IOperationContext<any, any>): string;
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
//# sourceMappingURL=FieldSQLQuery.d.ts.map