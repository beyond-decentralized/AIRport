"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName, qSchema) {
        super(dbEntityName, qSchema);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseDailySyncLogDao extends SQDIDao {
    constructor() {
        super('DailySyncLog', qSchema_1.Q);
    }
}
exports.BaseDailySyncLogDao = BaseDailySyncLogDao;
class BaseLogDao extends SQDIDao {
    constructor() {
        super('Log', qSchema_1.Q);
    }
}
exports.BaseLogDao = BaseLogDao;
class BaseMonthlySyncLogDao extends SQDIDao {
    constructor() {
        super('MonthlySyncLog', qSchema_1.Q);
    }
}
exports.BaseMonthlySyncLogDao = BaseMonthlySyncLogDao;
//# sourceMappingURL=baseDaos.js.map