"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseDailySyncLogDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailySyncLog'], qSchema_1.Q, utils);
    }
}
exports.BaseDailySyncLogDao = BaseDailySyncLogDao;
class BaseLogDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Log'], qSchema_1.Q, utils);
    }
}
exports.BaseLogDao = BaseLogDao;
class BaseMonthlySyncLogDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MonthlySyncLog'], qSchema_1.Q, utils);
    }
}
exports.BaseMonthlySyncLogDao = BaseMonthlySyncLogDao;
//# sourceMappingURL=baseDaos.js.map