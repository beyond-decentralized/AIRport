import { and, DATABASE_FACADE, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { StoreType } from '@airport/ground-control';
import { REPOSITORY_DAO } from '@airport/holding-pattern';
import { DeltaStoreConfig, DistributionStrategy, PlatformType, REPOSITORY_FIELD, } from '@airport/terminal-map';
import { DeltaStore, getSharingAdaptor } from '../../data/DeltaStore';
import { REPOSITORY_MANAGER } from '../../tokens';
export class RepositoryManager {
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
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        return await repositoryDao.findReposWithDetailsByIds(repositoryIds, this.terminal.name, this.userEmail);
    }
    async createRepository(appName, distributionStrategy, offlineStoreType, platformType, platformConfig, recordIdField) {
        let repository = await this.createRepositoryRecord(appName, distributionStrategy, platformType, platformConfig);
        await this.addDeltaStore(repository);
        return repository;
    }
    async getRepository(repositoryId) {
        throw new Error(`not implemented`);
    }
    getActor(actorId) {
        throw new Error(`not implemented`);
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
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        // TODO: verify that we want to get ALL of the repositories
        this.repositories = await repositoryDao.db.find.tree({
            select: {}
        });
        /*
                        if (!this.repositories.length) {
                                let deltaStoreConfig = config.deltaStoreConfig;
                                if (!deltaStoreConfig) {
                                        throw new Error(`Delta store is not configured`);
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
        let sharingAdaptor = getSharingAdaptor(PlatformType.OFFLINE);
        let jsonDeltaStoreConfig = {
            changeList: {
                // distributionStrategy: repository.distributionStrategy
                distributionStrategy: DistributionStrategy.S3_SECURE_POLL
            },
            offlineDeltaStore: {
                // type: this.dbFacade.storeType
                type: StoreType.SQLITE
            },
            recordIdField: 'id',
            // platform: repository.platform
            platform: PlatformType.OFFLINE
        };
        if (repository.platformConfig) {
            let platformConfig = JSON.parse(repository.platformConfig);
            jsonDeltaStoreConfig = { ...jsonDeltaStoreConfig, ...platformConfig };
        }
        let deltaStoreConfig = new DeltaStoreConfig(jsonDeltaStoreConfig);
        let deltaStore = new DeltaStore(deltaStoreConfig, sharingAdaptor);
        const dbFacade = await container(this)
            .get(DATABASE_FACADE);
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
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        await repositoryDao.save(repository);
        this.repositories.push(repository);
        return repository;
    }
    async ensureAndCacheRepositories() {
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
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
            throw new Error(`Do not have "Only" repository - more than one repository found.`);
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
            return column.dbProperty.name === REPOSITORY_FIELD;
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
            where: and(rawUpdate.where, qEntity.repository.id.equals(repository.id))
        };
    }
    ensureRepositoryScopeOnDeleteWhere(qEntity, repository, rawDelete) {
        if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
            return;
        }
        return {
            deleteFrom: rawDelete.deleteFrom,
            where: and(rawDelete.where, qEntity.repository.id.equals(repository.id))
        };
    }
}
DI.set(REPOSITORY_MANAGER, RepositoryManager);
//# sourceMappingURL=RepositoryManager.js.map