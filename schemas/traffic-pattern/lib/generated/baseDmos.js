"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseSchemaDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Schema']);
    }
}
exports.BaseSchemaDmo = BaseSchemaDmo;
class BaseSchemaColumnDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaColumn']);
    }
}
exports.BaseSchemaColumnDmo = BaseSchemaColumnDmo;
class BaseSchemaEntityDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaEntity']);
    }
}
exports.BaseSchemaEntityDmo = BaseSchemaEntityDmo;
class BaseSchemaPropertyDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaProperty']);
    }
}
exports.BaseSchemaPropertyDmo = BaseSchemaPropertyDmo;
class BaseSchemaPropertyColumnDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaPropertyColumn']);
    }
}
exports.BaseSchemaPropertyColumnDmo = BaseSchemaPropertyColumnDmo;
class BaseSchemaReferenceDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaReference']);
    }
}
exports.BaseSchemaReferenceDmo = BaseSchemaReferenceDmo;
class BaseSchemaRelationDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaRelation']);
    }
}
exports.BaseSchemaRelationDmo = BaseSchemaRelationDmo;
class BaseSchemaRelationColumnDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaRelationColumn']);
    }
}
exports.BaseSchemaRelationColumnDmo = BaseSchemaRelationColumnDmo;
class BaseSchemaVersionDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SchemaVersion']);
    }
}
exports.BaseSchemaVersionDmo = BaseSchemaVersionDmo;
class BaseVersionedSchemaObjectDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['VersionedSchemaObject']);
    }
}
exports.BaseVersionedSchemaObjectDmo = BaseVersionedSchemaObjectDmo;
//# sourceMappingURL=baseDmos.js.map