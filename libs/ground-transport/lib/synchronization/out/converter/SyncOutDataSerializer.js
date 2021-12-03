import { DI } from "@airport/di";
import { repositoryEntity } from "@airport/ground-control";
import { SYNC_OUT_DATA_SERIALIZER } from "../../../tokens";
export const WITH_ID = {};
export const WITH_RECORD_HISTORY = {};
export class SyncOutDataSerializer {
    serialize(repositoryTransactionHistories) {
        const repositorySynchronizationMessages = [];
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            const message = {
                actors: [],
                applicationVersions: [],
                applications: [],
                history: null,
                // Repositories may reference records in other repositories
                referencedRepositories: [],
                users: [],
                terminals: []
            };
            this.serializeMessage(repositoryTransactionHistory, message);
            repositorySynchronizationMessages.push(message);
        }
        return repositorySynchronizationMessages;
    }
    serializeMessage(repositoryTransactionHistory, message) {
        const lookups = {
            actorIdsByInMessageIndex: new Map(),
            actorInMessageIndexesById: new Map(),
            lastInMessageActorIndex: -1,
            lastInMessageRepositoryIndex: -1,
            repositoryIdsByInMessageIndex: new Map(),
            repositoryInMessageIndexesById: new Map()
        };
        if (repositoryTransactionHistory.isRepositoryCreation) {
            message.history.repository = this.serializeRepository(repositoryTransactionHistory.repository);
        }
        else {
            // When this repositoryTransactionHistory processed at sync-in 
            // the repository should already be loaded in the target database
            // if it's not then it's missing the repositoryTransactionHistory
            // with isRepositoryCreation === true
            message.history.repository = repositoryTransactionHistory.repository.uuId;
        }
        for (const operationHistory of repositoryTransactionHistory.operationHistory) {
            const dbEntity = operationHistory.entity;
            for (const recordHistory of operationHistory.recordHistory) {
                const newValues = [];
                for (const newValue of recordHistory.newValues) {
                    const dbColumn = dbEntity.columns.filter(column => column.index === newValue.columnIndex)[0];
                    newValues.push(this.serializeNewValue(newValue, dbColumn, lookups));
                }
                const oldValues = [];
                for (const oldValue of recordHistory.oldValues) {
                    const dbColumn = dbEntity.columns.filter(column => column.index === oldValue.columnIndex)[0];
                    oldValues.push(this.serializeOldValue(oldValue, dbColumn, lookups));
                }
            }
        }
    }
    serializeNewValue(newValue, dbColumn, lookups) {
        return this.serializeValue(newValue, dbColumn, lookups, 'newValue');
    }
    serializeOldValue(oldValue, dbColumn, lookups) {
        return this.serializeValue(oldValue, dbColumn, lookups, 'oldValue');
    }
    serializeValue(valueRecord, dbColumn, lookups, valueFieldName) {
        let value = valueRecord[valueFieldName];
        let serailizedValue;
        switch (dbColumn.name) {
            case repositoryEntity.ORIGINAL_ACTOR_ID: {
                serailizedValue = lookups.actorInMessageIndexesById.get(value);
                if (serailizedValue === undefined) {
                    lookups.lastInMessageActorIndex++;
                    serailizedValue = lookups.lastInMessageActorIndex;
                    lookups.actorInMessageIndexesById.set(value, serailizedValue);
                    lookups.actorIdsByInMessageIndex.set(serailizedValue, value);
                }
                break;
            }
            case repositoryEntity.ORIGINAL_REPOSITORY_ID: {
                serailizedValue = lookups.repositoryInMessageIndexesById.get(value);
                if (serailizedValue === undefined) {
                    lookups.lastInMessageRepositoryIndex++;
                    serailizedValue = lookups.lastInMessageRepositoryIndex;
                    lookups.repositoryInMessageIndexesById.set(value, serailizedValue);
                    lookups.repositoryIdsByInMessageIndex.set(serailizedValue, value);
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
    serializeRepository(repository) {
        return {
            ...WITH_ID,
            ageSuitability: repository.ageSuitability,
            createdAt: repository.createdAt,
            immutable: repository.immutable,
            source: repository.source,
            uuId: repository.uuId
        };
    }
}
DI.set(SYNC_OUT_DATA_SERIALIZER, SyncOutDataSerializer);
//# sourceMappingURL=SyncOutDataSerializer.js.map