"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseSequenceDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Sequence']);
    }
}
exports.BaseSequenceDmo = BaseSequenceDmo;
class BaseSequenceBlockDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SequenceBlock']);
    }
}
exports.BaseSequenceBlockDmo = BaseSequenceBlockDmo;
class BaseSequenceConsumerDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SequenceConsumer']);
    }
}
exports.BaseSequenceConsumerDmo = BaseSequenceConsumerDmo;
//# sourceMappingURL=baseDmos.js.map