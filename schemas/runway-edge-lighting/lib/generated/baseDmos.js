"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDmo extends check_in_1.Dmo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDmo = SQDIDmo;
class BaseLogEntryDmo extends SQDIDmo {
    constructor() {
        super('LogEntry');
    }
}
exports.BaseLogEntryDmo = BaseLogEntryDmo;
class BaseLogEntryTypeDmo extends SQDIDmo {
    constructor() {
        super('LogEntryType');
    }
}
exports.BaseLogEntryTypeDmo = BaseLogEntryTypeDmo;
class BaseLogEntryValueDmo extends SQDIDmo {
    constructor() {
        super('LogEntryValue');
    }
}
exports.BaseLogEntryValueDmo = BaseLogEntryValueDmo;
class BaseLoggedErrorDmo extends SQDIDmo {
    constructor() {
        super('LoggedError');
    }
}
exports.BaseLoggedErrorDmo = BaseLoggedErrorDmo;
class BaseLoggedErrorStackTraceDmo extends SQDIDmo {
    constructor() {
        super('LoggedErrorStackTrace');
    }
}
exports.BaseLoggedErrorStackTraceDmo = BaseLoggedErrorStackTraceDmo;
//# sourceMappingURL=baseDmos.js.map