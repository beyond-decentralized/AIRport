"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName, qSchema) {
        super(dbEntityName, qSchema);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseSchemaDao extends SQDIDao {
    constructor() {
        super('Schema', qSchema_1.Q);
    }
}
exports.BaseSchemaDao = BaseSchemaDao;
class BaseSchemaColumnDao extends SQDIDao {
    constructor() {
        super('SchemaColumn', qSchema_1.Q);
    }
}
exports.BaseSchemaColumnDao = BaseSchemaColumnDao;
class BaseSchemaEntityDao extends SQDIDao {
    constructor() {
        super('SchemaEntity', qSchema_1.Q);
    }
}
exports.BaseSchemaEntityDao = BaseSchemaEntityDao;
class BaseSchemaPropertyDao extends SQDIDao {
    constructor() {
        super('SchemaProperty', qSchema_1.Q);
    }
}
exports.BaseSchemaPropertyDao = BaseSchemaPropertyDao;
class BaseSchemaPropertyColumnDao extends SQDIDao {
    constructor() {
        super('SchemaPropertyColumn', qSchema_1.Q);
    }
}
exports.BaseSchemaPropertyColumnDao = BaseSchemaPropertyColumnDao;
class BaseSchemaReferenceDao extends SQDIDao {
    constructor() {
        super('SchemaReference', qSchema_1.Q);
    }
}
exports.BaseSchemaReferenceDao = BaseSchemaReferenceDao;
class BaseSchemaRelationDao extends SQDIDao {
    constructor() {
        super('SchemaRelation', qSchema_1.Q);
    }
}
exports.BaseSchemaRelationDao = BaseSchemaRelationDao;
class BaseSchemaRelationColumnDao extends SQDIDao {
    constructor() {
        super('SchemaRelationColumn', qSchema_1.Q);
    }
}
exports.BaseSchemaRelationColumnDao = BaseSchemaRelationColumnDao;
class BaseSchemaVersionDao extends SQDIDao {
    constructor() {
        super('SchemaVersion', qSchema_1.Q);
    }
}
exports.BaseSchemaVersionDao = BaseSchemaVersionDao;
class BaseVersionedSchemaObjectDao extends SQDIDao {
    constructor() {
        super('VersionedSchemaObject', qSchema_1.Q);
    }
}
exports.BaseVersionedSchemaObjectDao = BaseVersionedSchemaObjectDao;
//# sourceMappingURL=baseDaos.js.map