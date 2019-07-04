"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const DeltaStore_1 = require("../../data/DeltaStore");
const diTokens_1 = require("../../diTokens");
class RepositoryManager {
    constructor() {
        this.repositoriesById = {};
    }
    async initialize() {
        await this.ensureRepositoryRecords();
        await this.ensureAndCacheRepositories();
        for (let i = 0; i < this.repositories.length; i++) {
            let repository = this.repositories[i];
            await this.addDeltaStore(repository);
        }
    }
    async findReposWithDetailsByIds(...repositoryIds) {
        const repositoryDao = await di_1.DI.get(holding_pattern_1.REPOSITORY_DAO);
        return await repositoryDao.findReposWithDetailsByIds(repositoryIds, this.terminal.name, this.userEmail);
    }
    async createRepository(appName, distributionStrategy, offlineStoreType, platformType, platformConfig, recordIdField) {
        let repository = await this.createRepositoryRecord(appName, distributionStrategy, platformType, platformConfig);
        await this.addDeltaStore(repository);
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
        const repositoryDao = await di_1.DI.get(holding_pattern_1.REPOSITORY_DAO);
        // TODO: verify that we want to get ALL of the repositories
        this.repositories = await repositoryDao.db.find.tree({
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
    async addDeltaStore(repository) {
        // TODO: revisit configuration (instead of hard-coding
        // let sharingAdaptor                             =
        // getSharingAdaptor(repository.platform)
        let sharingAdaptor = DeltaStore_1.getSharingAdaptor(terminal_map_1.PlatformType.OFFLINE);
        let jsonDeltaStoreConfig = {
            changeList: {
                // distributionStrategy: repository.distributionStrategy
                distributionStrategy: terminal_map_1.DistributionStrategy.S3_SECURE_POLL
            },
            offlineDeltaStore: {
                // type: this.dbFacade.storeType
                type: ground_control_1.StoreType.SQLITE_CORDOVA
            },
            recordIdField: 'id',
            // platform: repository.platform
            platform: terminal_map_1.PlatformType.OFFLINE
        };
        if (repository.platformConfig) {
            let platformConfig = JSON.parse(repository.platformConfig);
            jsonDeltaStoreConfig = { ...jsonDeltaStoreConfig, ...platformConfig };
        }
        let deltaStoreConfig = new terminal_map_1.DeltaStoreConfig(jsonDeltaStoreConfig);
        let deltaStore = new DeltaStore_1.DeltaStore(deltaStoreConfig, sharingAdaptor);
        const dbFacade = await di_1.DI.get(air_control_1.DB_FACADE);
        deltaStore.config.changeListConfig.changeListInfo.dbId = dbFacade.name;
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
        const repositoryDao = await di_1.DI.get(holding_pattern_1.REPOSITORY_DAO);
        await repositoryDao.create(repository);
        this.repositories.push(repository);
        return repository;
    }
    async ensureAndCacheRepositories() {
        const repositoryDao = await di_1.DI.get(holding_pattern_1.REPOSITORY_DAO);
        this.repositories = await repositoryDao.db.find.tree({
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
            // return column.fieldName === REPOSITORY_FIELD
            return column.dbProperty.name === terminal_map_1.REPOSITORY_FIELD;
        })) {
            return rawInsertValues;
        }
        columns.push(qEntity[terminal_map_1.REPOSITORY_FIELD]);
        let values = rawInsertValues.values.slice();
        for (let i = 0; i < values.length; i++) {
            let row = values[i].slice();
            values[i] = row;
            row.push(repository.id);
        }
        return {
            insertInto: qEntity, columns: columns, values: values
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
}
exports.RepositoryManager = RepositoryManager;
di_1.DI.set(diTokens_1.REPOSITORY_MANAGER, RepositoryManager);
//# sourceMappingURL=RepositoryManager.js.map