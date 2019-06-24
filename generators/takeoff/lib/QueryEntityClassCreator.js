"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("./diTokens");
class QueryEntityClassCreator {
    createAll(schemas, airDb) {
        const schemasToCreate = air_control_1.orderSchemasInOrderOfPrecedence(schemas);
        schemasToCreate.map(dbSchema => this.create(dbSchema, airDb));
    }
    create(dbSchema, airDb) {
        let qSchema = airDb.QM[dbSchema.name];
        // If the Schema API source has already been loaded
        if (qSchema) {
            qSchema.__dbSchema__ = dbSchema;
        }
        else {
            qSchema = {
                __constructors__: {},
                __qConstructors__: {},
                __dbSchema__: dbSchema,
                name: dbSchema.name,
                domain: dbSchema.domain.name
            };
            airDb.QM[dbSchema.name] = qSchema;
        }
        airDb.Q[dbSchema.index] = qSchema;
        air_control_1.setQSchemaEntities(dbSchema, qSchema, airDb.qSchemas);
        return qSchema;
    }
}
exports.QueryEntityClassCreator = QueryEntityClassCreator;
di_1.DI.set(diTokens_1.QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator);
//# sourceMappingURL=QueryEntityClassCreator.js.map