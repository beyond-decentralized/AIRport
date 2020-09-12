import { AliasCache, IAirportDatabase, IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { InternalFragments, IStoreDriver, JsonTreeQuery } from '@airport/ground-control';
import { TreeQueryResultParser } from '../result/TreeQueryResultParser';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/28/2016.
 */
export declare class TreeSQLQuery extends NonEntitySQLQuery<JsonTreeQuery> {
    protected queryParser: TreeQueryResultParser;
    constructor(jsonQuery: JsonTreeQuery, dialect: SQLDialect, storeDriver: IStoreDriver);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    /**
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * @param results
     * @returns {any[]}
     */
    parseQueryResults(airDb: IAirportDatabase, schemaUtils: ISchemaUtils, results: any[]): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[], aliasCache: AliasCache, entityAlias: string): any;
}
//# sourceMappingURL=TreeSQLQuery.d.ts.map