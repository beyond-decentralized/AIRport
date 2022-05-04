var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SheetQuery } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { getSysWideOpId } from '@airport/check-in';
import { ChangeType, ensureChildArray, ensureChildMap, QueryResultType, repositoryEntity, } from '@airport/ground-control';
let UpdateManager = class UpdateManager {
    async updateValues(portableQuery, actor, transaction, rootTransaction, context) {
        const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
            .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
        const errorPrefix = `Error updating '${dbEntity.name}'
`;
        const internalFragments = {
            SET: []
        };
        let recordHistoryMap;
        let repositorySheetSelectInfo;
        let systemWideOperationId;
        if (!dbEntity.isLocal && !transaction.isSync) {
            systemWideOperationId = await getSysWideOpId(this.airportDatabase, this.sequenceGenerator);
            // TODO: For entity queries an additional query really shouldn't be needed
            // Specifically for entity queries, we got the new values, just record them
            // This will require an additional operation on the first update
            // where the original values of the record are saved
            // This eats up more disk space but saves on operations that need
            // to be performed (one less query)
            [recordHistoryMap, repositorySheetSelectInfo]
                = await this.addUpdateHistory(portableQuery, actor, systemWideOperationId, errorPrefix, transaction, rootTransaction, context);
            internalFragments.SET.push({
                column: repositorySheetSelectInfo.systemWideOperationIdColumn,
                value: systemWideOperationId
            });
        }
        const numUpdatedRows = await transaction
            .updateWhere(portableQuery, internalFragments, context);
        if (!dbEntity.isLocal && !transaction.isSync) {
            const previousDbEntity = context.dbEntity;
            context.dbEntity = dbEntity;
            // TODO: Entity based updates already have all of the new values being
            // updated, detect the type of update and if entity just pull out
            // the new values from them
            await this.addNewValueHistory(portableQuery.jsonQuery, recordHistoryMap, systemWideOperationId, repositorySheetSelectInfo, errorPrefix, transaction, context);
            context.dbEntity = previousDbEntity;
        }
        return numUpdatedRows;
    }
    async addUpdateHistory(portableQuery, actor, systemWideOperationId, errorPrefix, transaction, rootTransaction, context) {
        if (!context.dbEntity.isRepositoryEntity) {
            throw new Error(errorPrefix +
                `Cannot add update history for a non-RepositoryEntity`);
        }
        const qEntity = this.airportDatabase
            .qApplications[context.dbEntity.applicationVersion.application.index][context.dbEntity.name];
        const jsonUpdate = portableQuery.jsonQuery;
        const getSheetSelectFromSetClauseResult = this.applicationUtils.getSheetSelectFromSetClause(context.dbEntity, qEntity, jsonUpdate.S, errorPrefix);
        const sheetQuery = new SheetQuery(null);
        const jsonSelectClause = sheetQuery.nonDistinctSelectClauseToJSON(getSheetSelectFromSetClauseResult.selectClause, this.queryUtils, this.fieldUtils, this.relationManager);
        const jsonSelect = {
            S: jsonSelectClause,
            F: [jsonUpdate.U],
            W: jsonUpdate.W,
        };
        const portableSelect = {
            applicationIndex: portableQuery.applicationIndex,
            tableIndex: portableQuery.tableIndex,
            jsonQuery: jsonSelect,
            queryResultType: QueryResultType.SHEET,
            parameterMap: portableQuery.parameterMap,
            // values: portableQuery.values,
        };
        const recordsToUpdate = await transaction.find(portableSelect, {}, context);
        const { recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(recordsToUpdate, getSheetSelectFromSetClauseResult);
        const repositoryIds = Array.from(repositoryIdSet);
        const recordHistoryMapByRecordId = {};
        for (const repositoryId of repositoryIds) {
            // const repository                         = repositories.get(repositoryId)
            const recordHistoryMapForRepository = {};
            recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
            const repositoryTransactionHistory = await this.historyManager.getNewRepositoryTransactionHistory(transaction.transactionHistory, repositoryId, context);
            const operationHistory = this.repositoryTransactionHistoryDuo.startOperation(repositoryTransactionHistory, systemWideOperationId, ChangeType.UPDATE_ROWS, context.dbEntity, actor, rootTransaction);
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const recordToUpdate of recordsForRepositoryId) {
                const actorId = recordToUpdate[getSheetSelectFromSetClauseResult.actorIdColumnIndex];
                const recordHistoryMapForActor = ensureChildMap(recordHistoryMapForRepository, actorId);
                const actorRecordId = recordToUpdate[getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex];
                const recordHistory = this.operationHistoryDuo.startRecordHistory(operationHistory, actorId, actorRecordId);
                recordHistoryMapForActor[actorRecordId] = recordHistory;
                for (let i = 0; i < recordToUpdate.length; i++) {
                    switch (i) {
                        case getSheetSelectFromSetClauseResult.actorIdColumnIndex:
                        case getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex:
                        case getSheetSelectFromSetClauseResult.repositoryIdColumnIndex:
                            continue;
                    }
                    const dbColumn = getSheetSelectFromSetClauseResult
                        .selectClause[i].dbColumn;
                    const value = recordToUpdate[i];
                    this.recordHistoryDuo.addOldValue(recordHistory, dbColumn, value);
                }
            }
        }
        return [recordHistoryMapByRecordId, getSheetSelectFromSetClauseResult];
    }
    async addNewValueHistory(jsonUpdate, recordHistoryMapByRecordId, systemWideOperationId, repositorySheetSelectInfo, errorPrefix, transaction, context) {
        const qEntity = this.airportDatabase.qApplications[context.dbEntity.applicationVersion.application.index][context.dbEntity.name];
        const sheetQuery = new SheetQuery({
            from: [
                qEntity
            ],
            select: [],
            where: qEntity[repositoryEntity.systemWideOperationId]
                .equals(systemWideOperationId)
        });
        let portableSelect = this.queryFacade.getPortableQuery(sheetQuery, QueryResultType.SHEET, context);
        const resultSetIndexByColumnIndex = new Map();
        const selectDbColumns = [];
        let i = 0;
        for (const qField of repositorySheetSelectInfo.selectClause) {
            const dbColumn = qField.dbColumn;
            selectDbColumns.push(dbColumn);
            resultSetIndexByColumnIndex.set(dbColumn.index, i);
            i++;
        }
        const internalFragments = {
            SELECT: selectDbColumns
        };
        const updatedRecords = await transaction.find(portableSelect, internalFragments, context);
        const { recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(updatedRecords, repositorySheetSelectInfo);
        for (const repositoryId of repositoryIdSet) {
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const updatedRecord of recordsForRepositoryId) {
                const repositoryId = updatedRecord[resultSetIndexByColumnIndex.get(repositorySheetSelectInfo.repositoryIdColumnIndex)];
                const actorId = updatedRecord[resultSetIndexByColumnIndex.get(repositorySheetSelectInfo.actorIdColumnIndex)];
                const actorRecordId = updatedRecord[resultSetIndexByColumnIndex.get(repositorySheetSelectInfo.actorRecordIdColumnIndex)];
                const recordHistory = recordHistoryMapByRecordId[repositoryId][actorId][actorRecordId];
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = context.dbEntity.columnMap[columnName];
                    const value = updatedRecord[resultSetIndexByColumnIndex.get(dbColumn.index)];
                    if (value === undefined) {
                        throw new Error(errorPrefix + `Values cannot be 'undefined'.`);
                    }
                    if (dbColumn.notNull && value === null) {
                        throw new Error(errorPrefix + `Column '${dbColumn.entity.name}'.'${dbColumn.name}' is NOT NULL
						and cannot have NULL values.`);
                    }
                    this.recordHistoryDuo.addNewValue(recordHistory, dbColumn, value);
                }
            }
        }
    }
    groupRecordsByRepository(records, repositorySheetSelectInfo) {
        const recordsByRepositoryId = {};
        const repositoryIdSet = new Set();
        for (const recordToUpdate of records) {
            const repositoryId = recordToUpdate[repositorySheetSelectInfo.repositoryIdColumnIndex];
            repositoryIdSet.add(repositoryId);
            const recordsForRepositoryId = ensureChildArray(recordsByRepositoryId, repositoryId);
            recordsForRepositoryId.push(recordToUpdate);
        }
        return {
            recordsByRepositoryId,
            repositoryIdSet
        };
    }
};
__decorate([
    Inject()
], UpdateManager.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "fieldUtils", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "historyManager", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "operationHistoryDuo", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "queryFacade", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "queryUtils", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "recordHistoryDuo", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "relationManager", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "repositoryTransactionHistoryDuo", void 0);
__decorate([
    Inject()
], UpdateManager.prototype, "sequenceGenerator", void 0);
UpdateManager = __decorate([
    Injected()
], UpdateManager);
export { UpdateManager };
//# sourceMappingURL=UpdateManager.js.map