import { IAirportDatabase, ISchemaUtils, IUtils } from '@airport/air-control';
import { JsonFieldQuery } from '@airport/ground-control';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export declare class FieldSQLQuery extends NonEntitySQLQuery<JsonFieldQuery> {
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonQuery: JsonFieldQuery, dialect: SQLDialect);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any): string;
    parseQueryResults(schemaUtils: ISchemaUtils, results: any[]): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
