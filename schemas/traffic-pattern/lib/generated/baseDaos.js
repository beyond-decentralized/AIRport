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
class BaseSchemaDao extends SQDIDao {
    constructor() {
        super('Schema');
    }
}
exports.BaseSchemaDao = BaseSchemaDao;
class BaseSchemaColumnDao extends SQDIDao {
    constructor() {
        super('SchemaColumn');
    }
}
exports.BaseSchemaColumnDao = BaseSchemaColumnDao;
class BaseSchemaEntityDao extends SQDIDao {
    constructor() {
        super('SchemaEntity');
    }
}
exports.BaseSchemaEntityDao = BaseSchemaEntityDao;
class BaseSchemaPropertyDao extends SQDIDao {
    constructor() {
        super('SchemaProperty');
    }
}
exports.BaseSchemaPropertyDao = BaseSchemaPropertyDao;
class BaseSchemaPropertyColumnDao extends SQDIDao {
    constructor() {
        super('SchemaPropertyColumn');
    }
}
exports.BaseSchemaPropertyColumnDao = BaseSchemaPropertyColumnDao;
class BaseSchemaReferenceDao extends SQDIDao {
    constructor() {
        super('SchemaReference');
    }
}
exports.BaseSchemaReferenceDao = BaseSchemaReferenceDao;
class BaseSchemaRelationDao extends SQDIDao {
    constructor() {
        super('SchemaRelation');
    }
}
exports.BaseSchemaRelationDao = BaseSchemaRelationDao;
class BaseSchemaRelationColumnDao extends SQDIDao {
    constructor() {
        super('SchemaRelationColumn');
    }
}
exports.BaseSchemaRelationColumnDao = BaseSchemaRelationColumnDao;
class BaseSchemaVersionDao extends SQDIDao {
    constructor() {
        super('SchemaVersion');
    }
}
exports.BaseSchemaVersionDao = BaseSchemaVersionDao;
class BaseVersionedSchemaObjectDao extends SQDIDao {
    constructor() {
        super('VersionedSchemaObject');
    }
}
exports.BaseVersionedSchemaObjectDao = BaseVersionedSchemaObjectDao;
//# sourceMappingURL=baseDaos.js.map