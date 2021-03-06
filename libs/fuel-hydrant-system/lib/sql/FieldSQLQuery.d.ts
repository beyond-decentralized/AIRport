import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { IEntityStateManager, InternalFragments, JsonFieldQuery, QueryResultType } from '@airport/ground-control';
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { IValidator } from '../validation/Validator';
import { SQLDialect } from './core/SQLQuery';
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export declare class FieldSQLQuery extends NonEntitySQLQuery<JsonFieldQuery> {
    constructor(jsonQuery: JsonFieldQuery, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, subStatementQueryGenerator: ISubStatementSqlGenerator, utils: IUtils, context: IFuelHydrantContext);
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
//# sourceMappingURL=FieldSQLQuery.d.ts.map