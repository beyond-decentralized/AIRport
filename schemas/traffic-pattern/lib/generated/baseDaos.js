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
class BaseSchemaDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseSchemaDao = BaseSchemaDao;
class BaseSchemaColumnDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseSchemaColumnDao = BaseSchemaColumnDao;
class BaseSchemaEntityDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseSchemaEntityDao = BaseSchemaEntityDao;
class BaseSchemaPropertyDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSchemaPropertyDao = BaseSchemaPropertyDao;
class BaseSchemaPropertyColumnDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseSchemaPropertyColumnDao = BaseSchemaPropertyColumnDao;
class BaseSchemaReferenceDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseSchemaReferenceDao = BaseSchemaReferenceDao;
class BaseSchemaRelationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSchemaRelationDao = BaseSchemaRelationDao;
class BaseSchemaRelationColumnDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSchemaRelationColumnDao = BaseSchemaRelationColumnDao;
class BaseSchemaVersionDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseSchemaVersionDao = BaseSchemaVersionDao;
//# sourceMappingURL=baseDaos.js.map