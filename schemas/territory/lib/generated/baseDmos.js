"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseApplicationDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Application']);
    }
}
exports.BaseApplicationDmo = BaseApplicationDmo;
class BaseApplicationPackageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ApplicationPackage']);
    }
}
exports.BaseApplicationPackageDmo = BaseApplicationPackageDmo;
class BaseDomainDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Domain']);
    }
}
exports.BaseDomainDmo = BaseDomainDmo;
class BasePackageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Package']);
    }
}
exports.BasePackageDmo = BasePackageDmo;
class BasePackagedUnitDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['PackagedUnit']);
    }
}
exports.BasePackagedUnitDmo = BasePackagedUnitDmo;
//# sourceMappingURL=baseDmos.js.map