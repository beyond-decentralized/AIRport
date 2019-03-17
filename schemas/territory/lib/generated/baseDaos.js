"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Application'], qSchema_1.Q);
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseApplicationPackageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ApplicationPackage'], qSchema_1.Q);
    }
}
exports.BaseApplicationPackageDao = BaseApplicationPackageDao;
class BaseDomainDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Domain'], qSchema_1.Q);
    }
}
exports.BaseDomainDao = BaseDomainDao;
class BasePackageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Package'], qSchema_1.Q);
    }
}
exports.BasePackageDao = BasePackageDao;
class BasePackagedUnitDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['PackagedUnit'], qSchema_1.Q);
    }
}
exports.BasePackagedUnitDao = BasePackagedUnitDao;
//# sourceMappingURL=baseDaos.js.map