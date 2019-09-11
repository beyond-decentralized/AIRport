import { AliasCache, IAirportDatabase, ISchemaUtils, IUtils } from '@airport/air-control';
import { JsonTreeQuery } from '@airport/ground-control';
import { TreeQueryResultParser } from '../result/TreeQueryResultParser';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/28/2016.
 */
export declare class TreeSQLQuery extends NonEntitySQLQuery<JsonTreeQuery> {
    protected queryParser: TreeQueryResultParser;
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonQuery: JsonTreeQuery, dialect: SQLDialect);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any): string;
    /**
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * @param results
     * @returns {any[]}
     */
    parseQueryResults(schemaUtils: ISchemaUtils, results: any[]): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[], aliasCache: AliasCache, entityAlias: string): any;
}
