"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const diTokens_1 = require("../diTokens");
const SQLDelete_1 = require("../sql/core/SQLDelete");
const SQLInsertValues_1 = require("../sql/core/SQLInsertValues");
const SQLUpdate_1 = require("../sql/core/SQLUpdate");
const EntitySQLQuery_1 = require("../sql/EntitySQLQuery");
const FieldSQLQuery_1 = require("../sql/FieldSQLQuery");
const SheetSQLQuery_1 = require("../sql/SheetSQLQuery");
const TreeSQLQuery_1 = require("../sql/TreeSQLQuery");
/**
 * Created by Papa on 9/9/2016.
 */
class SqlDriver {
    constructor() {
        di_1.DI.get((airportDatabase, activeQueries, utils) => {
            this.airDb = airportDatabase;
            this.queries = activeQueries;
            this.utils = utils;
        }, air_control_1.AIR_DB, diTokens_1.ACTIVE_QUERIES, air_control_1.UTILS);
    }
    supportsLocalTransactions() {
        return true;
    }
    async saveTransaction(transaction) {
        this.queries.markQueriesToRerun(transaction.schemaMap);
    }
    async insertValues(portableQuery) {
        const splitValues = this.splitValues(portableQuery.jsonQuery.V);
        let numVals = 0;
        for (const V of splitValues) {
            let sqlInsertValues = new SQLInsertValues_1.SQLInsertValues(this.airDb, this.utils, {
                ...portableQuery.jsonQuery,
                V
            }, this.getDialect());
            let sql = sqlInsertValues.toSQL();
            let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap);
            numVals += await this.executeNative(sql, parameters);
        }
        return numVals;
    }
    splitValues(values) {
        const valuesInRow = values[0].length;
        const numValues = values.length * valuesInRow;
        if (numValues <= this.maxValues) {
            return [values];
        }
        let numRowsPerBatch = Math.floor(this.maxValues / valuesInRow);
        const splitValues = [];
        for (let i = 0; i < values.length; i += numRowsPerBatch) {
            const aSplitValues = values.slice(i, i + numRowsPerBatch);
            splitValues.push(aSplitValues);
        }
        return splitValues;
    }
    async deleteWhere(portableQuery) {
        let fieldMap = new ground_control_1.SyncSchemaMap();
        let sqlDelete = new SQLDelete_1.SQLDelete(this.airDb, this.utils, portableQuery.jsonQuery, this.getDialect());
        let sql = sqlDelete.toSQL();
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters);
        this.queries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery) {
        let sqlUpdate = new SQLUpdate_1.SQLUpdate(this.airDb, this.utils, portableQuery.jsonQuery, this.getDialect());
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
                const dbEntity = this.airDb.schemas[portableQuery.schemaIndex]
                    .currentVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery_1.EntitySQLQuery(this.airDb, this.utils, jsonQuery, dbEntity, dialect, resultType);
            case ground_control_1.QueryResultType.FIELD:
                return new FieldSQLQuery_1.FieldSQLQuery(this.airDb, this.utils, jsonQuery, dialect);
            case ground_control_1.QueryResultType.SHEET:
                return new SheetSQLQuery_1.SheetSQLQuery(this.airDb, this.utils, jsonQuery, dialect);
            case ground_control_1.QueryResultType.TREE:
                return new TreeSQLQuery_1.TreeSQLQuery(this.airDb, this.utils, jsonQuery, dialect);
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
        let resultsSubject = new observe_1.Subject(() => {
            if (resultsSubject.subscriptions.length < 1) {
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
        let resultsSubject = new observe_1.Subject(() => {
            if (resultsSubject.subscriptions.length < 1) {
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
}
exports.SqlDriver = SqlDriver;
//# sourceMappingURL=SqlDriver.js.map