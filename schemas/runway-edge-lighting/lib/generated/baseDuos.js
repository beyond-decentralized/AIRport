"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection Duo
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseLogEntryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseLogEntryDuo = BaseLogEntryDuo;
class BaseLogEntryTypeDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseLogEntryTypeDuo = BaseLogEntryTypeDuo;
class BaseLogEntryValueDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseLogEntryValueDuo = BaseLogEntryValueDuo;
class BaseLoggedErrorDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseLoggedErrorDuo = BaseLoggedErrorDuo;
class BaseLoggedErrorStackTraceDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseLoggedErrorStackTraceDuo = BaseLoggedErrorStackTraceDuo;
//# sourceMappingURL=baseDuos.js.map