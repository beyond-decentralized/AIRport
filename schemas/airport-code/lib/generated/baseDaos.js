"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseShardDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Shard'], qSchema_1.Q, utils);
    }
}
exports.BaseShardDao = BaseShardDao;
class BaseShardedRecordDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ShardedRecord'], qSchema_1.Q, utils);
    }
}
exports.BaseShardedRecordDao = BaseShardedRecordDao;
//# sourceMappingURL=baseDaos.js.map