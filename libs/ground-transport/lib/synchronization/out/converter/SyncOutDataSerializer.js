var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { airEntity } from "@airport/ground-control";
import { RepositoryTransactionType } from "@airport/holding-pattern/lib/to_be_generated/runtime-index";
export const WITH_ID = {};
export const WITH_RECORD_HISTORY = {};
export const WITH_INDEX = {};
let SyncOutDataSerializer = class SyncOutDataSerializer {
    async serialize(repositoryTransactionHistories) {
        let historiesToSend = [];
        const messages = [];
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            if (repositoryTransactionHistory.repositoryTransactionType !== RepositoryTransactionType.LOCAL) {
                continue;
            }
            const message = await this.serializeMessage(repositoryTransactionHistory);
            historiesToSend.push(repositoryTransactionHistory);
            messages.push(message);
        }
        return {
            historiesToSend,
            messages
        };
    }
    async serializeMessage(repositoryTransactionHistory) {
        const lookups = {
            actorInMessageIndexesById: new Map(),
            applicationVersionInMessageIndexesById: new Map(),
            applicationVersions: [],
            lastInMessageActorIndex: -1,
            lastInMessageApplicationVersionIndex: -1,
            lastInMessageRepositoryIndex: -1,
            messageRepository: repositoryTransactionHistory.repository,
            repositoryInMessageIndexesById: new Map()
        };
        const inMessageUserAccountLookup = {
            inMessageIndexesById: new Map(),
            lastInMessageIndex: -1
        };
        const message = {
            actors: [],
            applicationVersions: [],
            applications: [],
            history: null,
            // Repositories may reference records in other repositories
            referencedRepositories: [],
            userAccounts: [],
            terminals: []
        };
        message.history = this.serializeRepositoryTransactionHistory(repositoryTransactionHistory, message, lookups, inMessageUserAccountLookup);
        // TODO: replace db lookups with TerminalState lookups where possible
        await this.serializeRepositories(repositoryTransactionHistory, message, lookups, inMessageUserAccountLookup);
        const inMessageApplicationLookup = await this.serializeActorsUserAccountsAndTerminals(message, lookups, inMessageUserAccountLookup);
        await this.serializeApplicationsAndVersions(message, inMessageApplicationLookup, lookups);
        return message;
    }
    async serializeActorsUserAccountsAndTerminals(message, lookups, inMessageUserAccountLookup) {
        let actorIdsToFindBy = [];
        for (let actorId of lookups.actorInMessageIndexesById.keys()) {
            actorIdsToFindBy.push(actorId);
        }
        const actors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(actorIdsToFindBy);
        this.serializeUserAccounts(actors, message, inMessageUserAccountLookup);
        const terminalInMessageIndexesById = this.serializeTerminals(actors, message, inMessageUserAccountLookup);
        const inMessageApplicationLookup = {
            lastInMessageIndex: -1,
            inMessageIndexesById: new Map()
        };
        for (const actor of actors) {
            const applicationInMessageIndex = this.serializeApplication(actor.application, inMessageApplicationLookup, message);
            const actorInMessageIndex = lookups.actorInMessageIndexesById.get(actor._localId);
            message.actors[actorInMessageIndex] = {
                ...WITH_ID,
                application: applicationInMessageIndex,
                terminal: terminalInMessageIndexesById.get(actor.terminal._localId),
                userAccount: inMessageUserAccountLookup.inMessageIndexesById.get(actor.userAccount._localId),
                GUID: actor.GUID
            };
        }
        return inMessageApplicationLookup;
    }
    serializeTerminals(actors, message, inMessageUserAccountLookup) {
        let lastInMessageTerminalIndex = -1;
        const terminalInMessageIndexesById = new Map();
        for (const actor of actors) {
            let terminal = actor.terminal;
            if (terminalInMessageIndexesById.has(terminal._localId)) {
                continue;
            }
            const terminalInMessageIndex = ++lastInMessageTerminalIndex;
            terminalInMessageIndexesById.set(terminal._localId, terminalInMessageIndex);
            message.terminals[terminalInMessageIndex] = {
                ...WITH_ID,
                GUID: terminal.GUID,
                owner: inMessageUserAccountLookup.inMessageIndexesById.get(terminal.owner._localId)
            };
        }
        return terminalInMessageIndexesById;
    }
    serializeUserAccounts(actors, message, inMessageUserAccountLookup) {
        for (const actor of actors) {
            this.addUserAccountToMessage(actor.userAccount, message, inMessageUserAccountLookup);
            this.addUserAccountToMessage(actor.terminal.owner, message, inMessageUserAccountLookup);
        }
    }
    addUserAccountToMessage(userAccount, message, inMessageUserAccountLookup) {
        let userAccountInMessageIndex = this.getUserAccountInMessageIndex(userAccount, inMessageUserAccountLookup);
        message.userAccounts[userAccountInMessageIndex] = {
            ...WITH_ID,
            username: userAccount.username,
            GUID: userAccount.GUID
        };
        return userAccountInMessageIndex;
    }
    getUserAccountInMessageIndex(userAccount, inMessageUserAccountLookup) {
        if (inMessageUserAccountLookup.inMessageIndexesById.has(userAccount._localId)) {
            return inMessageUserAccountLookup.inMessageIndexesById.get(userAccount._localId);
        }
        let userAccountInMessageIndex = ++inMessageUserAccountLookup.lastInMessageIndex;
        inMessageUserAccountLookup.inMessageIndexesById.set(userAccount._localId, userAccountInMessageIndex);
        return userAccountInMessageIndex;
    }
    async serializeRepositories(repositoryTransactionHistory, message, lookups, inMessageUserAccountLookup) {
        let repositoryIdsToFindBy = [];
        for (let repositoryId of lookups.repositoryInMessageIndexesById.keys()) {
            repositoryIdsToFindBy.push(repositoryId);
        }
        repositoryIdsToFindBy.push(repositoryTransactionHistory._localId);
        const repositories = await this.repositoryDao.findWithOwnerBy_LocalIds(repositoryIdsToFindBy);
        for (const repository of repositories) {
            let userAccountInMessageIndex = this.getUserAccountInMessageIndex(repository.owner, inMessageUserAccountLookup);
            if (lookups.repositoryInMessageIndexesById.has(repository._localId)) {
                const repositoryInMessageIndex = lookups.repositoryInMessageIndexesById.get(repository._localId);
                message.referencedRepositories[repositoryInMessageIndex] =
                    this.serializeRepository(repository, userAccountInMessageIndex);
            }
            else {
                if (typeof message.history.repository !== 'string') {
                    message.history.repository.owner = userAccountInMessageIndex;
                    message.history.repository._localId = repository._localId;
                }
            }
        }
    }
    serializeApplicationsAndVersions(message, inMessageApplicationLookup, lookups) {
        for (let i = 0; i < lookups.applicationVersions.length; i++) {
            const applicationVersion = lookups.applicationVersions[i];
            const applicationInMessageIndex = this.serializeApplication(applicationVersion.application, inMessageApplicationLookup, message);
            message.applicationVersions[i] = {
                ...WITH_ID,
                application: applicationInMessageIndex,
                integerVersion: applicationVersion.integerVersion
            };
        }
    }
    serializeApplication(application, inMessageApplicationLookup, message) {
        let applicationInMessageIndex;
        if (inMessageApplicationLookup.inMessageIndexesById.has(application.index)) {
            applicationInMessageIndex = inMessageApplicationLookup
                .inMessageIndexesById.get(application.index);
        }
        else {
            applicationInMessageIndex = ++inMessageApplicationLookup.lastInMessageIndex;
            inMessageApplicationLookup.inMessageIndexesById
                .set(application.index, applicationInMessageIndex);
            message.applications[applicationInMessageIndex] = {
                ...WITH_INDEX,
                domain: {
                    ...WITH_ID,
                    name: application.domain.name
                },
                name: application.name
            };
        }
        return applicationInMessageIndex;
    }
    serializeRepositoryTransactionHistory(repositoryTransactionHistory, message, lookups, inMessageUserAccountLookup) {
        repositoryTransactionHistory.operationHistory.sort((operationHistory1, operationHistory2) => {
            if (operationHistory1.orderNumber < operationHistory2.orderNumber) {
                return -1;
            }
            if (operationHistory1.orderNumber > operationHistory2.orderNumber) {
                return 1;
            }
            return 0;
        });
        const serializedOperationHistory = [];
        for (const operationHistory of repositoryTransactionHistory.operationHistory) {
            serializedOperationHistory.push(this.serializeOperationHistory(operationHistory, lookups));
        }
        return {
            ...WITH_ID,
            isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
            repository: this.serializeHistoryRepository(repositoryTransactionHistory, message, inMessageUserAccountLookup),
            operationHistory: serializedOperationHistory,
            saveTimestamp: repositoryTransactionHistory.saveTimestamp,
            GUID: repositoryTransactionHistory.GUID
        };
    }
    serializeHistoryRepository(repositoryTransactionHistory, message, inMessageUserAccountLookup) {
        if (repositoryTransactionHistory.isRepositoryCreation) {
            const repository = repositoryTransactionHistory.repository;
            let userAccountInMessageIndex = this.addUserAccountToMessage(repository.owner, message, inMessageUserAccountLookup);
            return this.serializeRepository(repository, userAccountInMessageIndex);
        }
        else {
            // When this repositoryTransactionHistory processed at sync-in 
            // the repository should already be loaded in the target database
            // if it's not then it's missing the repositoryTransactionHistory
            // with isRepositoryCreation === true
            return repositoryTransactionHistory.repository.GUID;
        }
    }
    serializeOperationHistory(operationHistory, lookups) {
        const dbEntity = operationHistory.entity;
        const serializedRecordHistory = [];
        for (const recordHistory of operationHistory.recordHistory) {
            serializedRecordHistory.push(this.serializeRecordHistory(operationHistory, recordHistory, dbEntity, lookups));
        }
        const entity = operationHistory.entity;
        // Should be populated - coming from TerminalStore
        // if (typeof entity !== 'object') {
        // 	throw new Error(`OperationHistory.entity must be populated`)
        // }
        // if (typeof entity.index !== 'number') {
        // 	throw new Error(`OperationHistory.entity.index must be present`)
        // }
        const applicationVersion = entity.applicationVersion;
        // Should be populated - coming from TerminalStore
        // if (typeof applicationVersion !== 'object') {
        // 	throw new Error(`OperationHistory.entity.applicationVersion must be populated`)
        // }
        // if (typeof applicationVersion._localId !== 'number') {
        // 	throw new Error(`OperationHistory.entity.applicationVersion._localId must be present`)
        // }
        let applicationVersionInMessageIndex;
        if (lookups.applicationVersionInMessageIndexesById.has(applicationVersion._localId)) {
            applicationVersionInMessageIndex = lookups.applicationVersionInMessageIndexesById.get(applicationVersion._localId);
        }
        else {
            applicationVersionInMessageIndex = ++lookups.lastInMessageApplicationVersionIndex;
            lookups.applicationVersionInMessageIndexesById.set(applicationVersion._localId, applicationVersionInMessageIndex);
        }
        lookups.applicationVersions[applicationVersionInMessageIndex] = applicationVersion;
        return {
            ...WITH_ID,
            actor: this.getActorInMessageIndex(operationHistory.actor, lookups),
            changeType: operationHistory.changeType,
            entity: {
                ...WITH_ID,
                applicationVersion: applicationVersionInMessageIndex,
                index: operationHistory.entity.index
            },
            recordHistory: serializedRecordHistory
        };
    }
    serializeRecordHistory(operationHistory, recordHistory, dbEntity, lookups) {
        const dbColumMapByIndex = new Map();
        for (const dbColumn of dbEntity.columns) {
            dbColumMapByIndex.set(dbColumn.index, dbColumn);
        }
        const newValues = [];
        for (const newValue of recordHistory.newValues) {
            const dbColumn = dbColumMapByIndex.get(newValue.columnIndex);
            newValues.push(this.serializeNewValue(newValue, dbColumn, lookups));
        }
        const oldValues = [];
        for (const oldValue of recordHistory.oldValues) {
            const dbColumn = dbColumMapByIndex.get(oldValue.columnIndex);
            oldValues.push(this.serializeOldValue(oldValue, dbColumn, lookups));
        }
        const actor = recordHistory.actor;
        // Actor may be null if it's the same actor as for RepositoryTransactionHistory
        // if (typeof actor !== 'object') {
        // 	throw new Error(`RecordHistory.actor must be populated`)
        // }
        const baseObject = {
            ...WITH_ID,
        };
        if (actor._localId !== operationHistory.actor._localId) {
            baseObject.actor = this.getActorInMessageIndex(actor, lookups);
        }
        if (newValues.length) {
            baseObject.newValues = newValues;
        }
        if (oldValues.length) {
            baseObject.oldValues = oldValues;
        }
        return {
            ...baseObject,
            _actorRecordId: recordHistory._actorRecordId,
        };
    }
    getActorInMessageIndex(actor, lookups) {
        if (!actor) {
            return null;
        }
        return this.getActorInMessageIndexById(actor._localId, lookups);
    }
    getActorInMessageIndexById(actorId, lookups) {
        let actorInMessageIndex;
        if (lookups.actorInMessageIndexesById.has(actorId)) {
            actorInMessageIndex = lookups.actorInMessageIndexesById.get(actorId);
        }
        else {
            actorInMessageIndex = ++lookups.lastInMessageActorIndex;
            lookups.actorInMessageIndexesById.set(actorId, actorInMessageIndex);
        }
        return actorInMessageIndex;
    }
    serializeNewValue(newValue, dbColumn, lookups) {
        return this.serializeValue(newValue, dbColumn, lookups, 'newValue');
    }
    serializeOldValue(oldValue, dbColumn, lookups) {
        return this.serializeValue(oldValue, dbColumn, lookups, 'oldValue');
    }
    serializeValue(valueRecord, dbColumn, lookups, valueFieldName) {
        let value = valueRecord[valueFieldName];
        let serailizedValue = value;
        switch (dbColumn.name) {
            case airEntity.ORIGINAL_ACTOR_ID: {
                serailizedValue = this.getActorInMessageIndexById(value, lookups);
                break;
            }
            case airEntity.ORIGINAL_REPOSITORY_ID: {
                serailizedValue = this.getSerializedRepositoryId(value, lookups);
                break;
            }
        }
        if (/.*_AID_[\d]+$/.test(dbColumn.name)
            && dbColumn.manyRelationColumns.length) {
            serailizedValue = this.getActorInMessageIndexById(value, lookups);
        }
        if (/.*_RID_[\d]+$/.test(dbColumn.name)
            && dbColumn.manyRelationColumns.length) {
            serailizedValue = this.getSerializedRepositoryId(value, lookups);
        }
        return {
            ...WITH_RECORD_HISTORY,
            columnIndex: valueRecord.columnIndex,
            [valueFieldName]: serailizedValue
        };
    }
    getSerializedRepositoryId(value, lookups) {
        if (value === lookups.messageRepository._localId) {
            return -1;
        }
        let serailizedValue = lookups.repositoryInMessageIndexesById.get(value);
        if (serailizedValue === undefined) {
            lookups.lastInMessageRepositoryIndex++;
            serailizedValue = lookups.lastInMessageRepositoryIndex;
            lookups.repositoryInMessageIndexesById.set(value, serailizedValue);
        }
        return serailizedValue;
    }
    serializeRepository(repository, owner) {
        return {
            ...WITH_ID,
            ageSuitability: repository.ageSuitability,
            createdAt: repository.createdAt,
            immutable: repository.immutable,
            owner,
            source: repository.source,
            GUID: repository.GUID
        };
    }
};
__decorate([
    Inject()
], SyncOutDataSerializer.prototype, "actorDao", void 0);
__decorate([
    Inject()
], SyncOutDataSerializer.prototype, "repositoryDao", void 0);
SyncOutDataSerializer = __decorate([
    Injected()
], SyncOutDataSerializer);
export { SyncOutDataSerializer };
//# sourceMappingURL=SyncOutDataSerializer.js.map