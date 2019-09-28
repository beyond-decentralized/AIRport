"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection Dao
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseApplicationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseApplicationPackageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseApplicationPackageDao = BaseApplicationPackageDao;
class BaseDomainDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseDomainDao = BaseDomainDao;
class BasePackageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BasePackageDao = BasePackageDao;
class BasePackagedUnitDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BasePackagedUnitDao = BasePackagedUnitDao;
//# sourceMappingURL=baseDaos.js.map