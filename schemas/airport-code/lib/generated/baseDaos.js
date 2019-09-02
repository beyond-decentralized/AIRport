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
class BaseSequenceDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSequenceDao = BaseSequenceDao;
class BaseSystemWideOperationIdDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSystemWideOperationIdDao = BaseSystemWideOperationIdDao;
class BaseTerminalRunDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseTerminalRunDao = BaseTerminalRunDao;
//# sourceMappingURL=baseDaos.js.map