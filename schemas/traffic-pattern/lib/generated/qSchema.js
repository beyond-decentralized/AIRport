"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const Schema_1 = require("../ddl/schema/Schema");
const SchemaColumn_1 = require("../ddl/schema/SchemaColumn");
const SchemaEntity_1 = require("../ddl/schema/SchemaEntity");
const SchemaProperty_1 = require("../ddl/schema/SchemaProperty");
const SchemaPropertyColumn_1 = require("../ddl/schema/SchemaPropertyColumn");
const SchemaReference_1 = require("../ddl/schema/SchemaReference");
const SchemaRelation_1 = require("../ddl/schema/SchemaRelation");
const SchemaRelationColumn_1 = require("../ddl/schema/SchemaRelationColumn");
const SchemaVersion_1 = require("../ddl/schema/SchemaVersion");
const VersionedSchemaObject_1 = require("../ddl/schema/VersionedSchemaObject");
const __constructors__ = {
    Schema: Schema_1.Schema,
    SchemaColumn: SchemaColumn_1.SchemaColumn,
    SchemaEntity: SchemaEntity_1.SchemaEntity,
    SchemaProperty: SchemaProperty_1.SchemaProperty,
    SchemaPropertyColumn: SchemaPropertyColumn_1.SchemaPropertyColumn,
    SchemaReference: SchemaReference_1.SchemaReference,
    SchemaRelation: SchemaRelation_1.SchemaRelation,
    SchemaRelationColumn: SchemaRelationColumn_1.SchemaRelationColumn,
    SchemaVersion: SchemaVersion_1.SchemaVersion,
    VersionedSchemaObject: VersionedSchemaObject_1.VersionedSchemaObject
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/traffic-pattern'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
function duoDiSet(dbEntityId) {
    return check_in_1.duoDiSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.duoDiSet = duoDiSet;
di_1.DI.db().get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map