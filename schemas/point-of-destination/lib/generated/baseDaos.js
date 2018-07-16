"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseDailyArchiveDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailyArchive'], qSchema_1.Q, utils);
    }
}
exports.BaseDailyArchiveDao = BaseDailyArchiveDao;
//# sourceMappingURL=baseDaos.js.map