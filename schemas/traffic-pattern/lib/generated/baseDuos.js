"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseSchemaDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseSchemaDuo = BaseSchemaDuo;
class BaseSchemaColumnDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSchemaColumnDuo = BaseSchemaColumnDuo;
class BaseSchemaEntityDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseSchemaEntityDuo = BaseSchemaEntityDuo;
class BaseSchemaPropertyDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseSchemaPropertyDuo = BaseSchemaPropertyDuo;
class BaseSchemaPropertyColumnDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSchemaPropertyColumnDuo = BaseSchemaPropertyColumnDuo;
class BaseSchemaReferenceDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseSchemaReferenceDuo = BaseSchemaReferenceDuo;
class BaseSchemaRelationDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseSchemaRelationDuo = BaseSchemaRelationDuo;
class BaseSchemaRelationColumnDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSchemaRelationColumnDuo = BaseSchemaRelationColumnDuo;
class BaseSchemaVersionDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.diSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseSchemaVersionDuo = BaseSchemaVersionDuo;
//# sourceMappingURL=baseDuos.js.map