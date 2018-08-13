"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
const TransactionManager_1 = require("./TransactionManager");
let UpdateManager = class UpdateManager {
    constructor(airportDb, utils, dataStore, historyManager, offlineDataStore, operationHistoryDmo, recordHistoryDmo, repositoryManager, repositoryTransactionHistoryDmo, transactionHistoryDmo, transactionManager) {
        this.airportDb = airportDb;
        this.utils = utils;
        this.dataStore = dataStore;
        this.historyManager = historyManager;
        this.offlineDataStore = offlineDataStore;
        this.operationHistoryDmo = operationHistoryDmo;
        this.recordHistoryDmo = recordHistoryDmo;
        this.repositoryManager = repositoryManager;
        this.repositoryTransactionHistoryDmo = repositoryTransactionHistoryDmo;
        this.transactionHistoryDmo = transactionHistoryDmo;
        this.transactionManager = transactionManager;
    }
    async updateValues(portableQuery, actor) {
        const dbEntity = this.airportDb.schemas[portableQuery.schemaIndex].entities[portableQuery.tableIndex];
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
        const qEntity = this.airportDb.qSchemas[dbEntity.schema.index][dbEntity.name];
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
        const repositories = await this.repositoryManager.findReposWithDetailsByIds(...repositoryIds);
        const recordHistoryMapByRecordId = {};
        for (const repositoryId of repositoryIds) {
            const repository = repositories.get(repositoryId);
            const recordHistoryMapForRepository = {};
            recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
            const repoTransHistory = this.historyManager.getNewRepoTransHistory(this.transactionManager.currentTransHistory, repository, actor);
            const operationHistory = this.repositoryTransactionHistoryDmo.startOperation(repoTransHistory, ground_control_1.ChangeType.UPDATE_ROWS, dbEntity);
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const recordToUpdate of recordsForRepositoryId) {
                const actorId = recordToUpdate[actorIdColumnIndex];
                const recordHistoryMapForActor = this.utils.ensureChildMap(recordHistoryMapForRepository, actorId);
                const actorRecordId = recordToUpdate[actorRecordIdColumnIndex];
                const recordHistory = this.operationHistoryDmo.startRecordHistory(operationHistory, actorRecordId);
                recordHistoryMapForActor[actorRecordId] = recordHistory;
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = dbEntity.columnMap[columnName];
                    const value = recordToUpdate[dbColumn.index];
                    this.recordHistoryDmo.addOldValue(recordHistory, dbColumn, value);
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
                    this.recordHistoryDmo.addNewValue(recordHistory, dbColumn, value);
                }
            }
        }
    }
    groupRecordsByRepository(dbEntity, records) {
        const repositoryIdColumnIndex = dbEntity.columnMap[air_control_1.repositoryEntity.REPOSITORY_ID].index;
        const actorIdColumnIndex = dbEntity.columnMap[air_control_1.repositoryEntity.ACTOR_ID].index;
        const actorRecordIdColumnIndex = dbEntity.columnMap[air_control_1.repositoryEntity.ACTOR_RECORD_ID].index;
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
};
UpdateManager = __decorate([
    typedi_1.Service(InjectionTokens_1.UpdateManagerToken),
    __param(0, typedi_1.Inject(_ => air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(_ => air_control_1.UtilsToken)),
    __param(2, typedi_1.Inject(_ => InjectionTokens_1.StoreDriverToken)),
    __param(3, typedi_1.Inject(_ => InjectionTokens_1.HistoryManagerToken)),
    __param(4, typedi_1.Inject(_ => InjectionTokens_1.OfflineDeltaStoreToken)),
    __param(5, typedi_1.Inject(_ => holding_pattern_1.OperationHistoryDmoToken)),
    __param(6, typedi_1.Inject(_ => holding_pattern_1.RecordHistoryDmoToken)),
    __param(7, typedi_1.Inject(_ => InjectionTokens_1.RepositoryManagerToken)),
    __param(8, typedi_1.Inject(_ => holding_pattern_1.RepositoryTransactionHistoryDmoToken)),
    __param(9, typedi_1.Inject(_ => holding_pattern_1.TransactionHistoryDmoToken)),
    __param(10, typedi_1.Inject(_ => InjectionTokens_1.TransactionManagerToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, holding_pattern_1.OperationHistoryDmo,
        holding_pattern_1.RecordHistoryDmo, Object, holding_pattern_1.RepositoryTransactionHistoryDmo,
        holding_pattern_1.TransactionHistoryDmo, typeof (_a = typeof TransactionManager_1.ITransactionManager !== "undefined" && TransactionManager_1.ITransactionManager) === "function" && _a || Object])
], UpdateManager);
exports.UpdateManager = UpdateManager;
//# sourceMappingURL=UpdateManager.js.map