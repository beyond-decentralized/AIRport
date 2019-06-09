"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseSchemaDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseSchemaDao = BaseSchemaDao;
class BaseSchemaColumnDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSchemaColumnDao = BaseSchemaColumnDao;
class BaseSchemaEntityDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseSchemaEntityDao = BaseSchemaEntityDao;
class BaseSchemaPropertyDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseSchemaPropertyDao = BaseSchemaPropertyDao;
class BaseSchemaPropertyColumnDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSchemaPropertyColumnDao = BaseSchemaPropertyColumnDao;
class BaseSchemaReferenceDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseSchemaReferenceDao = BaseSchemaReferenceDao;
class BaseSchemaRelationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseSchemaRelationDao = BaseSchemaRelationDao;
class BaseSchemaRelationColumnDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSchemaRelationColumnDao = BaseSchemaRelationColumnDao;
class BaseSchemaVersionDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseSchemaVersionDao = BaseSchemaVersionDao;
//# sourceMappingURL=baseDaos.js.map