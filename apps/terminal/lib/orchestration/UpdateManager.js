"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class UpdateManager {
    constructor(airDb, dataStore, histManager, offlineDataStore, operHistoryDmo, recHistoryDmo, repoManager, repoTransHistoryDmo, transHistoryDmo, transManager, utils) {
        this.airDb = airDb;
        this.dataStore = dataStore;
        this.histManager = histManager;
        this.offlineDataStore = offlineDataStore;
        this.operHistoryDmo = operHistoryDmo;
        this.recHistoryDmo = recHistoryDmo;
        this.repoManager = repoManager;
        this.repoTransHistoryDmo = repoTransHistoryDmo;
        this.transHistoryDmo = transHistoryDmo;
        this.transManager = transManager;
        this.utils = utils;
        di_1.DI.get((airportDb, dataStore, historyManager, offlineDataStore, operationHistoryDmo, recordHistoryDmo, repositoryManager, repositoryTransactionHistoryDmo, transactionHistoryDmo, transactionManager, utils) => {
            this.airDb = airportDb;
            this.dataStore = dataStore;
            this.histManager = historyManager;
            this.offlineDataStore = offlineDataStore;
            this.operHistoryDmo = operationHistoryDmo;
            this.recHistoryDmo = recordHistoryDmo;
            this.repoManager = repositoryManager;
            this.repoTransHistoryDmo = repositoryTransactionHistoryDmo;
            this.transHistoryDmo = transactionHistoryDmo;
            this.transManager = transactionManager;
            this.utils = utils;
        }, air_control_1.AIR_DB, ground_control_1.STORE_DRIVER, diTokens_1.HISTORY_MANAGER, diTokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.OPER_HISTORY_DMO, holding_pattern_1.REC_HISTORY_DMO, diTokens_1.REPOSITORY_MANAGER, holding_pattern_1.REPO_TRANS_HISTORY_DMO, holding_pattern_1.TRANS_HISTORY_DMO, terminal_map_1.TRANSACTION_MANAGER, air_control_1.UTILS);
    }
    async updateValues(portableQuery, actor) {
        const dbEntity = this.airDb.schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex];
        let valueSelect;
        let recordHistoryMap;
        if (!dbEntity.isLocal) {
            [valueSelect, recordHistoryMap]
                = await this.addUpdateHistory(dbEntity, portableQuery, actor);
        }
        const numUpdatedRows = await this.dataStore.updateWhere(portableQuery);
        if (!dbEntity.isLocal) {
            await this.addNewValueHistory(portableQuery.jsonQuery, dbEntity, valueSelect, recordHistoryMap);
        }
        return numUpdatedRows;
    }
    async addUpdateHistory(dbEntity, portableQuery, actor) {
        if (!dbEntity.isRepositoryEntity) {
            throw `Cannot add update history for a non-RepositoryEntity`;
        }
        const qEntity = this.airDb
            .qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const jsonUpdate = portableQuery.jsonQuery;
        const selectClause = this.utils.Schema.getSheetSelectFromSetClause(dbEntity, qEntity, jsonUpdate.S);
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
            values: portableQuery.values,
        };
        const recordsToUpdate = await this.dataStore.find(portableSelect);
        const { repositoryIdColumnIndex, actorIdColumnIndex, actorRecordIdColumnIndex, recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(dbEntity, recordsToUpdate);
        const repositoryIds = Array.from(repositoryIdSet);
        const repositories = await this.repoManager.findReposWithDetailsByIds(...repositoryIds);
        const recordHistoryMapByRecordId = {};
        for (const repositoryId of repositoryIds) {
            const repository = repositories.get(repositoryId);
            const recordHistoryMapForRepository = {};
            recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
            const repoTransHistory = this.histManager.getNewRepoTransHistory(this.transManager.currentTransHistory, repository, actor);
            const operationHistory = this.repoTransHistoryDmo.startOperation(repoTransHistory, ground_control_1.ChangeType.UPDATE_ROWS, dbEntity);
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const recordToUpdate of recordsForRepositoryId) {
                const actorId = recordToUpdate[actorIdColumnIndex];
                const recordHistoryMapForActor = this.utils.ensureChildMap(recordHistoryMapForRepository, actorId);
                const actorRecordId = recordToUpdate[actorRecordIdColumnIndex];
                const recordHistory = this.operHistoryDmo.startRecordHistory(operationHistory, actorRecordId);
                recordHistoryMapForActor[actorRecordId] = recordHistory;
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = dbEntity.columnMap[columnName];
                    const value = recordToUpdate[dbColumn.index];
                    this.recHistoryDmo.addOldValue(recordHistory, dbColumn, value);
                }
            }
        }
        return [portableSelect, recordHistoryMapByRecordId];
    }
    async addNewValueHistory(jsonUpdate, dbEntity, portableSelect, recordHistoryMapByRecordId) {
        const updatedRecords = await this.dataStore.find(portableSelect);
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
                    this.recHistoryDmo.addNewValue(recordHistory, dbColumn, value);
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
            const recordsForRepositoryId = this.utils.ensureChildArray(recordsByRepositoryId, repositoryId);
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