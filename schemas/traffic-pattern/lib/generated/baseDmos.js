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
class BaseSchemaDmo extends SQDIDmo {
    constructor() {
        super('Schema');
    }
}
exports.BaseSchemaDmo = BaseSchemaDmo;
class BaseSchemaColumnDmo extends SQDIDmo {
    constructor() {
        super('SchemaColumn');
    }
}
exports.BaseSchemaColumnDmo = BaseSchemaColumnDmo;
class BaseSchemaEntityDmo extends SQDIDmo {
    constructor() {
        super('SchemaEntity');
    }
}
exports.BaseSchemaEntityDmo = BaseSchemaEntityDmo;
class BaseSchemaPropertyDmo extends SQDIDmo {
    constructor() {
        super('SchemaProperty');
    }
}
exports.BaseSchemaPropertyDmo = BaseSchemaPropertyDmo;
class BaseSchemaPropertyColumnDmo extends SQDIDmo {
    constructor() {
        super('SchemaPropertyColumn');
    }
}
exports.BaseSchemaPropertyColumnDmo = BaseSchemaPropertyColumnDmo;
class BaseSchemaReferenceDmo extends SQDIDmo {
    constructor() {
        super('SchemaReference');
    }
}
exports.BaseSchemaReferenceDmo = BaseSchemaReferenceDmo;
class BaseSchemaRelationDmo extends SQDIDmo {
    constructor() {
        super('SchemaRelation');
    }
}
exports.BaseSchemaRelationDmo = BaseSchemaRelationDmo;
class BaseSchemaRelationColumnDmo extends SQDIDmo {
    constructor() {
        super('SchemaRelationColumn');
    }
}
exports.BaseSchemaRelationColumnDmo = BaseSchemaRelationColumnDmo;
class BaseSchemaVersionDmo extends SQDIDmo {
    constructor() {
        super('SchemaVersion');
    }
}
exports.BaseSchemaVersionDmo = BaseSchemaVersionDmo;
class BaseVersionedSchemaObjectDmo extends SQDIDmo {
    constructor() {
        super('VersionedSchemaObject');
    }
}
exports.BaseVersionedSchemaObjectDmo = BaseVersionedSchemaObjectDmo;
//# sourceMappingURL=baseDmos.js.map