var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { REPOSITORY_PROPERTY_NAME, } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
// import is reserved for Application use
import { AND, } from '@airport/tarmaq-query';
import { v4 as guidv4 } from "uuid";
let RepositoryManager = class RepositoryManager {
    async initialize() {
    }
    async createRepository(repositoryName) {
        const userSession = await this.terminalSessionManager.getUserSession();
        if (userSession.currentRootTransaction.newRepository) {
            throw new Error(`Cannot create more than one repository per transaction:
Attempting to create a new repository and Operation Context
already contains a new repository.`);
        }
        let repository = await this.createRepositoryRecord(repositoryName, userSession.currentActor);
        userSession.currentRootTransaction.newRepository = repository;
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
    getRepositoryRecord(name, actor) {
        const repository = {
            ageSuitability: 0,
            createdAt: new Date(),
            _localId: null,
            immutable: false,
            name,
            owner: actor.userAccount,
            // platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
            // platformConfig: null,
            repositoryTransactionHistory: [],
            // FIXME: propage the 
            source: actor.application.fullName,
            GUID: guidv4(),
        };
        return repository;
    }
    async createRepositoryRecord(name, actor) {
        const repository = this.getRepositoryRecord(name, actor);
        await this.repositoryDao.save(repository);
        return repository;
    }
    ensureRepositoryScopeOnInsertValues(repository, rawInsertValues) {
        let qEntity = rawInsertValues.INSERT_INTO;
        if (!qEntity.__driver__.dbEntity.isAirEntity) {
            return rawInsertValues;
        }
        let columns = rawInsertValues.columns.slice();
        if (columns.some((column, index) => {
            // return column.fieldName === REPOSITORY_PROPERTY_NAME
            return column.dbProperty.name === REPOSITORY_PROPERTY_NAME;
        })) {
            return rawInsertValues;
        }
        columns.push(qEntity[REPOSITORY_PROPERTY_NAME]);
        let VALUES = rawInsertValues.VALUES.slice();
        for (let i = 0; i < VALUES.length; i++) {
            let row = VALUES[i].slice();
            VALUES[i] = row;
            row.push(repository._localId);
        }
        return {
            INSERT_INTO: qEntity, columns, VALUES
        };
    }
    ensureRepositoryLinkOnUpdateWhere(qEntity, repository, rawUpdate) {
        if (!qEntity.__driver__.dbEntity.isAirEntity) {
            return;
        }
        return {
            UPDATE: rawUpdate.UPDATE,
            SET: rawUpdate.SET,
            WHERE: AND(rawUpdate.WHERE, qEntity.repository._localId.equals(repository._localId))
        };
    }
    ensureRepositoryScopeOnDeleteWhere(qEntity, repository, rawDelete) {
        if (!qEntity.__driver__.dbEntity.isAirEntity) {
            return;
        }
        return {
            DELETE_FROM: rawDelete.DELETE_FROM,
            WHERE: AND(rawDelete.WHERE, qEntity.repository._localId.equals(repository._localId))
        };
    }
};
__decorate([
    Inject()
], RepositoryManager.prototype, "repositoryDao", void 0);
__decorate([
    Inject()
], RepositoryManager.prototype, "terminalSessionManager", void 0);
RepositoryManager = __decorate([
    Injected()
], RepositoryManager);
export { RepositoryManager };
//# sourceMappingURL=RepositoryManager.js.map