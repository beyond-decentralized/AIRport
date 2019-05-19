"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseLogEntryDuo extends SQDIDuo {
    constructor() {
        super('LogEntry');
    }
}
exports.BaseLogEntryDuo = BaseLogEntryDuo;
class BaseLogEntryTypeDuo extends SQDIDuo {
    constructor() {
        super('LogEntryType');
    }
}
exports.BaseLogEntryTypeDuo = BaseLogEntryTypeDuo;
class BaseLogEntryValueDuo extends SQDIDuo {
    constructor() {
        super('LogEntryValue');
    }
}
exports.BaseLogEntryValueDuo = BaseLogEntryValueDuo;
class BaseLoggedErrorDuo extends SQDIDuo {
    constructor() {
        super('LoggedError');
    }
}
exports.BaseLoggedErrorDuo = BaseLoggedErrorDuo;
class BaseLoggedErrorStackTraceDuo extends SQDIDuo {
    constructor() {
        super('LoggedErrorStackTrace');
    }
}
exports.BaseLoggedErrorStackTraceDuo = BaseLoggedErrorStackTraceDuo;
//# sourceMappingURL=baseDuos.js.map