import { IAirportDatabase, IApplicationUtils, IQMetadataUtils, IRelationManager, IUtils } from '@airport/air-traffic-control';
import { IEntityStateManager, InternalFragments, JsonSheetQuery, QueryResultType } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { IValidator } from '../validation/Validator';
import { SQLDialect } from './core/SQLQuery';
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export declare class SheetSQLQuery extends NonEntitySQLQuery<JsonSheetQuery> {
    constructor(jsonQuery: JsonSheetQuery, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, subStatementQueryGenerator: ISubStatementSqlGenerator, utils: IUtils, context: IFuelHydrantContext);
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[], internalFragments: InternalFragments): any;
}
//# sourceMappingURL=SheetSQLQuery.d.ts.map