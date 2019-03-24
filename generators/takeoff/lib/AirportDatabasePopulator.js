"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("./diTokens");
class AirportDatabasePopulator {
    constructor() {
        di_1.DI.get((airportDatabase) => {
            this.airDb = airportDatabase;
        }, air_control_1.AIR_DB);
    }
    populate() {
        this.airDb.schemas;
        this.airDb.schemaMapByName;
        this.airDb.qSchemas;
        this.airDb.qSchemaMapByName;
    }
}
exports.AirportDatabasePopulator = AirportDatabasePopulator;
di_1.DI.set(diTokens_1.AIR_DB_POPULATOR, AirportDatabasePopulator);
//# sourceMappingURL=AirportDatabasePopulator.js.map