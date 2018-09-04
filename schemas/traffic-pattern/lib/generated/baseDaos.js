"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseSchemaDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Schema'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaDao = BaseSchemaDao;
class BaseSchemaColumnDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaColumn'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaColumnDao = BaseSchemaColumnDao;
class BaseSchemaEntityDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaEntity'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaEntityDao = BaseSchemaEntityDao;
class BaseSchemaPropertyDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaProperty'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaPropertyDao = BaseSchemaPropertyDao;
class BaseSchemaPropertyColumnDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaPropertyColumn'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaPropertyColumnDao = BaseSchemaPropertyColumnDao;
class BaseSchemaReferenceDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaReference'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaReferenceDao = BaseSchemaReferenceDao;
class BaseSchemaRelationDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaRelation'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaRelationDao = BaseSchemaRelationDao;
class BaseSchemaRelationColumnDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaRelationColumn'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaRelationColumnDao = BaseSchemaRelationColumnDao;
class BaseSchemaVersionDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaVersion'], qSchema_1.Q, utils);
    }
}
exports.BaseSchemaVersionDao = BaseSchemaVersionDao;
class BaseVersionedSchemaObjectDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['VersionedSchemaObject'], qSchema_1.Q, utils);
    }
}
exports.BaseVersionedSchemaObjectDao = BaseVersionedSchemaObjectDao;
//# sourceMappingURL=baseDaos.js.map