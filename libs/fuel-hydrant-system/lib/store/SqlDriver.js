import { doEnsureContext } from '@airport/air-control';
import { getFullApplicationName, QueryResultType, SyncApplicationMap, } from '@airport/ground-control';
import { Subject } from 'rxjs';
import { SQLDelete } from '../sql/core/SQLDelete';
import { SQLInsertValues } from '../sql/core/SQLInsertValues';
import { SQLUpdate } from '../sql/core/SQLUpdate';
import { EntitySQLQuery } from '../sql/EntitySQLQuery';
import { FieldSQLQuery } from '../sql/FieldSQLQuery';
import { SheetSQLQuery } from '../sql/SheetSQLQuery';
import { TreeSQLQuery } from '../sql/TreeSQLQuery';
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
    async internalSetupTransaction(transaction, context) {
        await this.ensureContext(context);
    }
    async tearDownTransaction(transaction, context) {
        if (transaction.childTransaction) {
            this.tearDownTransaction(transaction.childTransaction, context);
        }
        if (transaction.parentTransaction) {
            transaction.parentTransaction.childTransaction = null;
            transaction.parentTransaction = null;
        }
    }
    async startTransaction(transaction, context) {
        await this.ensureContext(context);
        try {
            await this.internalStartTransaction(transaction);
        }
        catch (e) {
            await this.tearDownTransaction(transaction, context);
            console.error(e);
            throw e;
        }
    }
    async commit(transaction, context) {
        await this.ensureContext(context);
        try {
            await this.internalCommit(transaction);
        }
        catch (e) {
            console.error(e);
            try {
                await this.internalRollback(transaction);
            }
            catch (rollbackError) {
                console.error(rollbackError);
            }
            throw e;
        }
        finally {
            await this.tearDownTransaction(transaction, context);
        }
    }
    async rollback(transaction, context) {
        await this.ensureContext(context);
        try {
            await this.internalRollback(transaction);
        }
        catch (e) {
            console.error(e);
            // Do not re-throw the exception, rollback is final (at least for now)
        }
        finally {
            await this.tearDownTransaction(transaction, context);
        }
    }
    async insertValues(portableQuery, context, cachedSqlQueryId) {
        const splitValues = this.splitValues(portableQuery.jsonQuery.V, context);
        let numVals = 0;
        for (const V of splitValues) {
            let sqlInsertValues = new SQLInsertValues({
                ...portableQuery.jsonQuery,
                V
            }, this.getDialect(context), this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.relationManager, this.sqlQueryAdapter, this, context);
            let sql = sqlInsertValues.toSQL(context);
            let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap, context);
            numVals += await this.executeNative(sql, parameters, context);
        }
        return numVals;
    }
    async deleteWhere(portableQuery, context) {
        let fieldMap = new SyncApplicationMap();
        let sqlDelete = new SQLDelete(portableQuery.jsonQuery, this.getDialect(context), this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.relationManager, this.sqlQueryAdapter, this, context);
        let sql = sqlDelete.toSQL(context);
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap, context);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters, context);
        this.activeQueries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery, internalFragments, context) {
        let sqlUpdate = new SQLUpdate(portableQuery.jsonQuery, this.getDialect(context), this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.relationManager, this.sqlQueryAdapter, this, context);
        let sql = sqlUpdate.toSQL(internalFragments, context);
        let parameters = sqlUpdate.getParameters(portableQuery.parameterMap, context);
        return await this.executeNative(sql, parameters, context);
    }
    async find(portableQuery, internalFragments, context, cachedSqlQueryId) {
        if (context.transaction) {
            return await context.transaction.find(portableQuery, internalFragments, context, cachedSqlQueryId);
        }
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
                const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
                    .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery(jsonQuery, dbEntity, dialect, resultType, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.relationManager, this.sqlQueryAdapter, this, context);
            case QueryResType.FIELD:
                return new FieldSQLQuery(jsonQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, context);
            case QueryResType.SHEET:
                return new SheetSQLQuery(jsonQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, context);
            case QueryResType.TREE:
                return new TreeSQLQuery(jsonQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, context);
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
        // 					// Remove the query for the list of cached queries, that are checked every
        // 					// time a mutation operation is run
        // 					this.activeQueries.remove(portableQuery)
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
        // 					// Remove the query for the list of cached queries, that are checked every
        // 					// time a mutation operation is run
        // 					this.activeQueries.remove(portableQuery)
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
        await this.operationContextLoader.ensure(context);
        return context;
    }
}
//# sourceMappingURL=SqlDriver.js.map