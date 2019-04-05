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
class BaseAgtDao extends SQDIDao {
    constructor() {
        super('Agt', qSchema_1.Q);
    }
}
exports.BaseAgtDao = BaseAgtDao;
class BaseTerminalDao extends SQDIDao {
    constructor() {
        super('Terminal', qSchema_1.Q);
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalAgtDao extends SQDIDao {
    constructor() {
        super('TerminalAgt', qSchema_1.Q);
    }
}
exports.BaseTerminalAgtDao = BaseTerminalAgtDao;
class BaseUserDao extends SQDIDao {
    constructor() {
        super('User', qSchema_1.Q);
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserTerminalDao extends SQDIDao {
    constructor() {
        super('UserTerminal', qSchema_1.Q);
    }
}
exports.BaseUserTerminalDao = BaseUserTerminalDao;
class BaseUserTerminalAgtDao extends SQDIDao {
    constructor() {
        super('UserTerminalAgt', qSchema_1.Q);
    }
}
exports.BaseUserTerminalAgtDao = BaseUserTerminalAgtDao;
//# sourceMappingURL=baseDaos.js.map