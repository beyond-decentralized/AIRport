"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class UpdateManager {
    async updateValues(portableQuery, actor) {
        // TODO: remove unused dependencies after testing
        const [airDb, historyManager, offlineDataStore, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, recHistoryOldValueDuo, repositoryManager, repoTransHistoryDuo, schemaUtils, storeDriver, transactionManager] = await di_1.DI.get(air_control_1.AIR_DB, diTokens_1.HISTORY_MANAGER, diTokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.OPER_HISTORY_DUO, holding_pattern_1.REC_HISTORY_DUO, holding_pattern_1.REC_HIST_NEW_VALUE_DUO, holding_pattern_1.REC_HIST_OLD_VALUE_DUO, diTokens_1.REPOSITORY_MANAGER, holding_pattern_1.REPO_TRANS_HISTORY_DUO, air_control_1.SCHEMA_UTILS, ground_control_1.STORE_DRIVER, terminal_map_1.TRANSACTION_MANAGER);
        const dbEntity = airDb.schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex];
        let valueSelect;
        let recordHistoryMap;
        if (!dbEntity.isLocal) {
            [valueSelect, recordHistoryMap]
                = await this.addUpdateHistory(dbEntity, portableQuery, actor, airDb, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repositoryManager, repoTransHistoryDuo, schemaUtils, storeDriver, transactionManager);
        }
        const numUpdatedRows = await storeDriver.updateWhere(portableQuery);
        if (!dbEntity.isLocal) {
            await this.addNewValueHistory(portableQuery.jsonQuery, dbEntity, valueSelect, recordHistoryMap, recHistoryDuo, recHistoryNewValueDuo, storeDriver);
        }
        return numUpdatedRows;
    }
    async addUpdateHistory(dbEntity, portableQuery, actor, airDb, histManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoManager, repoTransHistoryDuo, schemaUtils, storeDriver, transManager) {
        if (!dbEntity.isRepositoryEntity) {
            throw `Cannot add update history for a non-RepositoryEntity`;
        }
        const qEntity = airDb
            .qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const jsonUpdate = portableQuery.jsonQuery;
        const selectClause = schemaUtils.getSheetSelectFromSetClause(dbEntity, qEntity, jsonUpdate.S);
        const jsonSelect = {
            S: selectClause,
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
        const recordsToUpdate = await storeDriver.find(portableSelect);
        const { repositoryIdColumnIndex, actorIdColumnIndex, actorRecordIdColumnIndex, recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(dbEntity, recordsToUpdate);
        const repositoryIds = Array.from(repositoryIdSet);
        const repositories = await repoManager.findReposWithDetailsByIds(...repositoryIds);
        const recordHistoryMapByRecordId = {};
        for (const repositoryId of repositoryIds) {
            const repository = repositories.get(repositoryId);
            const recordHistoryMapForRepository = {};
            recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
            const repoTransHistory = await histManager.getNewRepoTransHistory(transManager.currentTransHistory, repository, actor);
            const operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, ground_control_1.ChangeType.UPDATE_ROWS, dbEntity, operHistoryDuo);
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const recordToUpdate of recordsForRepositoryId) {
                const actorId = recordToUpdate[actorIdColumnIndex];
                const recordHistoryMapForActor = ground_control_1.ensureChildMap(recordHistoryMapForRepository, actorId);
                const actorRecordId = recordToUpdate[actorRecordIdColumnIndex];
                const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, actorRecordId, recHistoryDuo);
                recordHistoryMapForActor[actorRecordId] = recordHistory;
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = dbEntity.columnMap[columnName];
                    const value = recordToUpdate[dbColumn.index];
                    recHistoryDuo.addOldValue(recordHistory, dbColumn, value, recHistoryOldValueDuo);
                }
            }
        }
        return [portableSelect, recordHistoryMapByRecordId];
    }
    async addNewValueHistory(jsonUpdate, dbEntity, portableSelect, recordHistoryMapByRecordId, recHistoryDuo, recHistoryNewValueDuo, storeDriver) {
        const updatedRecords = await storeDriver.find(portableSelect);
        const { repositoryIdColumnIndex, actorIdColumnIndex, actorRecordIdColumnIndex, recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(dbEntity, updatedRecords);
        for (const repositoryId of repositoryIdSet) {
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const updatedRecord of recordsForRepositoryId) {
                const repositoryId = updatedRecord[repositoryIdColumnIndex];
                const actorId = updatedRecord[actorIdColumnIndex];
                const actorRecordId = updatedRecord[actorRecordIdColumnIndex];
                const recordHistory = recordHistoryMapByRecordId[repositoryId][actorId][actorRecordId];
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = dbEntity.columnMap[columnName];
                    const value = updatedRecord[dbColumn.index];
                    recHistoryDuo.addNewValue(recordHistory, dbColumn, value, recHistoryNewValueDuo);
                }
            }
        }
    }
    groupRecordsByRepository(dbEntity, records) {
        const repositoryIdColumnIndex = dbEntity.columnMap[ground_control_1.repositoryEntity.REPOSITORY_ID].index;
        const actorIdColumnIndex = dbEntity.columnMap[ground_control_1.repositoryEntity.ACTOR_ID].index;
        const actorRecordIdColumnIndex = dbEntity.columnMap[ground_control_1.repositoryEntity.ACTOR_RECORD_ID].index;
        const recordsByRepositoryId = {};
        const repositoryIdSet = new Set();
        for (const recordToUpdate of records) {
            const repositoryId = recordToUpdate[repositoryIdColumnIndex];
            repositoryIdSet.add(repositoryId);
            const recordsForRepositoryId = ground_control_1.ensureChildArray(recordsByRepositoryId, repositoryId);
            recordsForRepositoryId.push(recordToUpdate);
        }
        return {
            repositoryIdColumnIndex,
            actorIdColumnIndex,
            actorRecordIdColumnIndex,
            recordsByRepositoryId,
            repositoryIdSet
        };
    }
}
exports.UpdateManager = UpdateManager;
di_1.DI.set(diTokens_1.UPDATE_MANAGER, UpdateManager);
//# sourceMappingURL=UpdateManager.js.map