import { IAirportDatabase, IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { JsonFieldQuery } from '@airport/ground-control';
import { SQLDialect } from './core/SQLQuery';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export declare class FieldSQLQuery extends NonEntitySQLQuery<JsonFieldQuery> {
    constructor(jsonQuery: JsonFieldQuery, dialect: SQLDialect);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    parseQueryResults(airDb: IAirportDatabase, schemaUtils: ISchemaUtils, results: any[]): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
