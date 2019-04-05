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
class BaseDailyArchiveDmo extends SQDIDmo {
    constructor() {
        super('DailyArchive');
    }
}
exports.BaseDailyArchiveDmo = BaseDailyArchiveDmo;
//# sourceMappingURL=baseDmos.js.map