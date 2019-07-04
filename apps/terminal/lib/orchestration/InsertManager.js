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
        const jsonInsertValues = portableQuery.jsonQuery;
        const columnIndexSet = {};
        for (const columnIndex of jsonInsertValues.C) {
            if (columnIndex < 0 || columnIndex >= dbEntity.columns.length) {
                throw new Error(`Invalid column index: ${columnIndex}`);
            }
            if (columnIndexSet[columnIndex]) {
                throw new Error(`Column ${dbEntity.name}.${dbEntity.columns[columnIndex].name} 
				appears more than once in the Columns clause`);
            }
            columnIndexSet[columnIndex] = true;
        }
        if (dbEntity.isRepositoryEntity) {
            this.ensureRepositoryEntityIdValues(actor, dbEntity, portableQuery.jsonQuery);
        }
        let ids;
        if (ensureGeneratedValues) {
            ids = await this.ensureGeneratedValues(dbEntity, portableQuery.jsonQuery, sequenceGenerator);
        }
        if (!dbEntity.isLocal) {
            await this.addInsertHistory(dbEntity, portableQuery, actor, historyManager, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, repositoryManager, repoTransHistoryDuo, transactionManager);
        }
        const numberOfInsertedRecords = await storeDriver.insertValues(portableQuery);
        return getIds ? ids : numberOfInsertedRecords;
    }
    async addRepository(name, url = null, platform = terminal_map_1.PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH) {
        const [repoManager, transManager] = await di_1.DI.get(diTokens_1.REPOSITORY_MANAGER, terminal_map_1.TRANSACTION_MANAGER);
        const repository = await repoManager.createRepository(name, distributionStrategy, transManager.storeType, platform, platformConfig, 'id');
        return repository.id;
    }
    async ensureGeneratedValues(dbEntity, jsonInsertValues, seqGenerator) {
        const values = jsonInsertValues.V;
        const idColumns = dbEntity.idColumns;
        const allIds = [];
        for (const entityValues of values) {
            allIds.push([]);
        }
        for (const idColumn of idColumns) {
            if (idColumn.isGenerated) {
                continue;
            }
            const matchingColumns = jsonInsertValues.C.map((columnIndex, index) => [columnIndex, index]).filter(([columnIndex, index]) => columnIndex === idColumn.index);
            if (matchingColumns.length < 1) {
                throw new Error(`Could not find @Id column ${dbEntity.name}.${idColumn.name} in
					the insert statement.  Non-generated @Id columns must be present in the Insert
					statement.`);
            }
            const insertIdColumnIndex = matchingColumns[0];
            const columnIndex = idColumn.index;
            for (let i = 0; i < values.length; i++) {
                const entityValues = values[i];
                const idValues = allIds[i];
                let idValue = entityValues[insertIdColumnIndex[1]];
                if (!idValue && idValue !== 0) {
                    throw `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`;
                }
                idValues[columnIndex] = idValue;
            }
        }
        // if (dbEntity.isRepositoryEntity) {
        // 	const repositoryColumn  = dbEntity.columnMap[repositoryEntity.FOREIGN_KEY]
        // 	const repositoryIdIndex = repositoryColumn.index
        // 	for (const entityValues of values) {
        // 		const repositoryId = entityValues[repositoryIdIndex]
        // 		if (!repositoryId && repositoryId !== 0) {
        // 			throw `@Column({ name: 'REPOSITORY_ID'}) value is not specified on insert for
        // 			'${dbEntity0.name}.${repositoryColumn.name}'.`
        // 		}
        // 	}
        // }
        const generatedColumns = dbEntity.columns.filter(dbColumn => dbColumn.isGenerated);
        const generatedColumnIndexes = [];
        let numAddedColumns = 0;
        for (const generatedColumn of generatedColumns) {
            const matchingColumns = jsonInsertValues.C.filter(columnIndex => columnIndex === generatedColumn.index);
            if (!matchingColumns.length) {
                // TODO: verify that it is OK to mutate the JsonInsertValues query
                jsonInsertValues.C.push(generatedColumn.index);
                generatedColumnIndexes.push(jsonInsertValues.C.length + numAddedColumns);
                numAddedColumns++;
                continue;
            }
            const generatedIdColumnIndex = matchingColumns[0];
            generatedColumnIndexes.push(generatedIdColumnIndex);
            for (const entityValues of values) {
                const generatedValue = entityValues[generatedIdColumnIndex];
                if (generatedValue || generatedValue === 0) {
                    // Allowing negative integers for temporary identification
                    // within the circular dependency management lookup
                    if (generatedValue >= 0) {
                        throw `Already provided value '${entityValues[generatedColumn.index]}'
					on insert for @GeneratedValue '${dbEntity.name}.${generatedColumn.name}'.
					You cannot explicitly provide values for @GeneratedValue columns'.`;
                    }
                }
            }
        }
        const numSequencesNeeded = generatedColumns.map(_ => values.length);
        const generatedSequenceValues = await seqGenerator.generateSequenceNumbers(generatedColumns, numSequencesNeeded);
        generatedColumns.forEach((dbColumn, generatedColumnIndex) => {
            const generatedColumnSequenceValues = generatedSequenceValues[generatedColumnIndex];
            const insertColumnIndex = generatedColumnIndexes[generatedColumnIndex];
            const columnIndex = dbColumn.index;
            values.forEach((entityValues, index) => {
                const generatedValue = generatedColumnSequenceValues[index];
                entityValues[insertColumnIndex] = generatedValue;
                allIds[index][columnIndex] = generatedValue;
            });
        });
        if (!idColumns.length && !generatedColumns.length) {
            return values.length;
        }
        switch (idColumns.length) {
            case 0: {
                if (generatedColumns.length == 1) {
                    const columnIndex = generatedColumns[0].index;
                    return allIds.map(rowIds => rowIds[columnIndex]);
                }
                break;
            }
            case 1: {
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
    ensureRepositoryEntityIdValues(actor, dbEntity, jsonInsertValues) {
        // const actorRecordIds: RepositoryEntityActorRecordId[] = []
        const actorIdColumn = dbEntity.idColumnMap['ACTOR_ID'];
        // const actorRecordIdColumn                             =
        // dbEntity.idColumnMap['ACTOR_RECORD_ID']
        const repositoryIdColumn = dbEntity.idColumnMap['REPOSITORY_ID'];
        for (const entityValues of jsonInsertValues.V) {
            if (entityValues[actorIdColumn.index] || entityValues[actorIdColumn.index] === 0) {
                throw `Already provided value '${entityValues[actorIdColumn.index]}'
				on insert for @Id '${dbEntity.name}.${actorIdColumn.name}'.
				You cannot explicitly provide a value for ACTOR_ID on Repository row inserts.`;
            }
            // if (entityValues[actorRecordIdColumn.index] ||
            // entityValues[actorRecordIdColumn.index] === 0) { throw `Already provided value
            // '${entityValues[actorRecordIdColumn.index]}' on insert for @Id @GeneratedValue
            // '${dbEntity.name}.${actorRecordIdColumn.name}'. You cannot explicitly provide
            // values for generated ids.` }
            if (!entityValues[repositoryIdColumn.index]) {
                throw `Did not provide a positive integer value 
				(instead provided '${entityValues[repositoryIdColumn.index]}')
				 on insert for @Id '${dbEntity.name}.${repositoryIdColumn.name}'.
				 You must explicitly provide a value for REPOSITORY_ID on Repository row inserts.`;
            }
            entityValues[actorIdColumn.index] = actor.id;
            // const actorRecordId               = this.idGenerator.generateEntityId(dbEntity)
            // actorRecordIds.push(actorRecordId)
            // entityValues[actorRecordIdColumn.index] = actorRecordId
        }
        // return actorRecordIds
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
    async addInsertHistory(dbEntity, portableQuery, actor, histManager, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, repoManager, repoTransHistoryDuo, transManager) {
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
            const repo = await repoManager.getRepository(repositoryId);
            let repoTransHistory = repoTransHistories[repositoryId];
            if (!repoTransHistory) {
                repoTransHistory = await histManager
                    .getNewRepoTransHistory(transManager.currentTransHistory, repo, actor);
            }
            let operationHistory = operationsByRepo[repositoryId];
            if (!operationHistory) {
                operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, ground_control_1.ChangeType.INSERT_VALUES, dbEntity, operHistoryDuo);
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