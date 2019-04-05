"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var air_control_1 = require("@airport/air-control");
var di_1 = require("@airport/di");
var AirportDatabase = /** @class */ (function () {
    function AirportDatabase() {
        this.databaseMap = {};
        this.dbNames = [];
        this.dbNameSet = {};
        this.schemaTuples = [];
        this.currentDbName = air_control_1.dbConst.DEFAULT_DB;
    }
    AirportDatabase.prototype.registerDatabase = function (facade) {
        if (!this.dbNameSet[facade.name]) {
            this.dbNames.push(facade.name);
        }
        this.databaseMap[facade.name] = facade;
        this.dbNameSet[facade.name] = true;
    };
    AirportDatabase.prototype.registerSchema = function (schema, qSchema) {
        this.schemaTuples.push([schema, qSchema]);
    };
    AirportDatabase.prototype.setCurrentDb = function (dbName) {
        if (dbName === void 0) { dbName = air_control_1.dbConst.DEFAULT_DB; }
        this.currentDbName = dbName;
    };
    AirportDatabase.prototype.getDbNames = function () {
        return this.dbNames;
    };
    AirportDatabase.prototype.getDbNameSet = function () {
        return this.dbNameSet;
    };
    Object.defineProperty(AirportDatabase.prototype, "db", {
        get: function () {
            var database = this.databaseMap[this.currentDbName];
            if (!database) {
                throw "Did not find database '" + this.currentDbName + "'";
            }
            return database;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AirportDatabase.prototype, "find", {
        get: function () {
            return this.db.find;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AirportDatabase.prototype, "findOne", {
        get: function () {
            return this.db.findOne;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AirportDatabase.prototype, "search", {
        get: function () {
            return this.db.search;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AirportDatabase.prototype, "searchOne", {
        get: function () {
            return this.db.searchOne;
        },
        enumerable: true,
        configurable: true
    });
    return AirportDatabase;
}());
exports.AirportDatabase = AirportDatabase;
di_1.DI.set(air_control_1.AIR_DB, AirportDatabase);
