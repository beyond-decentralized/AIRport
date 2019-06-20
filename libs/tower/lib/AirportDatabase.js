"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const air_control_2 = require("@airport/air-control");
const air_control_3 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class AirportDatabase {
    constructor() {
        this.schemas = [];
        this.qSchemas = [];
        this.QM = {};
        this.databaseMap = {};
        this.dbNames = [];
        this.dbNameSet = {};
        this.currentDbName = air_control_1.dbConst.DEFAULT_DB;
        this.S = this.schemas;
        this.Q = this.qSchemas;
    }
    registerDatabase(facade) {
        if (!this.dbNameSet[facade.name]) {
            this.dbNames.push(facade.name);
        }
        this.databaseMap[facade.name] = facade;
        this.dbNameSet[facade.name] = true;
    }
    async registerQSchemas(qSchemas) {
        for (const qSchema of qSchemas) {
            const schemaName = ground_control_1.getSchemaName(qSchema);
            this.QM[schemaName] = qSchema;
        }
    }
    setCurrentDb(dbName = air_control_1.dbConst.DEFAULT_DB) {
        this.currentDbName = dbName;
    }
    getDbNames() {
        return this.dbNames;
    }
    getDbNameSet() {
        return this.dbNameSet;
    }
    get db() {
        let database = this.databaseMap[this.currentDbName];
        if (!database) {
            throw `Did not find database '${this.currentDbName}'`;
        }
        return database;
    }
    get find() {
        return this.db.find;
    }
    get findOne() {
        return this.db.findOne;
    }
    get search() {
        return this.db.search;
    }
    get searchOne() {
        return this.db.searchOne;
    }
    async findAsField(rawFieldQuery) {
        const nonEntityFind = await di_1.DI.get(air_control_2.NON_ENTITY_FIND);
        return await nonEntityFind.field(rawFieldQuery);
    }
    findOneAsField(rawFieldQuery) {
        const nonEntityFindOne = await di_1.DI.get(air_control_3.NON_ENTITY_FIND_ONE);
        return await nonEntityFindOne.field(rawFieldQuery);
    }
    findAsSheet(rawSheetQuery, cursorSize, callback) {
        const nonEntityFind = await di_1.DI.get(air_control_2.NON_ENTITY_FIND);
        return await nonEntityFind.sheet(rawSheetQuery);
    }
    findOneAsSheet(rawSheetQuery, cursorSize, callback) {
        const nonEntityFindOne = await di_1.DI.get(air_control_3.NON_ENTITY_FIND_ONE);
        return await nonEntityFindOne.sheet(rawSheetQuery);
    }
    findAsTree(rawTreeQuery) {
        const nonEntityFind = await di_1.DI.get(air_control_2.NON_ENTITY_FIND);
        return await nonEntityFind.tree(rawTreeQuery);
    }
    findOneAsTree(rawTreeQuery) {
        const nonEntityFindOne = await di_1.DI.get(air_control_3.NON_ENTITY_FIND_ONE);
        return await nonEntityFindOne.tree(rawTreeQuery);
    }
}
exports.AirportDatabase = AirportDatabase;
di_1.DI.set(air_control_1.AIR_DB, AirportDatabase);
//# sourceMappingURL=AirportDatabase.js.map