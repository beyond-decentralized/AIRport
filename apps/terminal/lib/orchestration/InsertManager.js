"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const fuel_hydrant_system_1 = require("@airport/fuel-hydrant-system");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class InsertManager {
    constructor() {
        di_1.DI.get((airportDatabase, dataStore, sequenceGenerator, historyManager, offlineDataStore, repositoryManager, transactionManager) => {
            this.airDb = airportDatabase;
            this.dataStore = dataStore;
            this.seqGenerator = sequenceGenerator;
            this.histManager = historyManager;
            this.offlineDataStore = offlineDataStore;
            this.repoManager = repositoryManager;
            this.transManager = transactionManager;
        }, air_control_1.AIR_DB, ground_control_1.STORE_DRIVER, fuel_hydrant_system_1.SEQUENCE_GENERATOR, diTokens_1.HISTORY_MANAGER, diTokens_1.OFFLINE_DELTA_STORE, diTokens_1.REPOSITORY_MANAGER, terminal_map_1.TRANSACTION_MANAGER);
        this.operHistoryDuo = di_1.DI.getP(holding_pattern_1.OPER_HISTORY_DUO);
        this.recHistoryDuo = di_1.DI.getP(holding_pattern_1.REC_HISTORY_DUO);
        this.repoTransHistoryDuo = di_1.DI.getP(holding_pattern_1.REPO_TRANS_HISTORY_DUO);
        // this.transHistoryDuo     = DI.getP(TRANS_HISTORY_DUO)
    }
    get currentTransHistory() {
        return this.transManager.currentTransHistory;
    }
    async insertValues(portableQuery, actor, ensureGeneratedValues) {
        return this.internalInsertValues(portableQuery, actor, false, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, actor) {
        return this.internalInsertValues(portableQuery, actor, true);
    }
    async internalInsertValues(portableQuery, actor, getIds = false, ensureGeneratedValues = true) {
        const dbEntity = this.airDb.schemas[portableQuery.schemaIndex]
            .currentVersion.entities[portableQuery.tableIndex];
        if (dbEntity.isRepositoryEntity) {
            this.ensureRepositoryEntityIdValues(actor, dbEntity, portableQuery.jsonQuery);
        }
        let ids;
        if (ensureGeneratedValues) {
            ids = await this.ensureGeneratedValues(dbEntity, portableQuery.jsonQuery);
        }
        if (!dbEntity.isLocal) {
            await this.addInsertHistory(dbEntity, portableQuery, actor);
        }
        const numberOfInsertedRecords = await this.dataStore.insertValues(portableQuery);
        return getIds ? ids : numberOfInsertedRecords;
    }
    async addRepository(name, url = null, platform = terminal_map_1.PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH) {
        const repository = await this.repoManager.createRepository(name, distributionStrategy, this.transManager.storeType, platform, platformConfig, 'id');
        return repository.id;
    }
    async ensureGeneratedValues(dbEntity, jsonInsertValues) {
        let ids = null;
        const values = jsonInsertValues.V;
        const idColumns = dbEntity.idColumns;
        for (const idColumn of idColumns) {
            if (idColumn.isGenerated) {
                continue;
            }
            for (const entityValues of values) {
                if (!entityValues[idColumn.index]) {
                    throw `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`;
                }
            }
        }
        // if (dbEntity.isRepositoryEntity) {
        // 	const repositoryColumn  = dbEntity.columnMap[repositoryEntity.FOREIGN_KEY]
        // 	const repositoryIdIndex = repositoryColumn.index
        // 	for (const entityValues of values) {
        // 		const repositoryId = entityValues[repositoryIdIndex]
        // 		if (!repositoryId && repositoryId !== 0) {
        // 			throw `@Column({ name: 'REPOSITORY_ID'}) value is not specified on insert for
        // 			'${dbEntity.name}.${repositoryColumn.name}'.`
        // 		}
        // 	}
        // }
        const generatedColumns = dbEntity.columns.filter(dbColumn => dbColumn.isGenerated);
        if (!generatedColumns.length) {
            if (idColumns.length === 1) {
                const idColumn = idColumns[0];
                ids = values.map(entityValues => entityValues[idColumn.index]);
            }
            return ids;
        }
        for (const entityValues of values) {
            generatedColumns.forEach((generatedColumn) => {
                if (entityValues[generatedColumn.index] || entityValues[generatedColumn.index] === 0) {
                    throw `Already provided value '${entityValues[generatedColumn.index]}'
					on insert for @GeneratedValue '${dbEntity.name}.${generatedColumn.name}'.
					You cannot explicitly provide values for @GeneratedValue columns'.`;
                }
            });
        }
        const numSequencesNeeded = generatedColumns.map(_ => values.length);
        const generatedSequenceValues = this.seqGenerator.generateSequenceNumbers(generatedColumns, numSequencesNeeded);
        generatedColumns.forEach((dbColumn, generatedColumnIndex) => {
            const generatedColumnSequenceValues = generatedSequenceValues[generatedColumnIndex];
            values.forEach((entityValues, index) => {
                entityValues[dbColumn.index] = generatedColumnSequenceValues[index];
            });
            if (dbEntity.idColumnMap[dbColumn.name]) {
                ids = values.map(entityValues => entityValues[dbColumn.index]);
            }
        });
        return ids;
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
    async addInsertHistory(dbEntity, portableQuery, actor) {
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
        const repoTransHistoryDuo = await this.repoTransHistoryDuo;
        const operHistoryDuo = await this.operHistoryDuo;
        const recHistoryDuo = await this.recHistoryDuo;
        // Rows may belong to different repositories
        for (const row of jsonInsertValues.V) {
            const repositoryId = row[repositoryIdColumnNumber];
            const repo = await this.repoManager.getRepository(repositoryId);
            let repoTransHistory = repoTransHistories[repositoryId];
            if (!repoTransHistory) {
                repoTransHistory = await this.histManager
                    .getNewRepoTransHistory(this.currentTransHistory, repo, actor);
            }
            let operationHistory = operationsByRepo[repositoryId];
            if (!operationHistory) {
                operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, ground_control_1.ChangeType.INSERT_VALUES, dbEntity);
                operationsByRepo[repositoryId] = operationHistory;
            }
            const actorRecordId = row[actorRecordIdColumnNumber];
            const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, actorRecordId);
            for (const columnNumber in jsonInsertValues.C) {
                if (columnNumber === repositoryIdColumnNumber
                    || columnNumber === actorIdColumnNumber
                    || columnNumber === actorRecordIdColumnNumber) {
                    continue;
                }
                const columnIndex = jsonInsertValues.C[columnNumber];
                const dbColumn = dbEntity.columns[columnIndex];
                const newValue = row[columnNumber];
                recHistoryDuo.addNewValue(recordHistory, dbColumn, newValue);
            }
        }
        // for (const repositoryId in operationsByRepo) {
        // 	const repoTransHistory = await
        // 		this.currentTransHistory.getRepositoryTransaction(
        // 			repositoryId, null, null, null);
        // 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
        // }
    }
}
exports.InsertManager = InsertManager;
di_1.DI.set(diTokens_1.INSERT_MANAGER, InsertManager);
//# sourceMappingURL=InsertManager.js.map