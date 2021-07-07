import { AliasCache } from '@airport/air-control';
import { InternalFragments, JsonTreeQuery, QueryResultType } from '@airport/ground-control';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { TreeQueryResultParser } from '../result/TreeQueryResultParser';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/28/2016.
 */
export declare class TreeSQLQuery extends NonEntitySQLQuery<JsonTreeQuery> {
    protected queryParser: TreeQueryResultParser;
    constructor(jsonQuery: JsonTreeQuery, dialect: SQLDialect, context: IFuelHydrantContext);
    /**
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * @param results
     * @returns {any[]}
     */
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[], aliasCache: AliasCache, entityAlias: string): any;
}
//# sourceMappingURL=TreeSQLQuery.d.ts.map