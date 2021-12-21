import { doEnsureContext } from '@airport/air-control';
import { container } from '@airport/di';
import { getFullApplicationName, QueryResultType, SyncApplicationMap, } from '@airport/ground-control';
import { Subject } from 'rxjs';
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control';
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
    supportsLocalTransactions(context) {
        return true;
    }
    getEntityTableName(dbEntity, context) {
        return this.getTableName(dbEntity.applicationVersion.application, dbEntity, context);
    }
    getTableName(application, table, context) {
        let theTableName = table.name;
        if (table.tableConfig && table.tableConfig.name) {
            theTableName = table.tableConfig.name;
        }
        let fullApplicationName;
        if (application.fullName) {
            fullApplicationName = application.fullName;
        }
        else {
            fullApplicationName = getFullApplicationName(application);
        }
        return this.composeTableName(fullApplicationName, theTableName, context);
    }
    async insertValues(portableQuery, context, cachedSqlQueryId) {
        const splitValues = this.splitValues(portableQuery.jsonQuery.V, context);
        let numVals = 0;
        for (const V of splitValues) {
            let sqlInsertValues = new SQLInsertValues({
                ...portableQuery.jsonQuery,
                V
            }, this.getDialect(context), context);
            let sql = sqlInsertValues.toSQL(context);
            let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap, context);
            numVals += await this.executeNative(sql, parameters, context);
        }
        return numVals;
    }
    async deleteWhere(portableQuery, context) {
        const activeQueries = await container(this)
            .get(ACTIVE_QUERIES);
        let fieldMap = new SyncApplicationMap();
        let sqlDelete = new SQLDelete(portableQuery.jsonQuery, this.getDialect(context), context);
        let sql = sqlDelete.toSQL(context);
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap, context);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters, context);
        activeQueries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery, internalFragments, context) {
        let sqlUpdate = new SQLUpdate(portableQuery.jsonQuery, this.getDialect(context), context);
        let sql = sqlUpdate.toSQL(internalFragments, context);
        let parameters = sqlUpdate.getParameters(portableQuery.parameterMap, context);
        return await this.executeNative(sql, parameters, context);
    }
    async find(portableQuery, internalFragments, context, cachedSqlQueryId) {
        context = await this.ensureContext(context);
        const sqlQuery = this.getSQLQuery(portableQuery, context);
        const sql = sqlQuery.toSQL(internalFragments, context);
        const parameters = sqlQuery.getParameters(portableQuery.parameterMap, context);
        let results = await this.findNative(sql, parameters, context);
        results = await sqlQuery.parseQueryResults(results, internalFragments, portableQuery.queryResultType, context);
        // FIXME: convert to MappedEntityArray if needed
        return results;
    }
    getSQLQuery(portableQuery, context) {
        let jsonQuery = portableQuery.jsonQuery;
        let dialect = this.getDialect(context);
        let resultType = portableQuery.queryResultType;
        const QueryResType = QueryResultType;
        switch (resultType) {
            case QueryResType.ENTITY_GRAPH:
            case QueryResType.ENTITY_TREE:
            case QueryResType.MAPPED_ENTITY_GRAPH:
            case QueryResType.MAPPED_ENTITY_TREE:
                const dbEntity = context.ioc.airDb.applications[portableQuery.applicationIndex]
                    .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery(jsonQuery, dbEntity, dialect, resultType, context);
            case QueryResType.FIELD:
                return new FieldSQLQuery(jsonQuery, dialect, context);
            case QueryResType.SHEET:
                return new SheetSQLQuery(jsonQuery, dialect, context);
            case QueryResType.TREE:
                return new TreeSQLQuery(jsonQuery, dialect, context);
            case QueryResType.RAW:
            default:
                throw new Error(`Unknown QueryResultType: ${resultType}`);
        }
    }
    async findOne(portableQuery, internalFragments, context, cachedSqlQueryId) {
        let results = await this.find(portableQuery, internalFragments, context);
        if (results.length > 1) {
            throw new Error(`Expecting a single result, got ${results.length}`);
        }
        if (results.length == 1) {
            return results[0];
        }
        return null;
    }
    search(portableQuery, internalFragments, context, cachedSqlQueryId) {
        let resultsSubject = new Subject();
        // TODO: Remove the query for the list of cached queries, that are checked every
        //    time a mutation operation is run
        // let resultsSubject                 = new Subject<EntityArray>(() => {
        // 	if (resultsSubject.subscriptions.length < 1) {
        // 		container(this)
        // 			.get(ACTIVE_QUERIES)
        // 			.then(
        // 				activeQueries =>
        // 					// Remove the query for the list of cached queries, that are checked every
        // 					// time a mutation operation is run
        // 					activeQueries.remove(portableQuery)
        // 			)
        // 	}
        // })
        let cachedSqlQuery = {
            resultsSubject: resultsSubject,
            runQuery: () => {
                this.find(portableQuery, internalFragments, context)
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
    searchOne(portableQuery, internalFragments, context, cachedSqlQueryId) {
        let resultsSubject = new Subject();
        // TODO: Remove the query for the list of cached queries, that are checked every
        //       time a mutation operation is run
        // let resultsSubject                 = new Subject<E>(() => {
        // 	if (resultsSubject.subscriptions.length < 1) {
        // 		container(this)
        // 			.get(ACTIVE_QUERIES)
        // 			.then(
        // 				activeQueries =>
        // 					// Remove the query for the list of cached queries, that are checked every
        // 					// time a mutation operation is run
        // 					activeQueries.remove(portableQuery)
        // 			);
        // 	}
        // });
        let cachedSqlQuery = {
            resultsSubject: resultsSubject,
            runQuery: () => {
                this.findOne(portableQuery, internalFragments, context)
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
    splitValues(values, context) {
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
    async ensureContext(context) {
        context = doEnsureContext(context);
        await this.ensureIocContext(context);
        return context;
    }
    async ensureIocContext(context) {
        const operationContextLoader = await container(this)
            .get(OPERATION_CONTEXT_LOADER);
        await operationContextLoader.ensure(context);
    }
}
//# sourceMappingURL=SqlDriver.js.map