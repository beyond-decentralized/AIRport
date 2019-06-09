"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const schema_1 = require("../ddl/schema/schema");
const schemacolumn_1 = require("../ddl/schema/schemacolumn");
const schemaentity_1 = require("../ddl/schema/schemaentity");
const schemaproperty_1 = require("../ddl/schema/schemaproperty");
const schemapropertycolumn_1 = require("../ddl/schema/schemapropertycolumn");
const schemareference_1 = require("../ddl/schema/schemareference");
const schemarelation_1 = require("../ddl/schema/schemarelation");
const schemarelationcolumn_1 = require("../ddl/schema/schemarelationcolumn");
const schemaversion_1 = require("../ddl/schema/schemaversion");
const versionedschemaobject_1 = require("../ddl/schema/versionedschemaobject");
const __constructors__ = {
    Schema: schema_1.Schema,
    SchemaColumn: schemacolumn_1.SchemaColumn,
    SchemaEntity: schemaentity_1.SchemaEntity,
    SchemaProperty: schemaproperty_1.SchemaProperty,
    SchemaPropertyColumn: schemapropertycolumn_1.SchemaPropertyColumn,
    SchemaReference: schemareference_1.SchemaReference,
    SchemaRelation: schemarelation_1.SchemaRelation,
    SchemaRelationColumn: schemarelationcolumn_1.SchemaRelationColumn,
    SchemaVersion: schemaversion_1.SchemaVersion,
    VersionedSchemaObject: versionedschemaobject_1.VersionedSchemaObject
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/traffic-pattern'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
di_1.DI.get((airportDatabase) => {
    airportDatabase.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
}, air_control_1.AIR_DB);
//# sourceMappingURL=qSchema.js.map