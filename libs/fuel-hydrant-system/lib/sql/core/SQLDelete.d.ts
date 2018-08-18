import { IAirportDatabase, IUtils } from "@airport/air-control";
import { JsonDelete } from "@airport/ground-control";
import { SQLNoJoinQuery } from "./SQLNoJoinQuery";
import { SQLDialect } from "./SQLQuery";
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLDelete extends SQLNoJoinQuery {
    jsonDelete: JsonDelete;
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonDelete: JsonDelete, dialect: SQLDialect);
    toSQL(): string;
}
