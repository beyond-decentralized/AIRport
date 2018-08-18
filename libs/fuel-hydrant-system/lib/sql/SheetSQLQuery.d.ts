import { JsonSheetQuery } from "@airport/ground-control";
import { SQLDialect } from "./core/SQLQuery";
import { NonEntitySQLQuery } from "./NonEntitySQLQuery";
import { IAirportDatabase, IUtils } from "@airport/air-control";
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export declare class SheetSQLQuery extends NonEntitySQLQuery<JsonSheetQuery> {
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonQuery: JsonSheetQuery, dialect: SQLDialect);
    protected getSELECTFragment(nested: boolean, selectClauseFragment: any): string;
    parseQueryResults(results: any[]): any[];
    protected parseQueryResult(selectClauseFragment: any, resultRow: any, nextFieldIndex: number[]): any;
}
