"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("./diTokens");
class QueryEntityClassCreator {
    constructor() {
        di_1.DI.get((airportDatabase, utils, dbSchemaUtils) => {
            this.airDb = airportDatabase;
            this.utils = utils;
            this.dbSchemaUtils = dbSchemaUtils;
        }, air_control_1.AIR_DB, air_control_1.UTILS, ground_control_1.DB_SCHEMA_UTILS);
    }
    createAll(schemas) {
        const schemasToCreate = air_control_1.orderSchemasInOrderOfPrecedence(schemas);
        schemasToCreate.map(dbSchema => this.create(dbSchema));
    }
    create(dbSchema) {
        let qSchema = this.airDb.qSchemaMapByName[dbSchema.name];
        // If the Schema API source has already been loaded
        if (qSchema) {
            qSchema.__dbSchema__ = dbSchema;
            qSchema.__injected__.__dbSchema__ = dbSchema;
            air_control_1.setQSchemaEntities(dbSchema, qSchema.__injected__, this.airDb.qSchemas);
        }
        else {
            qSchema = {
                __constructors__: {},
                __qConstructors__: {},
                __dbSchema__: dbSchema
            };
            this.airDb.qSchemaMapByName[dbSchema.name] = qSchema;
        }
        this.airDb.qSchemas[dbSchema.index] = qSchema;
        air_control_1.setQSchemaEntities(dbSchema, qSchema, this.airDb.qSchemas);
        return qSchema;
    }
}
exports.QueryEntityClassCreator = QueryEntityClassCreator;
di_1.DI.set(diTokens_1.QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator);
//# sourceMappingURL=QueryEntityClassCreator.js.map