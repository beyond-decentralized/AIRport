export var deltaConst;
(function (deltaConst) {
    deltaConst.DB_ID_FIELD = 'createDbId';
})(deltaConst || (deltaConst = {}));
export var dbConst;
(function (dbConst) {
    dbConst.CURRENT_DB = undefined;
    dbConst.DEFAULT_DB = 'air-default_db';
    dbConst.ALL_DBS = 'air-all_dbs';
    dbConst.OWN_DB_FACADE = 'air-own_db_facade';
})(dbConst || (dbConst = {}));
export function getDbIndex(dbName) {
    if (dbName === dbConst.CURRENT_DB) {
        return -1;
    }
    throw new Error(`Not implemented`);
}
//# sourceMappingURL=Constants.js.map