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
class BaseSequenceDao extends SQDIDao {
    constructor() {
        super('Sequence');
    }
}
exports.BaseSequenceDao = BaseSequenceDao;
class BaseSequenceBlockDao extends SQDIDao {
    constructor() {
        super('SequenceBlock');
    }
}
exports.BaseSequenceBlockDao = BaseSequenceBlockDao;
class BaseTerminalRunDao extends SQDIDao {
    constructor() {
        super('TerminalRun');
    }
}
exports.BaseTerminalRunDao = BaseTerminalRunDao;
//# sourceMappingURL=baseDaos.js.map