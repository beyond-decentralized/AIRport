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
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseApplicationDuo extends SQDIDuo {
    constructor() {
        super('Application');
    }
}
exports.BaseApplicationDuo = BaseApplicationDuo;
class BaseApplicationPackageDuo extends SQDIDuo {
    constructor() {
        super('ApplicationPackage');
    }
}
exports.BaseApplicationPackageDuo = BaseApplicationPackageDuo;
class BaseDomainDuo extends SQDIDuo {
    constructor() {
        super('Domain');
    }
}
exports.BaseDomainDuo = BaseDomainDuo;
class BasePackageDuo extends SQDIDuo {
    constructor() {
        super('Package');
    }
}
exports.BasePackageDuo = BasePackageDuo;
class BasePackagedUnitDuo extends SQDIDuo {
    constructor() {
        super('PackagedUnit');
    }
}
exports.BasePackagedUnitDuo = BasePackagedUnitDuo;
//# sourceMappingURL=baseDuos.js.map