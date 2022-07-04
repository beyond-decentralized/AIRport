var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and, } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { REPOSITORY_FIELD, } from '@airport/terminal-map';
import { v4 as guidv4 } from "uuid";
let RepositoryManager = class RepositoryManager {
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
            _localId: null,
            immutable: false,
            owner: actor.user,
            // platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
            // platformConfig: null,
            repositoryTransactionHistory: [],
            source: 'localhost:9000',
            GUID: guidv4(),
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
        if (!qEntity.__driver__.dbEntity.isAirEntity) {
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
            row.push(repository._localId);
        }
        return {
            insertInto: qEntity, columns: columns, values: values
        };
    }
    ensureRepositoryLinkOnUpdateWhere(qEntity, repository, rawUpdate) {
        if (!qEntity.__driver__.dbEntity.isAirEntity) {
            return;
        }
        return {
            update: rawUpdate.update,
            set: rawUpdate.set,
            where: and(rawUpdate.where, qEntity.repository._localId.equals(repository._localId))
        };
    }
    ensureRepositoryScopeOnDeleteWhere(qEntity, repository, rawDelete) {
        if (!qEntity.__driver__.dbEntity.isAirEntity) {
            return;
        }
        return {
            deleteFrom: rawDelete.deleteFrom,
            where: and(rawDelete.where, qEntity.repository._localId.equals(repository._localId))
        };
    }
};
__decorate([
    Inject()
], RepositoryManager.prototype, "repositoryDao", void 0);
RepositoryManager = __decorate([
    Injected()
], RepositoryManager);
export { RepositoryManager };
//# sourceMappingURL=RepositoryManager.js.map