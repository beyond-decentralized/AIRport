"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("./diTokens");
// TODO: probably not needed, included schema source populates itself
// May be needed to populate schemas from the database
class AirportDatabasePopulator {
    /*	private airDb: IAirportDatabase
    
        constructor() {
            DI.get((
                airportDatabase
            ) => {
                this.airDb = airportDatabase
            }, AIR_DB)
        }*/
    populate() {
        // FIXME: implement
        // this.airDb.schemas
        // this.airDb.qSchemas
    }
}
exports.AirportDatabasePopulator = AirportDatabasePopulator;
di_1.DI.set(diTokens_1.AIR_DB_POPULATOR, AirportDatabasePopulator);
//# sourceMappingURL=AirportDatabasePopulator.js.map