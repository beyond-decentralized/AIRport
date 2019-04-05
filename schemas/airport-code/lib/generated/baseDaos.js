"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName, qSchema) {
        super(dbEntityName, qSchema);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseSequenceDao extends SQDIDao {
    constructor() {
        super('Sequence', qSchema_1.Q);
    }
}
exports.BaseSequenceDao = BaseSequenceDao;
class BaseSequenceBlockDao extends SQDIDao {
    constructor() {
        super('SequenceBlock', qSchema_1.Q);
    }
}
exports.BaseSequenceBlockDao = BaseSequenceBlockDao;
class BaseSequenceConsumerDao extends SQDIDao {
    constructor() {
        super('SequenceConsumer', qSchema_1.Q);
    }
}
exports.BaseSequenceConsumerDao = BaseSequenceConsumerDao;
//# sourceMappingURL=baseDaos.js.map