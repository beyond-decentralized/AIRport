"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseSequenceDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Sequence'], qSchema_1.Q, utils);
    }
}
exports.BaseSequenceDao = BaseSequenceDao;
class BaseSequenceBlockDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SequenceBlock'], qSchema_1.Q, utils);
    }
}
exports.BaseSequenceBlockDao = BaseSequenceBlockDao;
class BaseSequenceConsumerDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SequenceConsumer'], qSchema_1.Q, utils);
    }
}
exports.BaseSequenceConsumerDao = BaseSequenceConsumerDao;
//# sourceMappingURL=baseDaos.js.map