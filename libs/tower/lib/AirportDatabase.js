"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const typedi_1 = require("typedi");
let AirportDatabase = class AirportDatabase {
    constructor() {
        this.databaseMap = {};
        this.dbNames = [];
        this.dbNameSet = {};
        this.schemaTuples = [];
        this.currentDbName = air_control_1.dbConst.DEFAULT_DB;
    }
    registerDatabase(facade) {
        if (!this.dbNameSet[facade.name]) {
            this.dbNames.push(facade.name);
        }
        this.databaseMap[facade.name] = facade;
        this.dbNameSet[facade.name] = true;
    }
    registerSchema(schema, qSchema) {
        this.schemaTuples.push([schema, qSchema]);
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
};
AirportDatabase = __decorate([
    typedi_1.Service(air_control_1.AirportDatabaseToken)
], AirportDatabase);
exports.AirportDatabase = AirportDatabase;
//# sourceMappingURL=AirportDatabase.js.map