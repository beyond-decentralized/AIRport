import { and, } from '@airport/air-control';
import { REPOSITORY_FIELD, } from '@airport/terminal-map';
import { v4 as uuidv4 } from "uuid";
export class RepositoryManager {
    async initialize() {
    }
    async createRepository(actor, context) {
        if (context.newRepository) {
            throw new Error(`Cannot create more than one repository per transaction:
Attempting to create a new repository and Operation Context
already contains a new repository.`);
        }
        let repository = await this.createRepositoryRecord(actor, context);
        context.newRepository = repository;
        return repository;
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
    getRepositoryRecord(actor) {
        const repository = {
            ageSuitability: 0,
            createdAt: new Date(),
            id: null,
            immutable: false,
            owner: actor.user,
            // platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
            // platformConfig: null,
            repositoryTransactionHistory: [],
            source: 'localhost:9000',
            uuId: uuidv4(),
        };
        return repository;
    }
    async createRepositoryRecord(actor, context) {
        const repository = this.getRepositoryRecord(actor);
        await this.repositoryDao.save(repository, context);
        return repository;
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
//# sourceMappingURL=RepositoryManager.js.map