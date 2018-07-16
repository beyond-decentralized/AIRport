"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseLogEntryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LogEntry']);
    }
}
exports.BaseLogEntryDmo = BaseLogEntryDmo;
class BaseLogEntryTypeDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LogEntryType']);
    }
}
exports.BaseLogEntryTypeDmo = BaseLogEntryTypeDmo;
class BaseLogEntryValueDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LogEntryValue']);
    }
}
exports.BaseLogEntryValueDmo = BaseLogEntryValueDmo;
class BaseLoggedErrorDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LoggedError']);
    }
}
exports.BaseLoggedErrorDmo = BaseLoggedErrorDmo;
class BaseLoggedErrorStackTraceDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['LoggedErrorStackTrace']);
    }
}
exports.BaseLoggedErrorStackTraceDmo = BaseLoggedErrorStackTraceDmo;
//# sourceMappingURL=baseDmos.js.map