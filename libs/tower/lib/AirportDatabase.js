"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
class AirportDatabase {
    // private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
    // private dbNames: string[]                                        = []
    // private dbNameSet: { [databaseName: string]: boolean }           = {}
    // private currentDbName = dbConst.DEFAULT_DB
    constructor() {
        this.schemas = [];
        this.qSchemas = [];
        this.QM = {};
        this.S = this.schemas;
        this.Q = this.qSchemas;
        this.find = new air_control_1.NonEntityFind();
        this.findOne = new air_control_1.NonEntityFindOne();
        this.search = new air_control_1.NonEntitySearch();
        this.searchOne = new air_control_1.NonEntitySearchOne();
    }
}
exports.AirportDatabase = AirportDatabase;
di_1.DI.set(air_control_1.AIR_DB, AirportDatabase);
//# sourceMappingURL=AirportDatabase.js.map