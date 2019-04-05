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
class BaseLogEntryDao extends SQDIDao {
    constructor() {
        super('LogEntry', qSchema_1.Q);
    }
}
exports.BaseLogEntryDao = BaseLogEntryDao;
class BaseLogEntryTypeDao extends SQDIDao {
    constructor() {
        super('LogEntryType', qSchema_1.Q);
    }
}
exports.BaseLogEntryTypeDao = BaseLogEntryTypeDao;
class BaseLogEntryValueDao extends SQDIDao {
    constructor() {
        super('LogEntryValue', qSchema_1.Q);
    }
}
exports.BaseLogEntryValueDao = BaseLogEntryValueDao;
class BaseLoggedErrorDao extends SQDIDao {
    constructor() {
        super('LoggedError', qSchema_1.Q);
    }
}
exports.BaseLoggedErrorDao = BaseLoggedErrorDao;
class BaseLoggedErrorStackTraceDao extends SQDIDao {
    constructor() {
        super('LoggedErrorStackTrace', qSchema_1.Q);
    }
}
exports.BaseLoggedErrorStackTraceDao = BaseLoggedErrorStackTraceDao;
//# sourceMappingURL=baseDaos.js.map