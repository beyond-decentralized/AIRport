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
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDao = SQDIDao;
class BaseLogEntryDao extends SQDIDao {
    constructor() {
        super('LogEntry');
    }
}
exports.BaseLogEntryDao = BaseLogEntryDao;
class BaseLogEntryTypeDao extends SQDIDao {
    constructor() {
        super('LogEntryType');
    }
}
exports.BaseLogEntryTypeDao = BaseLogEntryTypeDao;
class BaseLogEntryValueDao extends SQDIDao {
    constructor() {
        super('LogEntryValue');
    }
}
exports.BaseLogEntryValueDao = BaseLogEntryValueDao;
class BaseLoggedErrorDao extends SQDIDao {
    constructor() {
        super('LoggedError');
    }
}
exports.BaseLoggedErrorDao = BaseLoggedErrorDao;
class BaseLoggedErrorStackTraceDao extends SQDIDao {
    constructor() {
        super('LoggedErrorStackTrace');
    }
}
exports.BaseLoggedErrorStackTraceDao = BaseLoggedErrorStackTraceDao;
//# sourceMappingURL=baseDaos.js.map