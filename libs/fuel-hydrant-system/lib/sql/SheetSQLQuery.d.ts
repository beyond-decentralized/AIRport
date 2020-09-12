import { IAirportDatabase, IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { InternalFragments, IStoreDriver, JsonSheetQuery } from '@airport/ground-control';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export declare class SheetSQLQuery extends NonEntitySQLQuery<JsonSheetQuery> {
    constructor(jsonQuery: JsonSheetQuery, dialect: SQLDialect, storeDriver: IStoreDriver);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    parseQueryResults(airDb: IAirportDatabase, schemaUtils: ISchemaUtils, results: any[], internalFragments: InternalFragments): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[], internalFragments: InternalFragments): any;
}
//# sourceMappingURL=SheetSQLQuery.d.ts.map