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
    /*constructor() {
        DI.get((
            airportDatabase,
            activeQueries,
            utils
        ) => {
            this.airDb   = airportDatabase
            this.queries = activeQueries
            this.utils   = utils
        }, AIR_DB, ACTIVE_QUERIES, UTILS)
    }*/
    supportsLocalTransactions() {
        return true;
    }
    async saveTransaction(transaction) {
        (await di_1.DI.get(diTokens_1.ACTIVE_QUERIES)).markQueriesToRerun(transaction.schemaMap);
    }
    async insertValues(portableQuery) {
        const splitValues = this.splitValues(portableQuery.jsonQuery.V);
        const [airDb, schemaUtils, metadataUtils] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.SCHEMA_UTILS, air_control_1.Q_METADATA_UTILS);
        let numVals = 0;
        for (const V of splitValues) {
            let sqlInsertValues = new SQLInsertValues_1.SQLInsertValues(airDb, {
                ...portableQuery.jsonQuery,
                V
            }, this.getDialect());
            let sql = sqlInsertValues.toSQL(airDb, schemaUtils, metadataUtils);
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
        const [airDb, schemaUtils, metadataUtils, activeQueries] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.SCHEMA_UTILS, air_control_1.Q_METADATA_UTILS, diTokens_1.ACTIVE_QUERIES);
        let fieldMap = new ground_control_1.SyncSchemaMap();
        let sqlDelete = new SQLDelete_1.SQLDelete(airDb, portableQuery.jsonQuery, this.getDialect());
        let sql = sqlDelete.toSQL(airDb, schemaUtils, metadataUtils);
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters);
        activeQueries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery) {
        const [airDb, schemaUtils, metadataUtils] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.SCHEMA_UTILS, air_control_1.Q_METADATA_UTILS);
        let sqlUpdate = new SQLUpdate_1.SQLUpdate(airDb, portableQuery.jsonQuery, this.getDialect());
        let sql = sqlUpdate.toSQL(airDb, schemaUtils, metadataUtils);
        let parameters = sqlUpdate.getParameters(portableQuery.parameterMap);
        return await this.executeNative(sql, parameters);
    }
    async find(portableQuery, cachedSqlQueryId) {
        const [airDb, schemaUtils, metadataUtils] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.SCHEMA_UTILS, air_control_1.Q_METADATA_UTILS);
        const sqlQuery = this.getSQLQuery(portableQuery, airDb, schemaUtils);
        const sql = sqlQuery.toSQL(airDb, schemaUtils, metadataUtils);
        const parameters = sqlQuery.getParameters(portableQuery.parameterMap);
        let results = await this.findNative(sql, parameters);
        results = sqlQuery.parseQueryResults(airDb, schemaUtils, results, portableQuery.queryResultType);
        // FIXME: convert to MappedEntityArray if needed
        return results;
    }
    getSQLQuery(portableQuery, airDb, schemaUtils) {
        let jsonQuery = portableQuery.jsonQuery;
        let dialect = this.getDialect();
        let resultType = portableQuery.queryResultType;
        const QueryResType = ground_control_1.QueryResultType;
        switch (resultType) {
            case QueryResType.ENTITY_GRAPH:
            case QueryResType.ENTITY_TREE:
            case QueryResType.MAPPED_ENTITY_GRAPH:
            case QueryResType.MAPPED_ENTITY_TREE:
                const dbEntity = airDb.schemas[portableQuery.schemaIndex]
                    .currentVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery_1.EntitySQLQuery(jsonQuery, dbEntity, dialect, resultType, schemaUtils);
            case QueryResType.FIELD:
                return new FieldSQLQuery_1.FieldSQLQuery(jsonQuery, dialect);
            case QueryResType.SHEET:
                return new SheetSQLQuery_1.SheetSQLQuery(jsonQuery, dialect);
            case QueryResType.TREE:
                return new TreeSQLQuery_1.TreeSQLQuery(jsonQuery, dialect);
            case QueryResType.RAW:
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
                di_1.DI.get(diTokens_1.ACTIVE_QUERIES).then(activeQueries => 
                // Remove the query for the list of cached queries, that are checked every
                // time a mutation operation is run
                activeQueries.remove(portableQuery));
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
                di_1.DI.get(diTokens_1.ACTIVE_QUERIES).then(activeQueries => 
                // Remove the query for the list of cached queries, that are checked every
                // time a mutation operation is run
                activeQueries.remove(portableQuery));
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