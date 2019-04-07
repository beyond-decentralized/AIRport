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
        return qSchema_1.Q.db;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseSequenceDuo extends SQDIDuo {
    constructor() {
        super('Sequence');
    }
}
exports.BaseSequenceDuo = BaseSequenceDuo;
class BaseSequenceBlockDuo extends SQDIDuo {
    constructor() {
        super('SequenceBlock');
    }
}
exports.BaseSequenceBlockDuo = BaseSequenceBlockDuo;
class BaseSequenceConsumerDuo extends SQDIDuo {
    constructor() {
        super('SequenceConsumer');
    }
}
exports.BaseSequenceConsumerDuo = BaseSequenceConsumerDuo;
//# sourceMappingURL=baseDuos.js.map