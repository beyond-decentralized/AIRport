import { IAirportDatabase, IUtils } from "@airport/air-control";
import { DbEntity, JsonInsertValues } from '@airport/ground-control';
import { SQLNoJoinQuery } from "./SQLNoJoinQuery";
import { SQLDialect } from "./SQLQuery";
/**
 * Created by Papa on 11/17/2016.
 */
export declare class SQLInsertValues extends SQLNoJoinQuery {
    jsonInsertValues: JsonInsertValues;
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonInsertValues: JsonInsertValues, dialect: SQLDialect);
    toSQL(): string;
    protected getColumnsFragment(dbEntity: DbEntity, columns: number[]): string;
    protected getValuesFragment(valuesClauseFragment: any[][]): string;
}
