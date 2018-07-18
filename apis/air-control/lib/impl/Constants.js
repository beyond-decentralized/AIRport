"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deltaConst;
(function (deltaConst) {
    deltaConst.DB_ID_FIELD = 'createDbId';
})(deltaConst = exports.deltaConst || (exports.deltaConst = {}));
var dbConst;
(function (dbConst) {
    dbConst.CURRENT_DB = undefined;
    dbConst.DEFAULT_DB = 'tq-default_db';
    dbConst.ALL_DBS = 'tq-all_dbs';
    dbConst.OWN_DB_FACADE = 'tq-own_db_facade';
})(dbConst = exports.dbConst || (exports.dbConst = {}));
function getDbIndex(dbName) {
    if (dbName === dbConst.CURRENT_DB) {
        return -1;
    }
    throw `Not implemented`;
}
exports.getDbIndex = getDbIndex;
//# sourceMappingURL=Constants.js.map