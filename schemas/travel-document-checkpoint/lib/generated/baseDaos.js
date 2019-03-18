"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseAgtDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Agt'], qSchema_1.Q);
    }
}
exports.BaseAgtDao = BaseAgtDao;
class BaseTerminalDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Terminal'], qSchema_1.Q);
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalAgtDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TerminalAgt'], qSchema_1.Q);
    }
}
exports.BaseTerminalAgtDao = BaseTerminalAgtDao;
class BaseUserDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['User'], qSchema_1.Q);
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserTerminalDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['UserTerminal'], qSchema_1.Q);
    }
}
exports.BaseUserTerminalDao = BaseUserTerminalDao;
class BaseUserTerminalAgtDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['UserTerminalAgt'], qSchema_1.Q);
    }
}
exports.BaseUserTerminalAgtDao = BaseUserTerminalAgtDao;
//# sourceMappingURL=baseDaos.js.map