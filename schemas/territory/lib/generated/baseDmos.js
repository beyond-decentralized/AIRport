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
class BaseApplicationDmo extends SQDIDmo {
    constructor() {
        super('Application');
    }
}
exports.BaseApplicationDmo = BaseApplicationDmo;
class BaseApplicationPackageDmo extends SQDIDmo {
    constructor() {
        super('ApplicationPackage');
    }
}
exports.BaseApplicationPackageDmo = BaseApplicationPackageDmo;
class BaseDomainDmo extends SQDIDmo {
    constructor() {
        super('Domain');
    }
}
exports.BaseDomainDmo = BaseDomainDmo;
class BasePackageDmo extends SQDIDmo {
    constructor() {
        super('Package');
    }
}
exports.BasePackageDmo = BasePackageDmo;
class BasePackagedUnitDmo extends SQDIDmo {
    constructor() {
        super('PackagedUnit');
    }
}
exports.BasePackagedUnitDmo = BasePackagedUnitDmo;
//# sourceMappingURL=baseDmos.js.map