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
class BaseDailySyncLogDuo extends SQDIDuo {
    constructor() {
        super('DailySyncLog');
    }
}
exports.BaseDailySyncLogDuo = BaseDailySyncLogDuo;
class BaseLogDuo extends SQDIDuo {
    constructor() {
        super('Log');
    }
}
exports.BaseLogDuo = BaseLogDuo;
class BaseMonthlySyncLogDuo extends SQDIDuo {
    constructor() {
        super('MonthlySyncLog');
    }
}
exports.BaseMonthlySyncLogDuo = BaseMonthlySyncLogDuo;
//# sourceMappingURL=baseDuos.js.map