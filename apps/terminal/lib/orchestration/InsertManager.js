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
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
const IdGenerator_1 = require("../store/IdGenerator");
let InsertManager = class InsertManager {
    constructor(airportDb, dataStore, idGenerator, historyManager, offlineDataStore, operationHistoryDmo, recordHistoryDmo, repositoryManager, repositoryTransactionHistoryDmo, transactionHistoryDmo, transactionManager) {
        this.airportDb = airportDb;
        this.dataStore = dataStore;
        this.idGenerator = idGenerator;
        this.historyManager = historyManager;
        this.offlineDataStore = offlineDataStore;
        this.operationHistoryDmo = operationHistoryDmo;
        this.recordHistoryDmo = recordHistoryDmo;
        this.repositoryManager = repositoryManager;
        this.repositoryTransactionHistoryDmo = repositoryTransactionHistoryDmo;
        this.transactionHistoryDmo = transactionHistoryDmo;
        this.transactionManager = transactionManager;
    }
    get currentTransHistory() {
        return this.transactionManager.currentTransHistory;
    }
    async insertValues(portableQuery, actor) {
        return this.internalInsertValues(portableQuery, actor, false);
    }
    async insertValuesGetIds(portableQuery, actor) {
        return this.internalInsertValues(portableQuery, actor, true);
    }
    async internalInsertValues(portableQuery, actor, getIds = false) {
        const dbEntity = this.airportDb.schemas[portableQuery.schemaIndex].entities[portableQuery.tableIndex];
        let ids;
        if (!dbEntity.isLocal) {
            ids = await this.ensureRepositoryEntityIdValues(actor, dbEntity, portableQuery.jsonQuery);
            await this.addInsertHistory(dbEntity, portableQuery, actor);
        }
        else {
            ids = await this.ensureIdValues(dbEntity, portableQuery.jsonQuery);
        }
        const numberOfInsertedRecords = await this.dataStore.insertValues(portableQuery);
        return getIds ? ids : numberOfInsertedRecords;
    }
    async addRepository(name, url = null, platform = terminal_map_1.PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH) {
        const repository = await this.repositoryManager.createRepository(name, distributionStrategy, this.transactionManager.storeType, platform, platformConfig, 'id');
        return repository.id;
    }
    async ensureIdValues(dbEntity, jsonInsertValues) {
        const idColumns = dbEntity.idColumns;
        if (!idColumns.length) {
            return null;
        }
        const values = jsonInsertValues.V;
        if (idColumns.length > 1
            || !idColumns[0].isGenerated) {
            for (const idColumn of idColumns) {
                for (const entityValues of values) {
                    if (!entityValues[idColumn.index]) {
                        throw `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`;
                    }
                }
            }
            return null;
        }
        const idColumn = dbEntity.idColumns[0];
        const ids = [];
        for (const entityValues of values) {
            if (entityValues[idColumn.index] || entityValues[idColumn.index] === 0) {
                throw `Already provided value '${entityValues[idColumn.index]}' on insert for @Id @GeneratedValue '${dbEntity.name}.${idColumn.name}'.\nYou cannot explicitly provide values for generated ids'.`;
            }
            let repositoryId = null;
            if (dbEntity.isRepositoryEntity) {
                repositoryId = dbEntity.columnMap[air_control_1.repositoryEntity.FOREIGN_KEY].index;
                if (!repositoryId && repositoryId !== 0) {
                    throw `@Column({ name: 'REPOSITORY_ID'}) value is not specified on insert for '${dbEntity.name}.${idColumn.name}'.`;
                }
            }
            const id = this.idGenerator.generateEntityId(dbEntity);
            ids.push(id);
            entityValues[idColumn.index] = id;
        }
        return ids;
    }
    async ensureRepositoryEntityIdValues(actor, dbEntity, jsonInsertValues) {
        const actorRecordIds = [];
        const actorIdColumn = dbEntity.idColumnMap['ACTOR_ID'];
        const actorRecordIdColumn = dbEntity.idColumnMap['ACTOR_RECORD_ID'];
        const repositoryIdColumn = dbEntity.idColumnMap['REPOSITORY_ID'];
        for (const entityValues of jsonInsertValues.V) {
            if (entityValues[actorIdColumn.index] || entityValues[actorIdColumn.index] === 0) {
                throw `Already provided value '${entityValues[actorIdColumn.index]}'
				on insert for @Id '${dbEntity.name}.${actorIdColumn.name}'.
				You cannot explicitly provide a value for ACTOR_ID on Repository row inserts.`;
            }
            if (entityValues[actorRecordIdColumn.index] || entityValues[actorRecordIdColumn.index] === 0) {
                throw `Already provided value '${entityValues[actorRecordIdColumn.index]}' 
				on insert for @Id @GeneratedValue '${dbEntity.name}.${actorRecordIdColumn.name}'.
				You cannot explicitly provide values for generated ids.`;
            }
            if (!entityValues[repositoryIdColumn.index]) {
                throw `Did not provide a positive integer value 
				(instead provided '${entityValues[repositoryIdColumn.index]}')
				 on insert for @Id '${dbEntity.name}.${repositoryIdColumn.name}'.
				 You must explicitly provide a value for REPOSITORY_ID on Repository row inserts.`;
            }
            entityValues[actorIdColumn.index] = actor.id;
            const actorRecordId = this.idGenerator.generateEntityId(dbEntity);
            actorRecordIds.push(actorRecordId);
            entityValues[actorRecordIdColumn.index] = actorRecordId;
        }
        return actorRecordIds;
    }
    /**
     *
     * All repository records must have ids when inserted.  Currently AP doesn't support
     * inserting from select and in the values provided id's must either be explicitly
     * specified or already provided. For all repository entities all ids must be
     * auto-generated.
     *
     * @param {DbEntity} dbEntity
     * @param {PortableQuery} portableQuery
     * @returns {Promise<void>}
     */
    async addInsertHistory(dbEntity, portableQuery, actor) {
        const jsonInsertValues = portableQuery.jsonQuery;
        let operationsByRepo = [];
        let repoTransHistories = [];
        const repositoryIdIndex = dbEntity.columnMap[air_control_1.repositoryEntity.REPOSITORY_ID].index;
        const actorIdIndex = dbEntity.columnMap[air_control_1.repositoryEntity.ACTOR_ID].index;
        const actorRecordIdIndex = dbEntity.columnMap[air_control_1.repositoryEntity.ACTOR_RECORD_ID].index;
        let repositoryIdColumnNumber;
        let actorIdColumnNumber;
        let actorRecordIdColumnNumber;
        for (const columnNumber in jsonInsertValues.C) {
            const columnIndex = jsonInsertValues.C[columnNumber];
            switch (columnIndex) {
                case repositoryIdIndex:
                    repositoryIdColumnNumber = columnNumber;
                    break;
                case actorIdIndex:
                    actorIdColumnNumber = columnNumber;
                    break;
                case actorRecordIdIndex:
                    actorRecordIdColumnNumber = columnNumber;
                    break;
            }
        }
        // Rows may belong to different repositories
        for (const row of jsonInsertValues.V) {
            const repositoryId = row[repositoryIdColumnNumber];
            const repo = await this.repositoryManager.getRepository(repositoryId);
            let repoTransHistory = repoTransHistories[repositoryId];
            if (!repoTransHistory) {
                repoTransHistory = this.historyManager
                    .getNewRepoTransHistory(this.currentTransHistory, repo, actor);
            }
            let operationHistory = operationsByRepo[repositoryId];
            if (!operationHistory) {
                operationHistory = this.repositoryTransactionHistoryDmo.startOperation(repoTransHistory, ground_control_1.ChangeType.INSERT_VALUES, dbEntity);
                operationsByRepo[repositoryId] = operationHistory;
            }
            const actorRecordId = row[actorRecordIdColumnNumber];
            const recordHistory = this.operationHistoryDmo.startRecordHistory(operationHistory, actorRecordId);
            for (const columnNumber in jsonInsertValues.C) {
                if (columnNumber === repositoryIdColumnNumber
                    || columnNumber === actorIdColumnNumber
                    || columnNumber === actorRecordIdColumnNumber) {
                    continue;
                }
                const columnIndex = jsonInsertValues.C[columnNumber];
                const dbColumn = dbEntity.columns[columnIndex];
                const newValue = row[columnNumber];
                this.recordHistoryDmo.addNewValue(recordHistory, dbColumn, newValue);
            }
        }
        // for (const repositoryId in operationsByRepo) {
        // 	const repoTransHistory = await
        // 		this.currentTransHistory.getRepositoryTransaction(
        // 			repositoryId, null, null, null);
        // 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
        // }
    }
};
InsertManager = __decorate([
    typedi_1.Service(InjectionTokens_1.InsertManagerToken),
    __param(0, typedi_1.Inject(_ => air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(_ => InjectionTokens_1.StoreDriverToken)),
    __param(2, typedi_1.Inject(_ => InjectionTokens_1.IdGeneratorToken)),
    __param(3, typedi_1.Inject(_ => InjectionTokens_1.HistoryManagerToken)),
    __param(4, typedi_1.Inject(_ => InjectionTokens_1.OfflineDeltaStoreToken)),
    __param(5, typedi_1.Inject(_ => holding_pattern_1.OperationHistoryDmoToken)),
    __param(6, typedi_1.Inject(_ => holding_pattern_1.RecordHistoryDmoToken)),
    __param(7, typedi_1.Inject(_ => InjectionTokens_1.RepositoryManagerToken)),
    __param(8, typedi_1.Inject(_ => holding_pattern_1.RepositoryTransactionHistoryDmoToken)),
    __param(9, typedi_1.Inject(_ => holding_pattern_1.TransactionHistoryDmoToken)),
    __param(10, typedi_1.Inject(_ => InjectionTokens_1.TransactionManagerToken)),
    __metadata("design:paramtypes", [Object, Object, IdGenerator_1.IdGenerator, Object, Object, holding_pattern_1.OperationHistoryDmo,
        holding_pattern_1.RecordHistoryDmo, Object, holding_pattern_1.RepositoryTransactionHistoryDmo,
        holding_pattern_1.TransactionHistoryDmo, Object])
], InsertManager);
exports.InsertManager = InsertManager;
//# sourceMappingURL=InsertManager.js.map