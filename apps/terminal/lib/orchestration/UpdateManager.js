"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class UpdateManager {
    async updateValues(portableQuery, actor) {
        // TODO: remove unused dependencies after testing
        const [airDb, fieldUtils, historyManager, offlineDataStore, operHistoryDuo, queryUtils, recHistoryDuo, recHistoryNewValueDuo, recHistoryOldValueDuo, repositoryManager, repoTransHistoryDuo, schemaUtils, sequenceGenerator, storeDriver, transactionManager] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.FIELD_UTILS, diTokens_1.HISTORY_MANAGER, diTokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.OPER_HISTORY_DUO, air_control_1.QUERY_UTILS, holding_pattern_1.REC_HISTORY_DUO, holding_pattern_1.REC_HIST_NEW_VALUE_DUO, holding_pattern_1.REC_HIST_OLD_VALUE_DUO, diTokens_1.REPOSITORY_MANAGER, holding_pattern_1.REPO_TRANS_HISTORY_DUO, air_control_1.SCHEMA_UTILS, check_in_1.SEQUENCE_GENERATOR, ground_control_1.STORE_DRIVER, terminal_map_1.TRANSACTION_MANAGER);
        const dbEntity = airDb.schemas[portableQuery.schemaIndex]
            .currentVersion.entities[portableQuery.tableIndex];
        const errorPrefix = `Error updating '${dbEntity.name}'
`;
        const internalFragments = {
            SET: []
        };
        let recordHistoryMap;
        let repositorySheetSelectInfo;
        let systemWideOperationId;
        if (!dbEntity.isLocal) {
            systemWideOperationId = await check_in_1.getSysWideOpId(airDb, sequenceGenerator);
            [recordHistoryMap, repositorySheetSelectInfo]
                = await this.addUpdateHistory(dbEntity, portableQuery, actor, systemWideOperationId, errorPrefix, airDb, fieldUtils, historyManager, operHistoryDuo, queryUtils, recHistoryDuo, recHistoryOldValueDuo, repositoryManager, repoTransHistoryDuo, schemaUtils, storeDriver, transactionManager);
            internalFragments.SET.push({
                column: repositorySheetSelectInfo.systemWideOperationIdColumn,
                value: systemWideOperationId
            });
        }
        const numUpdatedRows = await storeDriver
            .updateWhere(portableQuery, internalFragments);
        if (!dbEntity.isLocal) {
            await this.addNewValueHistory(portableQuery.jsonQuery, dbEntity, recordHistoryMap, systemWideOperationId, repositorySheetSelectInfo, errorPrefix, airDb, recHistoryDuo, recHistoryNewValueDuo, fieldUtils, queryUtils, storeDriver);
        }
        return numUpdatedRows;
    }
    async addUpdateHistory(dbEntity, portableQuery, actor, systemWideOperationId, errorPrefix, airDb, fieldUtils, histManager, operHistoryDuo, queryUtils, recHistoryDuo, recHistoryOldValueDuo, repoManager, repoTransHistoryDuo, schemaUtils, storeDriver, transManager) {
        if (!dbEntity.isRepositoryEntity) {
            throw new Error(errorPrefix +
                `Cannot add update history for a non-RepositoryEntity`);
        }
        const qEntity = airDb
            .qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const jsonUpdate = portableQuery.jsonQuery;
        const getSheetSelectFromSetClauseResult = schemaUtils.getSheetSelectFromSetClause(dbEntity, qEntity, jsonUpdate.S, errorPrefix);
        const sheetQuery = new air_control_1.SheetQuery(null);
        const jsonSelectClause = sheetQuery.nonDistinctSelectClauseToJSON(getSheetSelectFromSetClauseResult.selectClause, queryUtils, fieldUtils);
        const jsonSelect = {
            S: jsonSelectClause,
            F: [jsonUpdate.U],
            W: jsonUpdate.W,
        };
        const portableSelect = {
            schemaIndex: portableQuery.schemaIndex,
            tableIndex: portableQuery.tableIndex,
            jsonQuery: jsonSelect,
            queryResultType: ground_control_1.QueryResultType.SHEET,
            parameterMap: portableQuery.parameterMap,
        };
        const recordsToUpdate = await storeDriver.find(portableSelect, {});
        const { recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(recordsToUpdate, getSheetSelectFromSetClauseResult);
        const repositoryIds = Array.from(repositoryIdSet);
        // const repositories: MappedEntityArray<IRepository> =
        // 	      await repoManager.findReposWithDetailsByIds(...repositoryIds)
        const recordHistoryMapByRecordId = {};
        for (const repositoryId of repositoryIds) {
            // const repository                         = repositories.get(repositoryId)
            const recordHistoryMapForRepository = {};
            recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
            const repoTransHistory = await histManager.getNewRepoTransHistory(transManager.currentTransHistory, repositoryId, actor);
            const operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, systemWideOperationId, ground_control_1.ChangeType.UPDATE_ROWS, dbEntity, operHistoryDuo);
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const recordToUpdate of recordsForRepositoryId) {
                const actorId = recordToUpdate[getSheetSelectFromSetClauseResult.actorIdColumnIndex];
                const recordHistoryMapForActor = ground_control_1.ensureChildMap(recordHistoryMapForRepository, actorId);
                const actorRecordId = recordToUpdate[getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex];
                const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, actorRecordId, recHistoryDuo);
                recordHistoryMapForActor[actorRecordId] = recordHistory;
                for (let i = 0; i < recordToUpdate.length; i++) {
                    switch (i) {
                        case getSheetSelectFromSetClauseResult.actorIdColumnIndex:
                        case getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex:
                        case getSheetSelectFromSetClauseResult.repositoryIdColumnIndex:
                            continue;
                        case getSheetSelectFromSetClauseResult.draftColumnIndex:
                            if (!getSheetSelectFromSetClauseResult.draftColumnUpdated) {
                                continue;
                            }
                            break;
                    }
                    const dbColumn = getSheetSelectFromSetClauseResult
                        .selectClause[i].dbColumn;
                    const value = recordToUpdate[i];
                    recHistoryDuo.addOldValue(recordHistory, dbColumn, value, recHistoryOldValueDuo);
                }
            }
        }
        return [recordHistoryMapByRecordId, getSheetSelectFromSetClauseResult];
    }
    async addNewValueHistory(jsonUpdate, dbEntity, recordHistoryMapByRecordId, systemWideOperationId, repositorySheetSelectInfo, errorPrefix, airDb, recHistoryDuo, recHistoryNewValueDuo, fieldUtils, queryUtils, storeDriver) {
        const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const sheetQuery = new air_control_1.SheetQuery({
            from: [
                qEntity
            ],
            select: [],
            where: qEntity[ground_control_1.repositoryEntity.systemWideOperationId]
                .equals(systemWideOperationId)
        });
        const queryFacade = await di_1.DI.get(air_control_1.QUERY_FACADE);
        let portableSelect = queryFacade.getPortableQuery(dbEntity, sheetQuery, ground_control_1.QueryResultType.SHEET, queryUtils, fieldUtils);
        const internalFragments = {
            SELECT: repositorySheetSelectInfo.selectClause.map(field => field.dbColumn)
        };
        const updatedRecords = await storeDriver.find(portableSelect, internalFragments);
        const { recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(updatedRecords, repositorySheetSelectInfo);
        for (const repositoryId of repositoryIdSet) {
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const updatedRecord of recordsForRepositoryId) {
                const repositoryId = updatedRecord[repositorySheetSelectInfo.repositoryIdColumnIndex];
                const actorId = updatedRecord[repositorySheetSelectInfo.actorIdColumnIndex];
                const actorRecordId = updatedRecord[repositorySheetSelectInfo.actorRecordIdColumnIndex];
                const isDraft = updatedRecord[repositorySheetSelectInfo.draftColumnIndex];
                if (repositorySheetSelectInfo.draftColumnUpdated
                    && isDraft) {
                    throw new Error(errorPrefix + `Records cannot be updated to be draft. A record
may only be created as a draft record.`);
                }
                const recordHistory = recordHistoryMapByRecordId[repositoryId][actorId][actorRecordId];
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = dbEntity.columnMap[columnName];
                    const value = updatedRecord[dbColumn.index];
                    if (value === undefined) {
                        throw new Error(errorPrefix + `Values cannot be 'undefined'.`);
                    }
                    if (dbColumn.notNull && value === null && !isDraft) {
                        throw new Error(errorPrefix + `Column '${dbColumn.entity.name}'.'${dbColumn.name}' is NOT NULL
						and cannot have NULL values for non-draft records.`);
                    }
                    recHistoryDuo.addNewValue(recordHistory, dbColumn, value, recHistoryNewValueDuo);
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
            const recordsForRepositoryId = ground_control_1.ensureChildArray(recordsByRepositoryId, repositoryId);
            recordsForRepositoryId.push(recordToUpdate);
        }
        return {
            recordsByRepositoryId,
            repositoryIdSet
        };
    }
}
exports.UpdateManager = UpdateManager;
di_1.DI.set(diTokens_1.UPDATE_MANAGER, UpdateManager);
//# sourceMappingURL=UpdateManager.js.map