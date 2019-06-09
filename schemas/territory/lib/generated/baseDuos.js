"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseApplicationDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseApplicationDuo = BaseApplicationDuo;
class BaseApplicationPackageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseApplicationPackageDuo = BaseApplicationPackageDuo;
class BaseDomainDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseDomainDuo = BaseDomainDuo;
class BasePackageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BasePackageDuo = BasePackageDuo;
class BasePackagedUnitDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BasePackagedUnitDuo = BasePackagedUnitDuo;
//# sourceMappingURL=baseDuos.js.map