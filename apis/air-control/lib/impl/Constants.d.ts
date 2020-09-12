/**
 * Created by Papa on 12/15/2016.
 */
import { DatabaseIndex } from "@airport/ground-control";
export declare namespace deltaConst {
    const DB_ID_FIELD = "createDbId";
}
export declare namespace dbConst {
    const CURRENT_DB: any;
    const DEFAULT_DB = "air-default_db";
    const ALL_DBS = "air-all_dbs";
    const OWN_DB_FACADE = "air-own_db_facade";
}
export declare function getDbIndex(dbName: string): DatabaseIndex;
//# sourceMappingURL=Constants.d.ts.map