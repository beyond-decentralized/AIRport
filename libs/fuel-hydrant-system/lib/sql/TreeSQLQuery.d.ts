import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { IEntityStateManager, InternalFragments, JsonTreeQuery, QueryResultType } from '@airport/ground-control';
import { AliasCache, IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { TreeQueryResultParser } from '../result/TreeQueryResultParser';
import { IValidator } from '../validation/Validator';
import { SQLDialect } from './core/SQLQuery';
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/28/2016.
 */
export declare class TreeSQLQuery extends NonEntitySQLQuery<JsonTreeQuery> {
    protected queryParser: TreeQueryResultParser;
    constructor(jsonQuery: JsonTreeQuery, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, subStatementQueryGenerator: ISubStatementSqlGenerator, utils: IUtils, context: IFuelHydrantContext);
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