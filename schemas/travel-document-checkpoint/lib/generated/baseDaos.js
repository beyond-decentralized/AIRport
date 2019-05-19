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
class BaseAgtDao extends SQDIDao {
    constructor() {
        super('Agt');
    }
}
exports.BaseAgtDao = BaseAgtDao;
class BaseTerminalDao extends SQDIDao {
    constructor() {
        super('Terminal');
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalAgtDao extends SQDIDao {
    constructor() {
        super('TerminalAgt');
    }
}
exports.BaseTerminalAgtDao = BaseTerminalAgtDao;
class BaseUserDao extends SQDIDao {
    constructor() {
        super('User');
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserTerminalDao extends SQDIDao {
    constructor() {
        super('UserTerminal');
    }
}
exports.BaseUserTerminalDao = BaseUserTerminalDao;
class BaseUserTerminalAgtDao extends SQDIDao {
    constructor() {
        super('UserTerminalAgt');
    }
}
exports.BaseUserTerminalAgtDao = BaseUserTerminalAgtDao;
//# sourceMappingURL=baseDaos.js.map