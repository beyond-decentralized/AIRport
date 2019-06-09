"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseLogEntryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseLogEntryDao = BaseLogEntryDao;
class BaseLogEntryTypeDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseLogEntryTypeDao = BaseLogEntryTypeDao;
class BaseLogEntryValueDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseLogEntryValueDao = BaseLogEntryValueDao;
class BaseLoggedErrorDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseLoggedErrorDao = BaseLoggedErrorDao;
class BaseLoggedErrorStackTraceDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseLoggedErrorStackTraceDao = BaseLoggedErrorStackTraceDao;
//# sourceMappingURL=baseDaos.js.map