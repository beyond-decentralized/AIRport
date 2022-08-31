var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { QueryResultType, SyncApplicationMap, } from '@airport/ground-control';
import { SQLDelete } from '../sql/core/SQLDelete';
import { SQLInsertValues } from '../sql/core/SQLInsertValues';
import { SQLUpdate } from '../sql/core/SQLUpdate';
import { EntitySQLQuery } from '../sql/EntitySQLQuery';
import { FieldSQLQuery } from '../sql/FieldSQLQuery';
import { SheetSQLQuery } from '../sql/SheetSQLQuery';
import { TreeSQLQuery } from '../sql/TreeSQLQuery';
import { doEnsureContext } from '@airport/tarmaq-dao';
/**
 * Created by Papa on 9/9/2016.
 */
let SqlDriver = class SqlDriver {
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
        let fullApplication_Name;
        if (application.fullName) {
            fullApplication_Name = application.fullName;
        }
        else {
            fullApplication_Name = this.dbApplicationUtils.getFullApplication_Name(application);
        }
        return this.composeTableName(fullApplication_Name, theTableName, context);
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
            }, this.getDialect(context), this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
            let sql = sqlInsertValues.toSQL(context);
            let parameters = sqlInsertValues.getParameters(portableQuery.parameterMap, context);
            numVals += await this.executeNative(sql, parameters, context);
        }
        return numVals;
    }
    async deleteWhere(portableQuery, context) {
        let fieldMap = new SyncApplicationMap();
        let sqlDelete = new SQLDelete(portableQuery.jsonQuery, this.getDialect(context), this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
        let sql = sqlDelete.toSQL(context);
        let parameters = sqlDelete.getParameters(portableQuery.parameterMap, context);
        let numberOfAffectedRecords = await this.executeNative(sql, parameters, context);
        this.activeQueries.markQueriesToRerun(fieldMap);
        return numberOfAffectedRecords;
    }
    async updateWhere(portableQuery, internalFragments, context) {
        let sqlUpdate = new SQLUpdate(portableQuery.jsonQuery, this.getDialect(context), this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
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
                const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
                    .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
                return new EntitySQLQuery(jsonQuery, dbEntity, dialect, resultType, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.objectResultParserFactory, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
            case QueryResType.FIELD:
                return new FieldSQLQuery(jsonQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
            case QueryResType.SHEET:
                return new SheetSQLQuery(jsonQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
            case QueryResType.TREE:
                return new TreeSQLQuery(jsonQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this, this.subStatementQueryGenerator, this.utils, context);
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
        return doEnsureContext(context);
    }
};
__decorate([
    Inject()
], SqlDriver.prototype, "activeQueries", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "objectResultParserFactory", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "qMetadataUtils", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "qValidator", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "relationManager", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "sqlQueryAdapter", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "subStatementQueryGenerator", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "transactionManager", void 0);
__decorate([
    Inject()
], SqlDriver.prototype, "utils", void 0);
SqlDriver = __decorate([
    Injected()
], SqlDriver);
export { SqlDriver };
//# sourceMappingURL=SqlDriver.js.map