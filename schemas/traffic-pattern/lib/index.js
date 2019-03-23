"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("./diTokens");
const qSchema_1 = require("./generated/qSchema");
const schema_1 = require("./generated/schema");
__export(require("./dao/dao"));
__export(require("./ddl/ddl"));
__export(require("./generated/generated"));
__export(require("./diTokens"));
class AtAirport_TrafficPattern_QSchema {
    constructor() {
        di_1.DI.get((airportDatabase, dao, dbSchemaUtils, dmo) => {
            this.dao = dao;
            this.dmo = dmo;
            this.init(airportDatabase, dbSchemaUtils);
        }, air_control_1.AIR_DB, diTokens_1.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS, ground_control_1.DB_SCHEMA_UTILS, diTokens_1.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DMOS);
    }
    init(airDb, dbSchemaUtils) {
        const schemaName = dbSchemaUtils.getSchemaName(schema_1.SCHEMA);
        this.__constructors__ = qSchema_1.Q_SCHEMA.__constructors;
        qSchema_1.Q_SCHEMA.dao = this.dao;
        qSchema_1.Q_SCHEMA.dmo = this.dmo;
        qSchema_1.Q_SCHEMA.__exported__ = qSchema_1.Q_SCHEMA;
        qSchema_1.Q_SCHEMA.__injected__ = this;
        this.__injected__ = this;
        this.__exported__ = qSchema_1.Q_SCHEMA;
        const existingQSchema = airDb.qSchemaMapByName[schemaName];
        // If '@airport/takeoff' has already run
        if (existingQSchema) {
            qSchema_1.Q_SCHEMA.__created__ = existingQSchema;
            this.__created__ = existingQSchema;
            existingQSchema.__injected__ = this;
            existingQSchema.__exported__ = qSchema_1.Q_SCHEMA;
            existingQSchema.__created__ = existingQSchema;
            existingQSchema.dao = this.dao;
            existingQSchema.dmo = this.dmo;
            existingQSchema.__constructors__ = qSchema_1.Q_SCHEMA.__constructors;
            air_control_1.setQSchemaEntities(existingQSchema.__dbSchema__, this, airDb.qSchemas);
            air_control_1.setQSchemaEntities(existingQSchema.__dbSchema__, qSchema_1.Q_SCHEMA, airDb.qSchemas);
        }
        else {
            qSchema_1.Q_SCHEMA.__created__ = qSchema_1.Q_SCHEMA;
            this.__created__ = qSchema_1.Q_SCHEMA;
            airDb.qSchemaMapByName[schemaName] = qSchema_1.Q_SCHEMA;
        }
    }
}
exports.AtAirport_TrafficPattern_QSchema = AtAirport_TrafficPattern_QSchema;
di_1.DI.set(diTokens_1.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA, AtAirport_TrafficPattern_QSchema);
//# sourceMappingURL=index.js.map