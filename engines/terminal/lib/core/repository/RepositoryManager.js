import { and, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { REPOSITORY_ACTOR_DAO, REPOSITORY_DAO, SyncPriority } from '@airport/holding-pattern';
import { REPOSITORY_FIELD, } from '@airport/terminal-map';
import { v4 as uuidv4 } from "uuid";
import { REPOSITORY_MANAGER } from '../../tokens';
export class RepositoryManager {
    constructor() {
        this.repositories = [];
        this.repositoriesById = {};
    }
    async initialize() {
        await this.ensureRepositoryRecords();
        await this.ensureAndCacheRepositories();
    }
    async findReposWithDetailsByIds(...repositoryIds) {
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        return await repositoryDao.findReposWithDetailsByIds(repositoryIds, this.terminal.uuId, this.userEmail);
    }
    async createRepository(actor) {
        let repository = await this.createRepositoryRecord(actor);
        return repository;
    }
    async getRepository(repositoryId) {
        throw new Error(`not implemented`);
    }
    getActor(actorId) {
        throw new Error(`not implemented`);
    }
    goOffline() {
        throw new Error(`not implemented`);
    }
    getUpdateState(repository) {
        throw new Error(`not implemented`);
    }
    setUpdateStateForAll(updateState) {
        throw new Error(`not implemented`);
    }
    setUpdateState(repository, updateState) {
        throw new Error(`not implemented`);
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
    getRepositoryRecord(actor) {
        const repository = {
            ageSuitability: 0,
            createdAt: new Date(),
            id: null,
            ownerActor: actor,
            // platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
            // platformConfig: null,
            repositoryActors: [],
            repositoryTransactionHistory: [],
            source: 'localhost:8080',
            syncPriority: SyncPriority.NORMAL,
            uuId: uuidv4(),
        };
        return repository;
    }
    async createRepositoryRecord(actor
    // distributionStrategy: DistributionStrategy,
    // platformType: PlatformType,
    // platformConfig: any,
    ) {
        const repository = this.getRepositoryRecord(actor);
        const repositoryActor = {
            actor,
            id: null,
            repository
        };
        const [repositoryDao, repositoryActorDao] = await container(this)
            .get(REPOSITORY_DAO, REPOSITORY_ACTOR_DAO);
        await repositoryDao.save(repository);
        await repositoryActorDao.save(repositoryActor);
        // const repositoryDao = await container(this).get(REPOSITORY_DAO)
        // await repositoryDao.save(repository)
        repository.repositoryActors.push(repositoryActor);
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