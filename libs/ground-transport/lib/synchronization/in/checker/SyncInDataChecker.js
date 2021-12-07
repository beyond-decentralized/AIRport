import { container, DI } from '@airport/di';
import { ChangeType, repositoryEntity } from '@airport/ground-control';
import { APPLICATION_ENTITY_DAO } from '@airport/airspace';
import { SYNC_IN_DATA_CHECKER } from '../../../tokens';
import { AIRPORT_DATABASE } from '@airport/air-control';
import { getSysWideOpIds, SEQUENCE_GENERATOR } from '@airport/check-in';
import { RepositoryTransactionType } from '@airport/holding-pattern';
export class SyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
     * @returns {DataCheckResults}
     */
    async checkData(message) {
        const history = message.history;
        try {
            if (!history || typeof history !== 'object') {
                throw new Error(`Invalid RepositorySynchronizationMessage.history`);
            }
            if (typeof history.uuId !== 'string' || history.uuId.length !== 36) {
                return false;
            }
            if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
                return false;
            }
            if (!history.saveTimestamp || typeof history.saveTimestamp !== 'number') {
                throw new Error(`Invalid RepositorySynchronizationMessage.history.saveTimestamp`);
            }
            if (history.transactionHistory) {
                throw new Error(`RepositorySynchronizationMessage.history.transactionHistory cannot be specified`);
            }
            if (history.repositoryTransactionType) {
                throw new Error(`RepositorySynchronizationMessage.history.repositoryTransactionType cannot be specified`);
            }
            if (history.syncTimestamp) {
                throw new Error(`RepositorySynchronizationMessage.history.syncTimestamp cannot be specified`);
            }
            const actor = message.actors[history.actor];
            if (!actor) {
                throw new Error(`Cannot find Actor for "in-message id" RepositorySynchronizationMessage.history.actor`);
            }
            // Repository is already set in SyncInRepositoryChecker
            history.actor = actor;
            history.repositoryTransactionType = RepositoryTransactionType.REMOTE;
            history.syncTimestamp = message.syncTimestamp;
            delete history.id;
            const applicationEntityMap = await this.populateApplicationEntityMap(message);
            await this.checkOperationHistories(message, applicationEntityMap);
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async populateApplicationEntityMap(message) {
        let applicationVersionsById = new Map();
        let applicationVersionIds = [];
        for (const applicationVersion of message.applicationVersions) {
            applicationVersionIds.push(applicationVersion.id);
            applicationVersionsById.set(applicationVersion.id, applicationVersion);
        }
        const applicationEntityDao = await container(this).get(APPLICATION_ENTITY_DAO);
        const applicationEntities = await applicationEntityDao.findAllForApplicationVersions(applicationVersionIds);
        const applicationEntityMap = new Map();
        for (let applicationEntity of applicationEntities) {
            const applicationVersion = applicationVersionsById.get(applicationEntity.applicationVersion.id);
            let entitiesForDomain = applicationEntityMap.get(applicationVersion.application.domain.name);
            if (!entitiesForDomain) {
                entitiesForDomain = new Map();
                applicationEntityMap.set(applicationVersion.application.domain.name, entitiesForDomain);
            }
            let entitiesForApplication = entitiesForDomain.get(applicationVersion.application.name);
            if (!entitiesForApplication) {
                entitiesForApplication = new Map();
                entitiesForDomain.set(applicationVersion.application.name, entitiesForApplication);
            }
            entitiesForApplication.set(applicationEntity.index, applicationEntity);
        }
        return applicationEntityMap;
    }
    async checkOperationHistories(message, applicationEntityMap) {
        const history = message.history;
        if (!(history.operationHistory instanceof Array) || !history.operationHistory.length) {
            throw new Error(`Invalid RepositorySynchronizationMessage.history.operationHistory`);
        }
        const [airDb, sequenceGenerator] = await container(this)
            .get(AIRPORT_DATABASE, SEQUENCE_GENERATOR);
        const systemWideOperationIds = getSysWideOpIds(history.operationHistory.length, airDb, sequenceGenerator);
        let orderNumber = 0;
        for (let i = 0; i < history.operationHistory.length; i++) {
            const operationHistory = history.operationHistory[i];
            if (typeof operationHistory !== 'object') {
                throw new Error(`Invalid operationHistory`);
            }
            if (operationHistory.orderNumber) {
                throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.orderNumber cannot be specified,
				the position of orderHistory record determines it's order`);
            }
            operationHistory.orderNumber = ++orderNumber;
            switch (operationHistory.changeType) {
                case ChangeType.DELETE_ROWS:
                case ChangeType.INSERT_VALUES:
                case ChangeType.UPDATE_ROWS:
                    break;
                default:
                    throw new Error(`Invalid operationHistory.changeType: ${operationHistory.changeType}`);
            }
            if (typeof operationHistory.entity !== 'object') {
                throw new Error(`Invalid operationHistory.entity`);
            }
            if (typeof operationHistory.entity.applicationVersion !== 'number') {
                throw new Error(`Expecting "in-message index" (number)
					in 'operationHistory.entity.applicationVersion'`);
            }
            const applicationVersion = message.applicationVersions[operationHistory.entity.applicationVersion];
            if (!applicationVersion) {
                throw new Error(`Invalid index into message.applicationVersions [${operationHistory.entity.applicationVersion}],
				in operationHistory.entity.applicationVersion`);
            }
            const applicationEntity = applicationEntityMap.get(applicationVersion.application.domain.name)
                .get(applicationVersion.application.name).get(operationHistory.entity.index);
            if (!applicationEntity) {
                throw new Error(`Invalid operationHistory.entity.index: ${operationHistory.entity.index}`);
            }
            operationHistory.entity = applicationEntity;
            if (operationHistory.repositoryTransactionHistory) {
                throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.repositoryTransactionHistory cannot be specified`);
            }
            operationHistory.repositoryTransactionHistory = history;
            if (operationHistory.systemWideOperationId) {
                throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.systemWideOperationId cannot be specified`);
            }
            operationHistory.systemWideOperationId = systemWideOperationIds[i];
            delete operationHistory.id;
            let originalRepositoryColumnIndex;
            let originalActorColumnIndex;
            for (const column of operationHistory.entity.columns) {
                switch (column.name) {
                    case repositoryEntity.ORIGINAL_ACTOR_ID:
                        originalActorColumnIndex = column.index;
                        break;
                    case repositoryEntity.ORIGINAL_REPOSITORY_ID:
                        originalRepositoryColumnIndex = column.index;
                        break;
                }
            }
            await this.checkRecordHistories(operationHistory, originalRepositoryColumnIndex, originalActorColumnIndex, message);
        }
    }
    async checkRecordHistories(operationHistory, originalRepositoryColumnIndex, originalActorColumnIndex, message) {
        const recordHistories = operationHistory.recordHistory;
        if (!(recordHistories instanceof Array) || !recordHistories.length) {
            throw new Error(`Inalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory`);
        }
        for (const recordHistory of recordHistories) {
            if (!recordHistory.actorRecordId || typeof recordHistory.actorRecordId !== 'number') {
                throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.actorRecordId`);
            }
            switch (operationHistory.changeType) {
                case ChangeType.INSERT_VALUES:
                    if (recordHistory.actor) {
                        throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.actor
for ChangeType.INSERT_VALUES`);
                    }
                    recordHistory.actor = operationHistory.repositoryTransactionHistory.actor;
                    break;
                case ChangeType.DELETE_ROWS:
                case ChangeType.UPDATE_ROWS: {
                    // If no actor is present on record level its the same actor that created the repositoryTransactionHistory
                    if (recordHistory.actor === undefined) {
                        recordHistory.actor = operationHistory.repositoryTransactionHistory.actor;
                    }
                    else {
                        const actor = message.actors[recordHistory.actor];
                        if (!actor) {
                            throw new Error(`Did find Actor for "in-message id" in RepositorySynchronizationMessage.history -> operationHistory.actor`);
                        }
                        recordHistory.actor = actor;
                    }
                    break;
                }
            }
            if (recordHistory.operationHistory) {
                throw new Error(`RepositorySynchronizationMessage.history -> operationHistory.recordHistory.operationHistory cannot be specified`);
            }
            this.checkNewValues(recordHistory, originalRepositoryColumnIndex, originalActorColumnIndex, operationHistory, message);
            this.checkOldValues(recordHistory, originalRepositoryColumnIndex, originalActorColumnIndex, operationHistory, message);
            recordHistory.operationHistory = operationHistory;
            delete recordHistory.id;
        }
    }
    checkNewValues(recordHistory, originalRepositoryColumnIndex, originalActorColumnIndex, operationHistory, message) {
        switch (operationHistory.changeType) {
            case ChangeType.DELETE_ROWS:
                if (recordHistory.newValues) {
                    throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.DELETE_ROWS`);
                }
                return;
            case ChangeType.INSERT_VALUES:
            case ChangeType.UPDATE_ROWS:
                if (!(recordHistory.newValues instanceof Array) || !recordHistory.newValues.length) {
                    throw new Error(`Must specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.INSERT_VALUES|UPDATE_ROWS`);
                }
                break;
        }
        for (const newValue of recordHistory.newValues) {
            if (newValue.recordHistory) {
                throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.recordHistory`);
            }
            newValue.recordHistory = recordHistory;
            if (typeof newValue.columnIndex !== 'number') {
                throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.columnIndex`);
            }
            if (typeof newValue.newValue === undefined) {
                throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue`);
            }
        }
        for (const newValue of recordHistory.newValues) {
            if (newValue.columnIndex === originalRepositoryColumnIndex) {
                const originalRepository = message.referencedRepositories[newValue.newValue];
                if (!originalRepository) {
                    throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
	Value is for ORIGINAL_REPOSITORY_ID and could find RepositorySynchronizationMessage.referencedRepositories[${newValue.newValue}]`);
                }
                newValue.newValue = originalRepository.id;
            }
        }
        for (const newValue of recordHistory.newValues) {
            switch (newValue.columnIndex) {
                case originalRepositoryColumnIndex: {
                    const originalRepository = message.referencedRepositories[newValue.newValue];
                    if (!originalRepository) {
                        throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
		Value is for ORIGINAL_REPOSITORY_ID and could find RepositorySynchronizationMessage.referencedRepositories[${newValue.newValue}]`);
                    }
                    newValue.newValue = originalRepository.id;
                    break;
                }
                case originalActorColumnIndex: {
                    const originalActor = message.actors[newValue.newValue];
                    if (!originalActor) {
                        throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.newValue
	Value is for ORIGINAL_ACTOR_ID and could find RepositorySynchronizationMessage.actors[${newValue.newValue}]`);
                    }
                    newValue.newValue = originalActor.id;
                    break;
                }
            }
        }
    }
    checkOldValues(recordHistory, originalRepositoryColumnIndex, originalActorColumnIndex, operationHistory, message) {
        switch (operationHistory.changeType) {
            case ChangeType.DELETE_ROWS:
            case ChangeType.INSERT_VALUES:
                if (recordHistory.oldValues) {
                    throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.DELETE_ROWS|INSERT_VALUES`);
                }
                return;
            case ChangeType.UPDATE_ROWS:
                if (!(recordHistory.newValues instanceof Array) || !recordHistory.oldValues.length) {
                    throw new Error(`Must specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.UPDATE_ROWS`);
                }
                break;
        }
        for (const oldValue of recordHistory.oldValues) {
            if (oldValue.recordHistory) {
                throw new Error(`Cannot specify RepositorySynchronizationMessage.history -> operationHistory.recordHistory.newValues.recordHistory`);
            }
            oldValue.recordHistory = recordHistory;
            if (typeof oldValue.columnIndex !== 'number') {
                throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.columnIndex`);
            }
            if (typeof oldValue.oldValue === undefined) {
                throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue`);
            }
        }
        for (const oldValue of recordHistory.oldValues) {
            switch (oldValue.columnIndex) {
                case originalRepositoryColumnIndex: {
                    const originalRepository = message.referencedRepositories[oldValue.oldValue];
                    if (!originalRepository) {
                        throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
	Value is for ORIGINAL_REPOSITORY_ID and could find RepositorySynchronizationMessage.referencedRepositories[${oldValue.oldValue}]`);
                    }
                    oldValue.oldValue = originalRepository.id;
                    break;
                }
                case originalActorColumnIndex: {
                    const originalActor = message.actors[oldValue.oldValue];
                    if (!originalActor) {
                        throw new Error(`Invalid RepositorySynchronizationMessage.history -> operationHistory.recordHistory.oldValues.oldValue
	Value is for ORIGINAL_ACTOR_ID and could find RepositorySynchronizationMessage.actors[${oldValue.oldValue}]`);
                    }
                    oldValue.oldValue = originalActor.id;
                    break;
                }
            }
        }
    }
}
DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker);
//# sourceMappingURL=SyncInDataChecker.js.map