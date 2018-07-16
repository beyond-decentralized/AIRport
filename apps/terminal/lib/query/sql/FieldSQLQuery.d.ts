import { JsonFieldQuery } from "@airport/ground-control";
import { SQLDialect } from "./core/SQLQuery";
import { NonEntitySQLQuery } from "./NonEntitySQLQuery";
import { IAirportDatabase, IUtils } from "@airport/air-control";
/**
 * Created by Papa on 10/29/2016.
 */
export declare class FieldSQLQuery extends NonEntitySQLQuery<JsonFieldQuery> {
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonQuery: JsonFieldQuery, dialect: SQLDialect);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any): string;
    parseQueryResults(results: any[]): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
