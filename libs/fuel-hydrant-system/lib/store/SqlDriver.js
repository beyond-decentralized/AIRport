"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
const SQLDelete_1 = require("../sql/core/SQLDelete");
const SQLInsertValues_1 = require("../sql/core/SQLInsertValues");
const SQLUpdate_1 = require("../sql/core/SQLUpdate");
const EntitySQLQuery_1 = require("../sql/EntitySQLQuery");
const FieldSQLQuery_1 = require("../sql/FieldSQLQuery");
const SheetSQLQuery_1 = require("../sql/SheetSQLQuery");
const TreeSQLQuery_1 = require("../sql/TreeSQLQuery");
const ActiveQueries_1 = require("./ActiveQueries");
/**
 * Created by Papa on 9/9/2016.
 */
let SqlDriver = class SqlDriver {
    constructor(airportDb, utils, queries) {
        this.airportDb = airportDb;
        this.utils = utils;
        this.queries = queries;
    }
    supportsLocalTransactions() {
        return true;
    }
    async saveTransaction(transaction) {
        this.queries.markQueriesToRerun(transaction.schemaMap);
    }
    async insertValues(portableQuery) {
        let sqlInsertValues = new SQLInsertValues_1.SQLInsertValues(this.airportDb, this.utils, portableQuery.jsonQuery, this.getDialect());
        let sql = sqlInsertValues.toSQL();
        let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap);
        return await this.executeNative(sql, parameters);
    }
    async deleteWhere(portableQuery) {
        let fieldMap = new ground_control_1.SyncSchemaMap();
        let sqlDelete = new SQLDelete_1.SQLDelete(this.airportDb, this.utils, portableQuery.jsonQuery, this.getDialect());
        let sql = sqlDelete.toSQL();
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters);
        this.queries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery) {
        let sqlUpdate = new SQLUpdate_1.SQLUpdate(this.airportDb, this.utils, portableQuery.jsonQuery, this.getDialect());
        let sql = sqlUpdate.toSQL();
        let parameters = sqlUpdate.getParameters(portableQuery.parameterMap);
        return await this.executeNative(sql, parameters);
    }
    async find(portableQuery, cachedSqlQueryId) {
        const sqlQuery = this.getSQLQuery(portableQuery);
        const sql = sqlQuery.toSQL();
        const parameters = sqlQuery.getParameters(portableQuery.parameterMap);
        let results = await this.findNative(sql, parameters);
        results = sqlQuery.parseQueryResults(results, portableQuery.queryResultType);
        // FIXME: convert to MappedEntityArray if needed
        return results;
    }
    getSQLQuery(portableQuery) {
        let jsonQuery = portableQuery.jsonQuery;
        let dialect = this.getDialect();
        let resultType = portableQuery.queryResultType;
        switch (resultType) {
            case ground_control_1.QueryResultType.ENTITY_GRAPH:
            case ground_control_1.QueryResultType.ENTITY_TREE:
                const dbEntity = this.airportDb.schemas[portableQuery.schemaIndex]
                    .currentVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery_1.EntitySQLQuery(this.airportDb, this.utils, jsonQuery, dbEntity, dialect, resultType);
            case ground_control_1.QueryResultType.FIELD:
                return new FieldSQLQuery_1.FieldSQLQuery(this.airportDb, this.utils, jsonQuery, dialect);
            case ground_control_1.QueryResultType.SHEET:
                return new SheetSQLQuery_1.SheetSQLQuery(this.airportDb, this.utils, jsonQuery, dialect);
            case ground_control_1.QueryResultType.TREE:
                return new TreeSQLQuery_1.TreeSQLQuery(this.airportDb, this.utils, jsonQuery, dialect);
            default:
                throw `Unknown QueryResultType: ${resultType}`;
        }
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        let results = await this.find(portableQuery);
        if (results.length > 1) {
            throw `Expecting a single result, got ${results.length}`;
        }
        if (results.length == 1) {
            return results[0];
        }
        return null;
    }
    search(portableQuery, cachedSqlQueryId) {
        let resultsSubject = new air_control_1.QuerySubject(() => {
            if (resultsSubject.observers.length < 1) {
                // Remove the query for the list of cached queries, that are checked every time a
                // mutation operation is run
                this.queries.remove(portableQuery);
            }
        });
        let cachedSqlQuery = {
            resultsSubject: resultsSubject,
            runQuery: () => {
                this.find(portableQuery).then((results) => {
                    // FIXME: convert to MappedEntityArray if needed
                    resultsSubject.next(results);
                });
            }
        };
        // this.queries.add(portableQuery, cachedSqlQuery);
        cachedSqlQuery.runQuery();
        return resultsSubject;
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        let resultsSubject = new air_control_1.QuerySubject(() => {
            if (resultsSubject.observers.length < 1) {
                // Remove the query for the list of cached queries, that are checked every time a
                // mutation operation is run
                this.queries.remove(portableQuery);
            }
        });
        let cachedSqlQuery = {
            resultsSubject: resultsSubject,
            runQuery: () => {
                this.findOne(portableQuery).then((result) => {
                    resultsSubject.next(result);
                });
            }
        };
        // this.queries.add(portableQuery, cachedSqlQuery);
        cachedSqlQuery.runQuery();
        return resultsSubject;
    }
    warn(message) {
        console.log(message);
    }
};
SqlDriver = __decorate([
    typedi_1.Service(ground_control_1.StoreDriverToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __param(2, typedi_1.Inject(InjectionTokens_1.ActiveQueriesToken)),
    __metadata("design:paramtypes", [Object, Object, ActiveQueries_1.ActiveQueries])
], SqlDriver);
exports.SqlDriver = SqlDriver;
//# sourceMappingURL=SqlDriver.js.map