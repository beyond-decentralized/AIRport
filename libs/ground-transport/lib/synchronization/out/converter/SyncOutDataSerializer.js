import { container, DI } from "@airport/di";
import { repositoryEntity } from "@airport/ground-control";
import { ACTOR_DAO, RepositoryTransactionType, REPOSITORY_DAO } from "@airport/holding-pattern";
import { SYNC_OUT_DATA_SERIALIZER } from "../../../tokens";
export const WITH_ID = {};
export const WITH_RECORD_HISTORY = {};
export const WITH_INDEX = {};
export class SyncOutDataSerializer {
    async serialize(repositoryTransactionHistories) {
        const repositorySynchronizationMessages = [];
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            if (repositoryTransactionHistory.repositoryTransactionType !== RepositoryTransactionType.LOCAL) {
                continue;
            }
            const message = await this.serializeMessage(repositoryTransactionHistory);
            repositorySynchronizationMessages.push(message);
        }
        return repositorySynchronizationMessages;
    }
    async serializeMessage(repositoryTransactionHistory) {
        const lookups = {
            actorInMessageIndexesById: new Map(),
            applicationVersionInMessageIndexesById: new Map(),
            applicationVersions: [],
            lastInMessageActorIndex: -1,
            lastInMessageApplicationVersionIndex: -1,
            lastInMessageRepositoryIndex: -1,
            repositoryInMessageIndexesById: new Map()
        };
        const message = {
            actors: [],
            applicationVersions: [],
            applications: [],
            history: this.serializeRepositoryTransactionHistory(repositoryTransactionHistory, lookups),
            // Repositories may reference records in other repositories
            referencedRepositories: [],
            users: [],
            terminals: []
        };
        const inMessageUserLookup = {
            inMessageIndexesById: new Map(),
            lastInMessageIndex: -1
        };
        // TODO: replace db lookups with TerminalState lookups where possible
        await this.serializeRepositories(repositoryTransactionHistory, message, lookups, inMessageUserLookup);
        const inMessageApplicationLookup = await this.serializeActorsUsersAndTerminals(message, lookups, inMessageUserLookup);
        await this.serializeApplicationsAndVersions(message, inMessageApplicationLookup, lookups);
        return message;
    }
    async serializeActorsUsersAndTerminals(message, lookups, inMessageUserLookup) {
        let actorIdsToFindBy = [];
        for (let actorId of lookups.actorInMessageIndexesById.keys()) {
            actorIdsToFindBy.push(actorId);
        }
        const actorDao = await container(this).get(ACTOR_DAO);
        const actors = await actorDao.findWithDetailsAndGlobalIdsByIds(actorIdsToFindBy);
        this.serializeUsers(actors, message, inMessageUserLookup);
        const terminalInMessageIndexesById = this.serializeTerminals(actors, message, inMessageUserLookup);
        const inMessageApplicationLookup = {
            lastInMessageIndex: -1,
            inMessageIndexesById: new Map()
        };
        for (const actor of actors) {
            const applicationInMessageIndex = this.serializeApplication(actor.application, inMessageApplicationLookup, message);
            const actorInMessageIndex = lookups.actorInMessageIndexesById.get(actor.id);
            message.actors[actorInMessageIndex] = {
                ...WITH_ID,
                application: applicationInMessageIndex,
                terminal: terminalInMessageIndexesById.get(actor.terminal.id),
                user: inMessageUserLookup.inMessageIndexesById.get(actor.user.id),
                uuId: actor.uuId
            };
        }
        return inMessageApplicationLookup;
    }
    serializeTerminals(actors, message, inMessageUserLookup) {
        let lastInMessageTerminalIndex = -1;
        const terminalInMessageIndexesById = new Map();
        for (const actor of actors) {
            let terminal = actor.terminal;
            if (terminalInMessageIndexesById.has(terminal.id)) {
                continue;
            }
            const terminalInMessageIndex = ++lastInMessageTerminalIndex;
            terminalInMessageIndexesById.set(terminal.id, terminalInMessageIndex);
            message.terminals[terminalInMessageIndex] = {
                ...WITH_ID,
                uuId: terminal.uuId,
                owner: inMessageUserLookup.inMessageIndexesById.get(terminal.owner.id)
            };
        }
        return terminalInMessageIndexesById;
    }
    serializeUsers(actors, message, inMessageUserLookup) {
        for (const actor of actors) {
            this.addUserToMessage(actor.user, message, inMessageUserLookup);
            this.addUserToMessage(actor.terminal.owner, message, inMessageUserLookup);
        }
    }
    addUserToMessage(user, message, inMessageUserLookup) {
        let userInMessageIndex = this.getUserInMessageIndex(user, inMessageUserLookup);
        message.users[userInMessageIndex] = {
            ...WITH_ID,
            username: user.username,
            uuId: user.uuId
        };
    }
    getUserInMessageIndex(user, inMessageUserLookup) {
        if (inMessageUserLookup.inMessageIndexesById.has(user.id)) {
            return inMessageUserLookup.inMessageIndexesById.get(user.id);
        }
        let userInMessageIndex = ++inMessageUserLookup.lastInMessageIndex;
        inMessageUserLookup.inMessageIndexesById.set(user.id, userInMessageIndex);
        return userInMessageIndex;
    }
    async serializeRepositories(repositoryTransactionHistory, message, lookups, inMessageUserLookup) {
        let repositoryIdsToFindBy = [];
        for (let repositoryId of lookups.repositoryInMessageIndexesById.keys()) {
            repositoryIdsToFindBy.push(repositoryId);
        }
        repositoryIdsToFindBy.push(repositoryTransactionHistory.id);
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        const repositories = await repositoryDao.findByIds(repositoryIdsToFindBy);
        for (const repository of repositories) {
            let userInMessageIndex = this.getUserInMessageIndex(repository.owner, inMessageUserLookup);
            if (lookups.repositoryInMessageIndexesById.has(repository.id)) {
                const repositoryInMessageIndex = lookups.repositoryInMessageIndexesById.get(repository.id);
                message.referencedRepositories[repositoryInMessageIndex] =
                    this.serializeRepository(repository, userInMessageIndex);
            }
            else {
                message.history.repository.owner = userInMessageIndex;
                message.history.repository.id = repository.id;
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
    serializeRepositoryTransactionHistory(repositoryTransactionHistory, lookups) {
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
            serializedOperationHistory.push(this.serializeOperationHistory(repositoryTransactionHistory, operationHistory, lookups));
        }
        return {
            ...WITH_ID,
            actor: this.getActorInMessageIndex(repositoryTransactionHistory.actor, lookups),
            isRepositoryCreation: repositoryTransactionHistory.isRepositoryCreation,
            repository: this.serializeHistoryRepository(repositoryTransactionHistory),
            operationHistory: serializedOperationHistory,
            saveTimestamp: repositoryTransactionHistory.saveTimestamp,
            uuId: repositoryTransactionHistory.uuId
        };
    }
    serializeHistoryRepository(repositoryTransactionHistory) {
        if (repositoryTransactionHistory.isRepositoryCreation) {
            return this.serializeRepository(repositoryTransactionHistory.repository);
        }
        else {
            // When this repositoryTransactionHistory processed at sync-in 
            // the repository should already be loaded in the target database
            // if it's not then it's missing the repositoryTransactionHistory
            // with isRepositoryCreation === true
            return repositoryTransactionHistory.repository.uuId;
        }
    }
    serializeOperationHistory(repositoryTransactionHistory, operationHistory, lookups) {
        const dbEntity = operationHistory.entity;
        const serializedRecordHistory = [];
        for (const recordHistory of operationHistory.recordHistory) {
            serializedRecordHistory.push(this.serializeRecordHistory(repositoryTransactionHistory, recordHistory, dbEntity, lookups));
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
        // if (typeof applicationVersion.id !== 'number') {
        // 	throw new Error(`OperationHistory.entity.applicationVersion.id must be present`)
        // }
        let applicationVersionInMessageIndex;
        if (lookups.applicationVersionInMessageIndexesById.has(applicationVersion.id)) {
            applicationVersionInMessageIndex = lookups.applicationVersionInMessageIndexesById.get(applicationVersion.id);
        }
        else {
            applicationVersionInMessageIndex = ++lookups.lastInMessageApplicationVersionIndex;
            lookups.applicationVersionInMessageIndexesById.set(applicationVersion.id, applicationVersionInMessageIndex);
        }
        lookups.applicationVersions[applicationVersionInMessageIndex] = applicationVersion;
        return {
            ...WITH_ID,
            changeType: operationHistory.changeType,
            entity: {
                ...WITH_ID,
                applicationVersion: applicationVersionInMessageIndex,
                index: operationHistory.entity.index
            },
            recordHistory: serializedRecordHistory
        };
    }
    serializeRecordHistory(repositoryTransactionHistory, recordHistory, dbEntity, lookups) {
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
        if (actor.id !== repositoryTransactionHistory.actor.id) {
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
            actorRecordId: recordHistory.actorRecordId,
        };
    }
    getActorInMessageIndex(actor, lookups) {
        if (!actor) {
            return null;
        }
        return this.getActorInMessageIndexById(actor.id, lookups);
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
            case repositoryEntity.ORIGINAL_ACTOR_ID: {
                serailizedValue = this.getActorInMessageIndexById(value, lookups);
                break;
            }
            case repositoryEntity.ORIGINAL_REPOSITORY_ID: {
                serailizedValue = lookups.repositoryInMessageIndexesById.get(value);
                if (serailizedValue === undefined) {
                    lookups.lastInMessageRepositoryIndex++;
                    serailizedValue = lookups.lastInMessageRepositoryIndex;
                    lookups.repositoryInMessageIndexesById.set(value, serailizedValue);
                }
                break;
            }
        }
        return {
            ...WITH_RECORD_HISTORY,
            columnIndex: valueRecord.columnIndex,
            [valueFieldName]: serailizedValue
        };
    }
    serializeRepository(repository, owner) {
        return {
            ...WITH_ID,
            ageSuitability: repository.ageSuitability,
            createdAt: repository.createdAt,
            immutable: repository.immutable,
            owner,
            source: repository.source,
            uuId: repository.uuId
        };
    }
}
DI.set(SYNC_OUT_DATA_SERIALIZER, SyncOutDataSerializer);
//# sourceMappingURL=SyncOutDataSerializer.js.map