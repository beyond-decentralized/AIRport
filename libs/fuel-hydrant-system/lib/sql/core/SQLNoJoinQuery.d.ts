import { IAirportDatabase, IUtils } from "@airport/air-control";
import { DbEntity, JSONEntityRelation } from '@airport/ground-control';
import { SQLDialect } from "./SQLQuery";
import { SQLWhereBase } from "./SQLWhereBase";
/**
 * Created by Papa on 10/2/2016.
 */
export declare abstract class SQLNoJoinQuery extends SQLWhereBase {
    constructor(airportDb: IAirportDatabase, utils: IUtils, dbEntity: DbEntity, dialect: SQLDialect);
    protected getTableFragment(fromRelation: JSONEntityRelation): string;
}
