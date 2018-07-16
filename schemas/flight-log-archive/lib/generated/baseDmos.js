"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseDailySyncLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailySyncLog']);
    }
}
exports.BaseDailySyncLogDmo = BaseDailySyncLogDmo;
class BaseLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Log']);
    }
}
exports.BaseLogDmo = BaseLogDmo;
class BaseMonthlySyncLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MonthlySyncLog']);
    }
}
exports.BaseMonthlySyncLogDmo = BaseMonthlySyncLogDmo;
//# sourceMappingURL=baseDmos.js.map