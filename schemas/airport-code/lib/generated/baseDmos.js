"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseShardDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Shard']);
    }
}
exports.BaseShardDmo = BaseShardDmo;
class BaseShardedRecordDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ShardedRecord']);
    }
}
exports.BaseShardedRecordDmo = BaseShardedRecordDmo;
//# sourceMappingURL=baseDmos.js.map