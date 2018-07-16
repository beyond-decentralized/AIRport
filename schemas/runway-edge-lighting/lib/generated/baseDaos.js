"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseLogEntryDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LogEntry'], qSchema_1.Q, utils);
    }
}
exports.BaseLogEntryDao = BaseLogEntryDao;
class BaseLogEntryTypeDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LogEntryType'], qSchema_1.Q, utils);
    }
}
exports.BaseLogEntryTypeDao = BaseLogEntryTypeDao;
class BaseLogEntryValueDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LogEntryValue'], qSchema_1.Q, utils);
    }
}
exports.BaseLogEntryValueDao = BaseLogEntryValueDao;
class BaseLoggedErrorDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LoggedError'], qSchema_1.Q, utils);
    }
}
exports.BaseLoggedErrorDao = BaseLoggedErrorDao;
class BaseLoggedErrorStackTraceDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LoggedErrorStackTrace'], qSchema_1.Q, utils);
    }
}
exports.BaseLoggedErrorStackTraceDao = BaseLoggedErrorStackTraceDao;
//# sourceMappingURL=baseDaos.js.map