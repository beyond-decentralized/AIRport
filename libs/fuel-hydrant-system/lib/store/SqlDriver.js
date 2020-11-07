import { AIR_DB, Q_METADATA_UTILS, SCHEMA_UTILS } from '@airport/air-control';
import { container } from '@airport/di';
import { getSchemaName, QueryResultType, SyncSchemaMap } from '@airport/ground-control';
import { Subject } from '@airport/observe';
import { SQLDelete } from '../sql/core/SQLDelete';
import { SQLInsertValues } from '../sql/core/SQLInsertValues';
import { SQLUpdate } from '../sql/core/SQLUpdate';
import { EntitySQLQuery } from '../sql/EntitySQLQuery';
import { FieldSQLQuery } from '../sql/FieldSQLQuery';
import { SheetSQLQuery } from '../sql/SheetSQLQuery';
import { TreeSQLQuery } from '../sql/TreeSQLQuery';
import { ACTIVE_QUERIES } from '../tokens';
/**
 * Created by Papa on 9/9/2016.
 */
export class SqlDriver {
    supportsLocalTransactions() {
        return true;
    }
    getEntityTableName(dbEntity) {
        return this.getTableName(dbEntity.schemaVersion.schema, dbEntity);
    }
    getTableName(schema, table) {
        let theTableName = table.name;
        if (table.tableConfig && table.tableConfig.name) {
            theTableName = table.tableConfig.name;
        }
        let schemaName;
        if (schema.status || schema.status === 0) {
            schemaName = schema.name;
        }
        else {
            schemaName = getSchemaName(schema);
        }
        return this.composeTableName(schemaName, theTableName);
    }
    async insertValues(portableQuery) {
        const splitValues = this.splitValues(portableQuery.jsonQuery.V);
        const [airDb, schemaUtils, metadataUtils] = await container(this)
            .get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS);
        let numVals = 0;
        for (const V of splitValues) {
            let sqlInsertValues = new SQLInsertValues(airDb, {
                ...portableQuery.jsonQuery,
                V
            }, this.getDialect(), this);
            let sql = sqlInsertValues.toSQL(airDb, schemaUtils, metadataUtils);
            let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap);
            numVals += await this.executeNative(sql, parameters);
        }
        return numVals;
    }
    async deleteWhere(portableQuery) {
        const [airDb, schemaUtils, metadataUtils, activeQueries] = await container(this)
            .get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS, ACTIVE_QUERIES);
        let fieldMap = new SyncSchemaMap();
        let sqlDelete = new SQLDelete(airDb, portableQuery.jsonQuery, this.getDialect(), this);
        let sql = sqlDelete.toSQL(airDb, schemaUtils, metadataUtils);
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters);
        activeQueries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery, internalFragments) {
        const [airDb, schemaUtils, metadataUtils] = await container(this)
            .get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS);
        let sqlUpdate = new SQLUpdate(airDb, portableQuery.jsonQuery, this.getDialect(), this);
        let sql = sqlUpdate.toSQL(internalFragments, airDb, schemaUtils, metadataUtils);
        let parameters = sqlUpdate.getParameters(portableQuery.parameterMap);
        return await this.executeNative(sql, parameters);
    }
    async find(portableQuery, internalFragments, cachedSqlQueryId) {
        const [airDb, schemaUtils, metadataUtils] = await container(this)
            .get(AIR_DB, SCHEMA_UTILS, Q_METADATA_UTILS);
        const sqlQuery = this.getSQLQuery(portableQuery, airDb, schemaUtils);
        const sql = sqlQuery.toSQL(internalFragments, airDb, schemaUtils, metadataUtils);
        const parameters = sqlQuery.getParameters(portableQuery.parameterMap);
        let results = await this.findNative(sql, parameters);
        results = await sqlQuery.parseQueryResults(airDb, schemaUtils, results, internalFragments, portableQuery.queryResultType);
        // FIXME: convert to MappedEntityArray if needed
        return results;
    }
    getSQLQuery(portableQuery, airDb, schemaUtils) {
        let jsonQuery = portableQuery.jsonQuery;
        let dialect = this.getDialect();
        let resultType = portableQuery.queryResultType;
        const QueryResType = QueryResultType;
        switch (resultType) {
            case QueryResType.ENTITY_GRAPH:
            case QueryResType.ENTITY_TREE:
            case QueryResType.MAPPED_ENTITY_GRAPH:
            case QueryResType.MAPPED_ENTITY_TREE:
                const dbEntity = airDb.schemas[portableQuery.schemaIndex]
                    .currentVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery(jsonQuery, dbEntity, dialect, resultType, schemaUtils, this);
            case QueryResType.FIELD:
                return new FieldSQLQuery(jsonQuery, dialect, this);
            case QueryResType.SHEET:
                return new SheetSQLQuery(jsonQuery, dialect, this);
            case QueryResType.TREE:
                return new TreeSQLQuery(jsonQuery, dialect, this);
            case QueryResType.RAW:
            default:
                throw new Error(`Unknown QueryResultType: ${resultType}`);
        }
    }
    async findOne(portableQuery, internalFragments, cachedSqlQueryId) {
        let results = await this.find(portableQuery, internalFragments);
        if (results.length > 1) {
            throw new Error(`Expecting a single result, got ${results.length}`);
        }
        if (results.length == 1) {
            return results[0];
        }
        return null;
    }
    search(portableQuery, internalFragments, cachedSqlQueryId) {
        let resultsSubject = new Subject(() => {
            if (resultsSubject.subscriptions.length < 1) {
                container(this)
                    .get(ACTIVE_QUERIES)
                    .then(activeQueries => 
                // Remove the query for the list of cached queries, that are checked every
                // time a mutation operation is run
                activeQueries.remove(portableQuery));
            }
        });
        let cachedSqlQuery = {
            resultsSubject: resultsSubject,
            runQuery: () => {
                this.find(portableQuery, internalFragments)
                    .then((results) => {
                    // FIXME: convert to MappedEntityArray if needed
                    resultsSubject.next(results);
                });
            }
        };
        // this.queries.add(portableQuery, cachedSqlQuery);
        cachedSqlQuery.runQuery();
        return resultsSubject;
    }
    searchOne(portableQuery, internalFragments, cachedSqlQueryId) {
        let resultsSubject = new Subject(() => {
            if (resultsSubject.subscriptions.length < 1) {
                container(this)
                    .get(ACTIVE_QUERIES)
                    .then(activeQueries => 
                // Remove the query for the list of cached queries, that are checked every
                // time a mutation operation is run
                activeQueries.remove(portableQuery));
            }
        });
        let cachedSqlQuery = {
            resultsSubject: resultsSubject,
            runQuery: () => {
                this.findOne(portableQuery, internalFragments)
                    .then((result) => {
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
}
//# sourceMappingURL=SqlDriver.js.map