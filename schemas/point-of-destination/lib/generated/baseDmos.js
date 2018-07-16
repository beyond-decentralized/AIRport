"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseDailyArchiveDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailyArchive']);
    }
}
exports.BaseDailyArchiveDmo = BaseDailyArchiveDmo;
//# sourceMappingURL=baseDmos.js.map