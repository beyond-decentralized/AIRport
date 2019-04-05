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
class BaseDailySyncLogDmo extends SQDIDmo {
    constructor() {
        super('DailySyncLog');
    }
}
exports.BaseDailySyncLogDmo = BaseDailySyncLogDmo;
class BaseLogDmo extends SQDIDmo {
    constructor() {
        super('Log');
    }
}
exports.BaseLogDmo = BaseLogDmo;
class BaseMonthlySyncLogDmo extends SQDIDmo {
    constructor() {
        super('MonthlySyncLog');
    }
}
exports.BaseMonthlySyncLogDmo = BaseMonthlySyncLogDmo;
//# sourceMappingURL=baseDmos.js.map