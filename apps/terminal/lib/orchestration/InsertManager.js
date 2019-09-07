"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class InsertManager {
    // get currentTransHistory(): ITransactionHistory {
    // 	return this.transManager.currentTransHistory
    // }
    async insertValues(portableQuery, actor, ensureGeneratedValues) {
        return await this.internalInsertValues(portableQuery, actor, false, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, actor) {
        return await this.internalInsertValues(portableQuery, actor, true);
    }
    async internalInsertValues(portableQuery, actor, getIds = false, ensureGeneratedValues = true) {
        // TODO: remove unused dependencies after testing
        const [airDb, storeDriver, sequenceGenerator, historyManager, offlineDataStore, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, repositoryManager, repoTransHistoryDuo, transactionManager] = await di_1.DI.get(air_control_1.AIR_DB, ground_control_1.STORE_DRIVER, check_in_1.SEQUENCE_GENERATOR, diTokens_1.HISTORY_MANAGER, diTokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.OPER_HISTORY_DUO, holding_pattern_1.REC_HISTORY_DUO, holding_pattern_1.REC_HIST_NEW_VALUE_DUO, diTokens_1.REPOSITORY_MANAGER, holding_pattern_1.REPO_TRANS_HISTORY_DUO, terminal_map_1.TRANSACTION_MANAGER);
        const dbEntity = airDb.schemas[portableQuery.schemaIndex]
            .currentVersion.entities[portableQuery.tableIndex];
        const errorPrefix = `Error inserting into '${dbEntity.name}'.'
`;
        const jsonInsertValues = portableQuery.jsonQuery;
        const columnIndexSet = {};
        for (const columnIndex of jsonInsertValues.C) {
            if (columnIndex < 0 || columnIndex >= dbEntity.columns.length) {
                throw new Error(errorPrefix +
                    `Invalid column index: ${columnIndex}`);
            }
            if (columnIndexSet[columnIndex]) {
                throw new Error(errorPrefix +
                    `Column ${dbEntity.name}.${dbEntity.columns[columnIndex].name} 
appears more than once in the Columns clause`);
            }
            columnIndexSet[columnIndex] = true;
        }
        let columnsToPopulate;
        const insertValues = portableQuery.jsonQuery;
        if (dbEntity.isRepositoryEntity) {
            columnsToPopulate = this.ensureRepositoryEntityIdValues(actor, dbEntity, insertValues, errorPrefix);
        }
        let generatedColumns = this.verifyNoGeneratedColumns(dbEntity, portableQuery.jsonQuery, errorPrefix);
        let ids;
        let systemWideOperationId;
        if (!dbEntity.isLocal) {
            systemWideOperationId = await check_in_1.getSysWideOpId(airDb, sequenceGenerator);
        }
        if (ensureGeneratedValues) {
            ids = await this.ensureGeneratedValues(dbEntity, insertValues, actor, columnsToPopulate, generatedColumns, systemWideOperationId, errorPrefix, sequenceGenerator);
        }
        if (!dbEntity.isLocal) {
            await this.addInsertHistory(dbEntity, portableQuery, actor, systemWideOperationId, historyManager, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, repositoryManager, repoTransHistoryDuo, transactionManager);
        }
        const numberOfInsertedRecords = await storeDriver.insertValues(portableQuery);
        return getIds ? ids : numberOfInsertedRecords;
    }
    async addRepository(name, url = null, platform = terminal_map_1.PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH) {
        const [repoManager, transManager] = await di_1.DI.get(diTokens_1.REPOSITORY_MANAGER, terminal_map_1.TRANSACTION_MANAGER);
        const repository = await repoManager.createRepository(name, distributionStrategy, transManager.storeType, platform, platformConfig, 'id');
        return repository.id;
    }
    async ensureGeneratedValues(dbEntity, jsonInsertValues, actor, columnsToPopulate, generatedColumns, systemWideOperationId, errorPrefix, sequenceGenerator) {
        const values = jsonInsertValues.V;
        const idColumns = dbEntity.idColumns;
        const allIds = [];
        for (const entityValues of values) {
            allIds.push([]);
        }
        let actorIdColumn;
        let sysWideOperationIdColumn;
        if (!dbEntity.isLocal) {
            actorIdColumn = columnsToPopulate.actorIdColumn;
            sysWideOperationIdColumn = columnsToPopulate.sysWideOperationIdColumn;
        }
        for (const idColumn of idColumns) {
            if (idColumn.isGenerated) {
                continue;
            }
            let isActorIdColumn = false;
            let inStatementColumnIndex;
            const matchingColumns = jsonInsertValues.C.filter((columnIndex, index) => {
                if (columnIndex === idColumn.index) {
                    inStatementColumnIndex = index;
                    return true;
                }
            });
            if (matchingColumns.length < 1) {
                // Actor Id cannot be in the insert statement
                if (idColumn.id === actorIdColumn.id) {
                    isActorIdColumn = true;
                    inStatementColumnIndex = jsonInsertValues.C.length;
                    jsonInsertValues.C.push(actorIdColumn.index);
                }
                else {
                    throw new Error(errorPrefix +
                        `Could not find @Id column ${dbEntity.name}.${idColumn.name} in
					the insert statement.  Non-generated @Id columns must be present in the Insert
					statement (with exception of Actor ID).`);
                }
            }
            for (let i = 0; i < values.length; i++) {
                const entityValues = values[i];
                const idValues = allIds[i];
                let idValue;
                if (isActorIdColumn) {
                    idValue = actor.id;
                }
                else {
                    idValue = entityValues[inStatementColumnIndex];
                    if (!idValue && idValue !== 0) {
                        throw new Error(errorPrefix +
                            `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`);
                    }
                }
                idValues[idColumn.idIndex] = idValue;
            }
        }
        // if (dbEntity.isRepositoryEntity) {
        // 	const repositoryColumn  = dbEntity.columnMap[repositoryEntity.FOREIGN_KEY]
        // 	const repositoryIdIndex = repositoryColumn.index
        // 	for (const entityValues of values) {
        // 		const repositoryId = entityValues[repositoryIdIndex]
        // 		if (!repositoryId && repositoryId !== 0) {
        // 			throw new Error(`@Column({ name: 'REPOSITORY_ID'}) value is not specified on
        // insert for '${dbEntity0.name}.${repositoryColumn.name}'.`) } } }
        const generatedColumnIndexes = [];
        // let numAddedColumns                    = 0
        for (const generatedColumn of generatedColumns) {
            // const matchingColumns = jsonInsertValues.C.filter(
            // 	columnIndex => columnIndex === generatedColumn.index)
            // if (!matchingColumns.length) {
            // TODO: verify that it is OK to mutate the JsonInsertValues query
            const generatedIdColumnIndex = jsonInsertValues.C.length;
            generatedColumnIndexes.push(jsonInsertValues.C.length);
            jsonInsertValues.C.push(generatedColumn.index);
            // numAddedColumns++
            continue;
            // }
            // const generatedIdColumnIndex = matchingColumns[0]
            // generatedColumnIndexes.push(generatedIdColumnIndex)
            for (const entityValues of values) {
                const generatedValue = entityValues[generatedIdColumnIndex];
                if (generatedValue || generatedValue === 0) {
                    // Allowing negative integers for temporary identification
                    // within the circular dependency management lookup
                    if (generatedValue >= 0) {
                        throw new Error(errorPrefix +
                            `Already provided value '${entityValues[generatedColumn.index]}'
					on insert for @GeneratedValue '${dbEntity.name}.${generatedColumn.name}'.
					You cannot explicitly provide values for @GeneratedValue columns'.`);
                    }
                }
            }
        }
        // Populating generated values AFTER the checks
        // to not waste sequence numbers on invalid input
        // (thus reducing storage requirements in SqLite)
        const numSequencesNeeded = generatedColumns.map(_ => values.length);
        const generatedSequenceValues = await sequenceGenerator.generateSequenceNumbers(generatedColumns, numSequencesNeeded);
        generatedColumns.forEach((dbColumn, generatedColumnIndex) => {
            const generatedColumnSequenceValues = generatedSequenceValues[generatedColumnIndex];
            const insertColumnIndex = generatedColumnIndexes[generatedColumnIndex];
            // const columnIndex                   = dbColumn.index
            values.forEach((entityValues, index) => {
                const generatedValue = generatedColumnSequenceValues[index];
                entityValues[insertColumnIndex] = generatedValue;
                allIds[index][generatedColumnIndex] = generatedValue;
            });
        });
        if (!dbEntity.isLocal) {
            jsonInsertValues.C.push(sysWideOperationIdColumn.index);
            values.forEach(entityValues => {
                entityValues.push(systemWideOperationId);
            });
        }
        if (!idColumns.length && !generatedColumns.length) {
            return values.length;
        }
        switch (idColumns.length) {
            case 0: {
                // If there is just one @Generated column and no @Id columns
                if (generatedColumns.length == 1) {
                    const columnIndex = generatedColumns[0].index;
                    return allIds.map(rowIds => rowIds[columnIndex]);
                }
                break;
            }
            case 1: {
                // If there is exactly 1 @Id column and no @Generated columns
                // or it is the @Generated column
                if (!generatedColumns.length
                    || (generatedColumns.length === 1
                        && idColumns[0].index === generatedColumns[0].index)) {
                    const columnIndex = idColumns[0].index;
                    return allIds.map(rowIds => rowIds[columnIndex]);
                }
                break;
            }
        }
        return allIds;
    }
    ensureRepositoryEntityIdValues(actor, dbEntity, jsonInsertValues, errorPrefix) {
        const actorIdColumn = dbEntity.idColumnMap[ground_control_1.repositoryEntity.ACTOR_ID];
        const actorRecordIdColumn = dbEntity.idColumnMap[ground_control_1.repositoryEntity.ACTOR_RECORD_ID];
        const repositoryIdColumn = dbEntity.idColumnMap[ground_control_1.repositoryEntity.REPOSITORY_ID];
        const isDraftIdColumn = dbEntity.columnMap[ground_control_1.repositoryEntity.IS_DRAFT];
        const sysWideOperationIdColumn = dbEntity.columnMap[ground_control_1.repositoryEntity.SYSTEM_WIDE_OPERATION_ID];
        let repositoryIdColumnQueryIndex;
        let isDraftColumnQueryIndex;
        for (let i = 0; i < jsonInsertValues.C.length; i++) {
            const columnIndex = jsonInsertValues.C[i];
            switch (columnIndex) {
                case actorIdColumn.index:
                    throw new Error(errorPrefix +
                        `You cannot explicitly provide an ACTOR_ID value for Repository entities.`);
                case actorRecordIdColumn.index:
                    throw new Error(errorPrefix +
                        `You cannot explicitly provide an ACTOR_RECORD_ID value for Repository entities.`);
                case sysWideOperationIdColumn.index:
                    throw new Error(`Error inserting into '${dbEntity.name}'.
You cannot explicitly provide a SYSTEM_WIDE_OPERATION_ID value for Repository entities.`);
                case repositoryIdColumn.index:
                    repositoryIdColumnQueryIndex = i;
                    break;
                case isDraftIdColumn.index:
                    isDraftColumnQueryIndex = i;
                    break;
            }
        }
        const missingRepositoryIdErrorMsg = errorPrefix +
            `Error inserting into '${dbEntity.name}'.
You must provide a valid REPOSITORY_ID value for Repository entities.`;
        const missingIsDraftErrorMsg = errorPrefix +
            `Error inserting into '${dbEntity.name}'.
You must provide a valid IS_DRAFT value for Repository entities.`;
        if (repositoryIdColumnQueryIndex === undefined) {
            throw new Error(missingRepositoryIdErrorMsg);
        }
        if (isDraftColumnQueryIndex === undefined) {
            throw new Error(missingIsDraftErrorMsg);
        }
        for (const entityValues of jsonInsertValues.V) {
            if (entityValues.length !== jsonInsertValues.C.length) {
                throw new Error(errorPrefix +
                    `Number of columns (${jsonInsertValues.C.length}) does not match number of values (${entityValues.length}).
				`);
            }
            let isDraft = entityValues[isDraftColumnQueryIndex];
            if (isDraft !== true && isDraft !== false) {
                throw new Error(missingIsDraftErrorMsg);
            }
            let repositoryId = entityValues[repositoryIdColumnQueryIndex];
            if (typeof repositoryId !== 'number'
                || !Number.isInteger(repositoryId)
                || repositoryId < 1) {
                throw new Error(missingRepositoryIdErrorMsg);
            }
            for (let i = 0; i < entityValues.length; i++) {
                switch (i) {
                    case isDraftColumnQueryIndex:
                    case repositoryIdColumnQueryIndex:
                        continue;
                }
                const value = entityValues[i];
                const columnIndex = jsonInsertValues.C[i];
                const dbColumn = dbEntity.columns[columnIndex];
                if (dbColumn.notNull && value === null && !isDraft) {
                    throw new Error(errorPrefix +
                        `Column '${dbColumn.name}' is NOT NULL
and cannot have NULL values for non-draft records.`);
                }
            }
            entityValues[actorIdColumn.index] = actor.id;
            // const actorRecordId               = this.idGenerator.generateEntityId(dbEntity)
            // actorRecordIds.push(actorRecordId)
            // entityValues[actorRecordIdColumn.index] = actorRecordId
            if (!entityValues[actorRecordIdColumn.index]) {
            }
        }
        return {
            actorIdColumn,
            sysWideOperationIdColumn
        };
    }
    verifyNoGeneratedColumns(dbEntity, jsonInsertValues, errorPrefix) {
        for (let i = 0; i < jsonInsertValues.C.length; i++) {
            const columnIndex = jsonInsertValues.C[i];
            const dbColumn = dbEntity.columns[columnIndex];
            if (dbColumn.isGenerated) {
                throw new Error(errorPrefix +
                    `You cannot explicitly insert into a @GeneratedValue column '${dbColumn.name}'`);
            }
        }
        return dbEntity.columns.filter(dbColumn => dbColumn.isGenerated);
    }
    /**
     *
     * All repository records must have ids when inserted.  Currently AP doesn't support
     * inserting from select and in the values provided id's must either be explicitly
     * specified or already provided. For all repository entities all ids must be
     * auto-generated.
     *
     * @param {DbEntity} dbEntity
     * @param {PortableQuery} portableQuery
     * @returns {Promise<void>}
     */
    async addInsertHistory(dbEntity, portableQuery, actor, systemWideOperationId, histManager, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, repoManager, repoTransHistoryDuo, transManager) {
        const jsonInsertValues = portableQuery.jsonQuery;
        let operationsByRepo = [];
        let repoTransHistories = [];
        const repositoryIdIndex = dbEntity.columnMap[ground_control_1.repositoryEntity.REPOSITORY_ID].index;
        const actorIdIndex = dbEntity.columnMap[ground_control_1.repositoryEntity.ACTOR_ID].index;
        const actorRecordIdIndex = dbEntity.columnMap[ground_control_1.repositoryEntity.ACTOR_RECORD_ID].index;
        let repositoryIdColumnNumber;
        let actorIdColumnNumber;
        let actorRecordIdColumnNumber;
        for (const columnNumber in jsonInsertValues.C) {
            const columnIndex = jsonInsertValues.C[columnNumber];
            switch (columnIndex) {
                case repositoryIdIndex:
                    repositoryIdColumnNumber = columnNumber;
                    break;
                case actorIdIndex:
                    actorIdColumnNumber = columnNumber;
                    break;
                case actorRecordIdIndex:
                    actorRecordIdColumnNumber = columnNumber;
                    break;
            }
        }
        // Rows may belong to different repositories
        for (const row of jsonInsertValues.V) {
            const repositoryId = row[repositoryIdColumnNumber];
            // const repo           = await repoManager.getRepository(repositoryId)
            let repoTransHistory = repoTransHistories[repositoryId];
            if (!repoTransHistory) {
                repoTransHistory = await histManager
                    .getNewRepoTransHistory(transManager.currentTransHistory, repositoryId, actor);
            }
            let operationHistory = operationsByRepo[repositoryId];
            if (!operationHistory) {
                operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, systemWideOperationId, ground_control_1.ChangeType.INSERT_VALUES, dbEntity, operHistoryDuo);
                operationsByRepo[repositoryId] = operationHistory;
            }
            const actorRecordId = row[actorRecordIdColumnNumber];
            const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, actorRecordId, recHistoryDuo);
            for (const columnNumber in jsonInsertValues.C) {
                if (columnNumber === repositoryIdColumnNumber
                    || columnNumber === actorIdColumnNumber
                    || columnNumber === actorRecordIdColumnNumber) {
                    continue;
                }
                const columnIndex = jsonInsertValues.C[columnNumber];
                const dbColumn = dbEntity.columns[columnIndex];
                const newValue = row[columnNumber];
                recHistoryDuo.addNewValue(recordHistory, dbColumn, newValue, recHistoryNewValueDuo);
            }
        }
        // for (const repositoryId in operationsByRepo) {
        // 	const repoTransHistory = await
        // 		this.currentTransHistory.getRepositoryTransaction(
        // 			repositoryId, null, null, null, repoTransHistoryDuo);
        // 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
        // }
    }
}
exports.InsertManager = InsertManager;
di_1.DI.set(diTokens_1.INSERT_MANAGER, InsertManager);
//# sourceMappingURL=InsertManager.js.map