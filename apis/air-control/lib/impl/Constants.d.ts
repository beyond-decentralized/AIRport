/**
 * Created by Papa on 12/15/2016.
 */
import { DatabaseIndex } from "@airport/ground-control";
export declare namespace deltaConst {
    const DB_ID_FIELD = "createDbId";
}
export declare namespace dbConst {
    const CURRENT_DB: any;
    const DEFAULT_DB = "tq-default_db";
    const ALL_DBS = "tq-all_dbs";
    const OWN_DB_FACADE = "tq-own_db_facade";
}
export declare function getDbIndex(dbName: string): DatabaseIndex;
