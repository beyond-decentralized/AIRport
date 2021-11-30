import { container, DI } from '@airport/di';
import { ChangeType } from '@airport/ground-control';
import { SCHEMA_ENTITY_DAO } from '@airport/airspace';
import { SYNC_IN_DATA_CHECKER } from '../../../tokens';
import { AIRPORT_DATABASE } from '@airport/air-control';
import { getSysWideOpIds, SEQUENCE_GENERATOR } from '@airport/check-in';
import { RepositoryTransactionType } from '@airport/holding-pattern';
export class SyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    async checkData(message) {
        const history = message.history;
        try {
            if (!history || typeof history !== 'object') {
                throw new Error(`Invalid TerminalMessage.history`);
            }
            if (!history.operationHistory || !(history.operationHistory instanceof Array)) {
                return false;
            }
            if (!history.saveTimestamp || typeof history.saveTimestamp !== 'number') {
                throw new Error(`Invalid TerminalMessage.history.saveTimestamp`);
            }
            if (history.transactionHistory) {
                throw new Error(`TerminalMessage.history.transactionHistory cannot be specified`);
            }
            if (history.repositoryTransactionType) {
                throw new Error(`TerminalMessage.history.repositoryTransactionType cannot be specified`);
            }
            if (history.synced) {
                throw new Error(`TerminalMessage.history.synced cannot be specified`);
            }
            const actor = message.actors[history.actor];
            if (!actor) {
                throw new Error(`Cannot find Actor for "in-message id" TerminalMessage.history.actor`);
            }
            // Repository is already set in SyncInRepositoryChecker
            history.actor = actor;
            history.repositoryTransactionType = RepositoryTransactionType.REMOTE;
            history.synced = true;
            delete history.id;
            const schemaEntityMap = await this.populateSchemaEntityMap(message);
            await this.checkOperationHistories(message, schemaEntityMap);
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async populateSchemaEntityMap(message) {
        let schemaVersionsById = new Map();
        let schemaVersionIds = [];
        for (const schemaVersion of message.schemaVersions) {
            schemaVersionIds.push(schemaVersion.id);
            schemaVersionsById.set(schemaVersion.id, schemaVersion);
        }
        const schemaEntityDao = await container(this).get(SCHEMA_ENTITY_DAO);
        const schemaEntities = await schemaEntityDao.findAllForSchemaVersions(schemaVersionIds);
        const schemaEntityMap = new Map();
        for (let schemaEntity of schemaEntities) {
            const schemaVersion = schemaVersionsById.get(schemaEntity.schemaVersion.id);
            let entitiesForDomain = schemaEntityMap.get(schemaVersion.schema.domain.name);
            if (!entitiesForDomain) {
                entitiesForDomain = new Map();
                schemaEntityMap.set(schemaVersion.schema.domain.name, entitiesForDomain);
            }
            let entitiesForSchema = entitiesForDomain.get(schemaVersion.schema.name);
            if (!entitiesForSchema) {
                entitiesForSchema = new Map();
                entitiesForDomain.set(schemaVersion.schema.name, entitiesForSchema);
            }
            entitiesForSchema.set(schemaEntity.index, schemaEntity);
        }
        return schemaEntityMap;
    }
    async checkOperationHistories(message, schemaEntityMap) {
        const history = message.history;
        if (!(history.operationHistory instanceof Array) || !history.operationHistory.length) {
            throw new Error(`Invalid TerminalMessage.history.operationHistory`);
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
                throw new Error(`TerminalMessage.history -> operationHistory.orderNumber cannot be specified`);
            }
            operationHistory.orderNumber = ++orderNumber;
            switch (operationHistory.changeType) {
                case ChangeType.DELETE_ROWS:
                case ChangeType.INSERT_VALUES:
                case ChangeType.UPDATE_ROWS:
                case ChangeType.INSERT_REFERENCE_VALUES:
                    break;
                default:
                    throw new Error(`Invalid operationHistory.changeType: ${operationHistory.changeType}`);
            }
            if (typeof operationHistory.entity !== 'object') {
                throw new Error(`Invalid operationHistory.entity`);
            }
            if (typeof operationHistory.entity.schemaVersion !== 'number') {
                throw new Error(`Expecting "in-message index" (number)
					in 'operationHistory.entity.schemaVersion'`);
            }
            const schemaVersion = message.schemaVersions[operationHistory.entity.schemaVersion];
            if (!schemaVersion) {
                throw new Error(`Invalid index into message.schemaVersions [${operationHistory.entity.schemaVersion}],
				in operationHistory.entity.schemaVersion`);
            }
            const schemaEntity = schemaEntityMap.get(schemaVersion.schema.domain.name)
                .get(schemaVersion.schema.name).get(operationHistory.entity.index);
            if (!schemaEntity) {
                throw new Error(`Invalid operationHistory.entity.index: ${operationHistory.entity.index}`);
            }
            operationHistory.entity = schemaEntity;
            if (operationHistory.repositoryTransactionHistory) {
                throw new Error(`TerminalMessage.history -> operationHistory.repositoryTransactionHistory cannot be specified`);
            }
            operationHistory.repositoryTransactionHistory = history;
            if (operationHistory.systemWideOperationId) {
                throw new Error(`TerminalMessage.history -> operationHistory.systemWideOperationId cannot be specified`);
            }
            operationHistory.systemWideOperationId = systemWideOperationIds[i];
            delete operationHistory.id;
            await this.checkRecordHistories(operationHistory, message);
        }
    }
    async checkRecordHistories(operationHistory, message) {
        const recordHistories = operationHistory.recordHistory;
        if (!(recordHistories instanceof Array) || !recordHistories.length) {
            throw new Error(`Inalid TerminalMessage.history -> operationHistory.recordHistory`);
        }
        for (const recordHistory of recordHistories) {
            if (!recordHistory.actorRecordId || typeof recordHistory.actorRecordId !== 'number') {
                throw new Error(`Invalid TerminalMessage.history -> operationHistory.recordHistory.actorRecordId`);
            }
            switch (operationHistory.changeType) {
                case ChangeType.INSERT_VALUES:
                    if (recordHistory.actor) {
                        throw new Error(`Cannot specify TerminalMessage.history -> operationHistory.recordHistory.actor
for ChangeType.INSERT_VALUES`);
                    }
                    recordHistory.actor = operationHistory.repositoryTransactionHistory.actor;
                case ChangeType.DELETE_ROWS:
                case ChangeType.UPDATE_ROWS:
                case ChangeType.INSERT_REFERENCE_VALUES: {
                    const actor = message.actors[recordHistory.actor];
                    if (!actor) {
                        throw new Error(`Did find Actor for "in-message id" in TerminalMessage.history -> operationHistory.actor`);
                    }
                    recordHistory.actor = actor;
                    break;
                }
            }
            switch (operationHistory.changeType) {
                case ChangeType.INSERT_VALUES:
                case ChangeType.DELETE_ROWS:
                case ChangeType.UPDATE_ROWS:
                    if (recordHistory.repository) {
                        throw new Error(`Cannot specify TerminalMessage.history -> operationHistory.recordHistory.repository
for ChangeType.INSERT_VALUES|DELETE_ROWS|UPDATE_ROWS`);
                    }
                    recordHistory.repository = operationHistory.repositoryTransactionHistory.repository;
                    break;
                case ChangeType.INSERT_REFERENCE_VALUES: {
                    const repository = message.referencedRepositories[recordHistory.repository];
                    if (!repository) {
                        throw new Error(`Did find Repository for "in-message id" in TerminalMessage.history -> operationHistory.repository`);
                    }
                    recordHistory.repository = repository;
                    break;
                }
            }
            if (recordHistory.operationHistory) {
                throw new Error(`TerminalMessage.history -> operationHistory.recordHistory.operationHistory cannot be specified`);
            }
            this.checkNewValues(recordHistory, operationHistory);
            this.checkOldValues(recordHistory, operationHistory);
            recordHistory.operationHistory = operationHistory;
            delete recordHistory.id;
        }
    }
    checkNewValues(recordHistory, operationHistory) {
        switch (operationHistory.changeType) {
            case ChangeType.DELETE_ROWS:
                if (recordHistory.newValues) {
                    throw new Error(`Cannot specify TerminalMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.DELETE_ROWS`);
                }
                return;
            case ChangeType.INSERT_VALUES:
            case ChangeType.UPDATE_ROWS:
            case ChangeType.INSERT_REFERENCE_VALUES:
                if (!(recordHistory.newValues instanceof Array) || !recordHistory.newValues.length) {
                    throw new Error(`Must specify TerminalMessage.history -> operationHistory.recordHistory.newValues
for ChangeType.INSERT_VALUES|UPDATE_ROWS|INSERT_REFERENCE_VALUES`);
                }
                break;
        }
        for (const newValue of recordHistory.newValues) {
            if (newValue.recordHistory) {
                throw new Error(`Cannot specify TerminalMessage.history -> operationHistory.recordHistory.newValues.recordHistory`);
            }
            newValue.recordHistory = recordHistory;
            if (typeof newValue.columnIndex !== 'number') {
                throw new Error(`Invalid TerminalMessage.history -> operationHistory.recordHistory.newValues.columnIndex`);
            }
            if (typeof newValue.newValue === undefined) {
                throw new Error(`Invalid TerminalMessage.history -> operationHistory.recordHistory.newValues.newValue`);
            }
        }
    }
    checkOldValues(recordHistory, operationHistory) {
        switch (operationHistory.changeType) {
            case ChangeType.DELETE_ROWS:
            case ChangeType.INSERT_REFERENCE_VALUES:
            case ChangeType.INSERT_VALUES:
                if (recordHistory.oldValues) {
                    throw new Error(`Cannot specify TerminalMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.DELETE_ROWS|INSERT_REFERENCE_VALUES|INSERT_VALUES`);
                }
                return;
            case ChangeType.UPDATE_ROWS:
                if (!(recordHistory.newValues instanceof Array) || !recordHistory.oldValues.length) {
                    throw new Error(`Must specify TerminalMessage.history -> operationHistory.recordHistory.oldValues
for ChangeType.UPDATE_ROWS`);
                }
                break;
        }
        for (const oldValue of recordHistory.oldValues) {
            if (oldValue.recordHistory) {
                throw new Error(`Cannot specify TerminalMessage.history -> operationHistory.recordHistory.newValues.recordHistory`);
            }
            oldValue.recordHistory = recordHistory;
            if (typeof oldValue.columnIndex !== 'number') {
                throw new Error(`Invalid TerminalMessage.history -> operationHistory.recordHistory.oldValues.columnIndex`);
            }
            if (typeof oldValue.oldValue === undefined) {
                throw new Error(`Invalid TerminalMessage.history -> operationHistory.recordHistory.oldValues.oldValue`);
            }
        }
    }
}
DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker);
//# sourceMappingURL=SyncInDataChecker.js.map