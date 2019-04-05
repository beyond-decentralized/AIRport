"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseDailyArchiveDao extends SQDIDao {
    constructor() {
        super('DailyArchive');
    }
}
exports.BaseDailyArchiveDao = BaseDailyArchiveDao;
//# sourceMappingURL=baseDaos.js.map