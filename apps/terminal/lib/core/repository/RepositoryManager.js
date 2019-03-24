"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const DeltaStore_1 = require("../../data/DeltaStore");
const diTokens_1 = require("../../diTokens");
let RepositoryManager = class RepositoryManager {
    constructor(utils, databaseFacade, repositoryDao) {
        this.utils = utils;
        this.databaseFacade = databaseFacade;
        this.repositoryDao = repositoryDao;
        this.repositoriesById = {};
    }
    async initialize() {
        await this.ensureRepositoryRecords();
        await this.ensureAndCacheRepositories();
        for (let i = 0; i < this.repositories.length; i++) {
            let repository = this.repositories[i];
            this.addDeltaStore(repository);
        }
    }
    async findReposWithDetailsByIds(...repositoryIds) {
        return await this.repositoryDao.findReposWithDetailsByIds(repositoryIds, this.terminal.name, this.userEmail);
    }
    async createRepository(appName, distributionStrategy, offlineStoreType, platformType, platformConfig, recordIdField) {
        let repository = await this.createRepositoryRecord(appName, distributionStrategy, platformType, platformConfig);
        this.addDeltaStore(repository);
        return repository;
    }
    async getRepository(repositoryId) {
        throw `not implemented`;
    }
    getActor(actorId) {
        throw `not implemented`;
    }
    goOffline() {
        for (let repositoryId in this.deltaStore) {
            let deltaStore = this.deltaStore[repositoryId];
            deltaStore.goOffline();
        }
    }
    getUpdateState(repository) {
        return this.deltaStore[repository.id].updateState;
    }
    setUpdateStateForAll(updateState) {
        for (let repositoryId in this.deltaStore) {
            let deltaStore = this.deltaStore[repositoryId];
            deltaStore.updateState = updateState;
        }
    }
    setUpdateState(repository, updateState) {
        let deltaStore = this.deltaStore[repository.id];
        deltaStore.updateState = updateState;
    }
    getDeltaStore(repository) {
        return this.deltaStore[repository.id];
    }
    async ensureRepositoryRecords() {
        this.repositories = await this.repositoryDao.find.tree({
            select: {}
        });
        /*
                if (!this.repositories.length) {
                    let deltaStoreConfig = config.deltaStoreConfig;
                    if (!deltaStoreConfig) {
                        throw `Delta store is not configured`;
                    }
                    let repository = await this.createRepositoryRecord(config.appName,
                        deltaStoreConfig.changeListConfig.distributionStrategy,
                        deltaStoreConfig.offlineDeltaStore.type,
                        deltaStoreConfig.setupInfo.platformType);
                }
                */
    }
    addDeltaStore(repository) {
        let sharingAdaptor = DeltaStore_1.getSharingAdaptor(repository.platform);
        let jsonDeltaStoreConfig = {
            changeList: {
                distributionStrategy: repository.distributionStrategy
            },
            offlineDeltaStore: {
                type: this.databaseFacade.storeType
            },
            recordIdField: 'id',
            platform: repository.platform
        };
        if (repository.platformConfig) {
            let platformConfig = JSON.parse(repository.platformConfig);
            jsonDeltaStoreConfig = { ...jsonDeltaStoreConfig, ...platformConfig };
        }
        let deltaStoreConfig = new terminal_map_1.DeltaStoreConfig(jsonDeltaStoreConfig);
        let deltaStore = new DeltaStore_1.DeltaStore(deltaStoreConfig, sharingAdaptor);
        deltaStore.config.changeListConfig.changeListInfo.dbId = this.databaseFacade.name;
        this.deltaStore[repository.id] = deltaStore;
        return deltaStore;
    }
    async createRepositoryRecord(appName, distributionStrategy, platformType, platformConfig) {
        const repository = {
            distributionStrategy: distributionStrategy,
            id: null,
            lastSyncedTransaction: null,
            localDatabase: null,
            name: appName,
            platform: platformType,
            platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
            repositoryDatabases: null,
            repositoryUsers: null,
            transactionHistory: null,
            url: null,
        };
        await this.repositoryDao.create(repository);
        this.repositories.push(repository);
        return repository;
    }
    async ensureAndCacheRepositories() {
        this.repositories = await this.repositoryDao.find.tree({
            select: {}
        });
        this.repositories.forEach((repository) => {
            this.repositoriesById[repository.id] = repository;
        });
    }
    startEnsureGraphInSingleRepository(transaction) {
        // TODO: add to transaction for remote execution
        // (EntityChangeType.QUERY_UNIQUE_RECORD) transaction.addNewFindOneVerify();
    }
    getOnlyRepositoryInDatabase() {
        if (this.repositories.length !== 1) {
            throw `Do not have "Only" repository - more than one repository found.`;
        }
        return this.repositories[0];
    }
    ensureRepositoryScopeOnInsertValues(repository, rawInsertValues) {
        let qEntity = rawInsertValues.insertInto;
        if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
            return rawInsertValues;
        }
        let columns = rawInsertValues.columns.slice();
        if (columns.some((column, index) => {
            return column.fieldName === REPOSITORY_FIELD;
        })) {
            return rawInsertValues;
        }
        columns.push(qEntity[REPOSITORY_FIELD]);
        let values = rawInsertValues.values.slice();
        for (let i = 0; i < values.length; i++) {
            let row = values[i].slice();
            values[i] = row;
            row.push(repository.id);
        }
        return {
            insertInto: qEntity,
            columns: columns,
            values: values
        };
    }
    ensureRepositoryLinkOnUpdateWhere(qEntity, repository, rawUpdate) {
        if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
            return;
        }
        return {
            update: rawUpdate.update,
            set: rawUpdate.set,
            where: air_control_1.and(rawUpdate.where, qEntity.repository.id.equals(repository.id))
        };
    }
    ensureRepositoryScopeOnDeleteWhere(qEntity, repository, rawDelete) {
        if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
            return;
        }
        return {
            deleteFrom: rawDelete.deleteFrom,
            where: air_control_1.and(rawDelete.where, qEntity.repository.id.equals(repository.id))
        };
    }
};
RepositoryManager = __decorate([
    __param(0, Inject(_ => UtilsToken)),
    __param(1, Inject(_ => EntityManagerToken)),
    __param(2, Inject(_ => RepositoryDaoToken))
], RepositoryManager);
exports.RepositoryManager = RepositoryManager;
di_1.DI.set(diTokens_1.REPOSITORY_MANAGER, RepositoryManager);
//# sourceMappingURL=RepositoryManager.js.map