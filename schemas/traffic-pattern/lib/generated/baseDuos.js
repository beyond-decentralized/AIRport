"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseSchemaDuo extends SQDIDuo {
    constructor() {
        super('Schema');
    }
}
exports.BaseSchemaDuo = BaseSchemaDuo;
class BaseSchemaColumnDuo extends SQDIDuo {
    constructor() {
        super('SchemaColumn');
    }
}
exports.BaseSchemaColumnDuo = BaseSchemaColumnDuo;
class BaseSchemaEntityDuo extends SQDIDuo {
    constructor() {
        super('SchemaEntity');
    }
}
exports.BaseSchemaEntityDuo = BaseSchemaEntityDuo;
class BaseSchemaPropertyDuo extends SQDIDuo {
    constructor() {
        super('SchemaProperty');
    }
}
exports.BaseSchemaPropertyDuo = BaseSchemaPropertyDuo;
class BaseSchemaPropertyColumnDuo extends SQDIDuo {
    constructor() {
        super('SchemaPropertyColumn');
    }
}
exports.BaseSchemaPropertyColumnDuo = BaseSchemaPropertyColumnDuo;
class BaseSchemaReferenceDuo extends SQDIDuo {
    constructor() {
        super('SchemaReference');
    }
}
exports.BaseSchemaReferenceDuo = BaseSchemaReferenceDuo;
class BaseSchemaRelationDuo extends SQDIDuo {
    constructor() {
        super('SchemaRelation');
    }
}
exports.BaseSchemaRelationDuo = BaseSchemaRelationDuo;
class BaseSchemaRelationColumnDuo extends SQDIDuo {
    constructor() {
        super('SchemaRelationColumn');
    }
}
exports.BaseSchemaRelationColumnDuo = BaseSchemaRelationColumnDuo;
class BaseSchemaVersionDuo extends SQDIDuo {
    constructor() {
        super('SchemaVersion');
    }
}
exports.BaseSchemaVersionDuo = BaseSchemaVersionDuo;
class BaseVersionedSchemaObjectDuo extends SQDIDuo {
    constructor() {
        super('VersionedSchemaObject');
    }
}
exports.BaseVersionedSchemaObjectDuo = BaseVersionedSchemaObjectDuo;
//# sourceMappingURL=baseDuos.js.map