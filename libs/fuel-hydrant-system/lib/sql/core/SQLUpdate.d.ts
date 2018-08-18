import { IAirportDatabase, IEntityUpdateProperties, IUtils } from "@airport/air-control";
import { JsonUpdate } from "@airport/ground-control";
import { SQLNoJoinQuery } from "./SQLNoJoinQuery";
import { SQLDialect } from "./SQLQuery";
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLUpdate extends SQLNoJoinQuery {
    jsonUpdate: JsonUpdate<IEntityUpdateProperties>;
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonUpdate: JsonUpdate<IEntityUpdateProperties>, dialect: SQLDialect);
    toSQL(): string;
    protected getSetFragment(setClauseFragment: IEntityUpdateProperties): string;
    private addSetFragment;
    private isManyToOneRelation;
    private addManyToOneMappings;
}
