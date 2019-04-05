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
class BaseSequenceDmo extends SQDIDmo {
    constructor() {
        super('Sequence');
    }
}
exports.BaseSequenceDmo = BaseSequenceDmo;
class BaseSequenceBlockDmo extends SQDIDmo {
    constructor() {
        super('SequenceBlock');
    }
}
exports.BaseSequenceBlockDmo = BaseSequenceBlockDmo;
class BaseSequenceConsumerDmo extends SQDIDmo {
    constructor() {
        super('SequenceConsumer');
    }
}
exports.BaseSequenceConsumerDmo = BaseSequenceConsumerDmo;
//# sourceMappingURL=baseDmos.js.map