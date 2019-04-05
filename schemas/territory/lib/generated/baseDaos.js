"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseApplicationDao extends SQDIDao {
    constructor() {
        super('Application');
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseApplicationPackageDao extends SQDIDao {
    constructor() {
        super('ApplicationPackage');
    }
}
exports.BaseApplicationPackageDao = BaseApplicationPackageDao;
class BaseDomainDao extends SQDIDao {
    constructor() {
        super('Domain');
    }
}
exports.BaseDomainDao = BaseDomainDao;
class BasePackageDao extends SQDIDao {
    constructor() {
        super('Package');
    }
}
exports.BasePackageDao = BasePackageDao;
class BasePackagedUnitDao extends SQDIDao {
    constructor() {
        super('PackagedUnit');
    }
}
exports.BasePackagedUnitDao = BasePackagedUnitDao;
//# sourceMappingURL=baseDaos.js.map