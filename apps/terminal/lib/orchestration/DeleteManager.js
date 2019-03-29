"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class DeleteManager {
    constructor() {
        di_1.DI.get((airportDatabase, dataStore, historyManager, offlineDataStore, operationHistoryDmo, recordHistoryDmo, repositoryManager, repositoryTransactionHistoryDmo, transactionHistoryDmo, transactionManager, utils) => {
            this.airDb = airportDatabase;
            this.dataStore = dataStore;
            this.historyManager = historyManager;
            this.offlineDataStore = offlineDataStore;
            this.operHistoryDmo = operationHistoryDmo;
            this.recHistoryDmo = recordHistoryDmo;
            this.repoManager = repositoryManager;
            this.repoTransHistoryDmo = repositoryTransactionHistoryDmo;
            this.transHistoryDmo = transactionHistoryDmo;
            this.transManager = transactionManager;
            this.utils = utils;
        }, air_control_1.AIR_DB, diTokens_1.STORE_DRIVER, diTokens_1.HISTORY_MANAGER, diTokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.OPER_HISTORY_DMO, holding_pattern_1.REC_HISTORY_DMO, diTokens_1.REPOSITORY_MANAGER, holding_pattern_1.REPO_TRANS_HISTORY_DMO, holding_pattern_1.TRANS_HISTORY_DMO, terminal_map_1.TRANSACTION_MANAGER, air_control_1.UTILS);
    }
    async deleteWhere(portableQuery, actor) {
        const dbEntity = this.airDb
            .schemas[portableQuery.schemaIndex].entities[portableQuery.tableIndex];
        const deleteCommand = this.dataStore.deleteWhere(portableQuery);
        if (dbEntity.isLocal) {
            return await deleteCommand;
        }
        const selectCascadeTree = this.getCascadeSubTree(dbEntity);
        const jsonDelete = portableQuery.jsonQuery;
        const jsonSelect = {
            S: selectCascadeTree,
            F: [jsonDelete.DF],
            W: jsonDelete.W,
        };
        const portableSelect = {
            schemaIndex: portableQuery.schemaIndex,
            tableIndex: portableQuery.tableIndex,
            jsonQuery: jsonSelect,
            queryResultType: ground_control_1.QueryResultType.ENTITY_TREE,
            parameterMap: portableQuery.parameterMap,
            values: portableQuery.values,
        };
        const treesToDelete = await this.dataStore.find(portableSelect);
        const recordsToDelete = new Map();
        const repositoryIdSet = new Set();
        for (const treeToDelete of treesToDelete) {
            await this.recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet);
        }
        const repositoryIds = Array.from(repositoryIdSet);
        const repositories = await this.repoManager.findReposWithDetailsByIds(...repositoryIds);
        await this.recordTreeToDelete(recordsToDelete, repositories, actor);
        return await deleteCommand;
    }
    recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet) {
        const repositoryId = treeToDelete.repository.id;
        repositoryIdSet.add(repositoryId);
        const recordsToDeleteForSchema = this.utils.ensureChildJsMap(recordsToDelete, dbEntity.schema.index);
        const recordsToDeleteForTable = this.utils.ensureChildJsMap(recordsToDeleteForSchema, dbEntity.index);
        const recordsToDeleteForRepository = this.utils.ensureChildArray(recordsToDeleteForTable, repositoryId);
        const recordToDelete = {};
        recordsToDeleteForRepository.push(recordToDelete);
        for (const dbProperty of dbEntity.properties) {
            if (dbProperty.relation && dbProperty.relation.length) {
                if (!treeToDelete[dbProperty.name]) {
                    continue;
                }
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        this.utils.Schema.forEachColumnOfRelation(dbRelation, treeToDelete, (dbColumn, value, propertyNameChains) => {
                            this.columnProcessed(dbProperty, recordToDelete, dbColumn, value);
                        }, false);
                        break;
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        if (!dbRelation.oneToManyElems) {
                            continue;
                        }
                        switch (dbRelation.oneToManyElems.cascade) {
                            case ground_control_1.CascadeType.ALL:
                            case ground_control_1.CascadeType.REMOVE:
                                let childTrees = treeToDelete[dbRelation.property.name];
                                if (childTrees && childTrees.length) {
                                    const childDbEntity = dbRelation.relationEntity;
                                    childTrees.forEach(childTree => {
                                        this.recordRepositoryIds(childTree, childDbEntity, recordsToDelete, repositoryIdSet);
                                    });
                                }
                                break;
                        }
                        break;
                    default:
                        throw `Unknown relation type: '${dbRelation.relationType}' on '${dbEntity.name}.${dbRelation.property.name}'.`;
                }
            }
            else {
                const value = treeToDelete[dbProperty.name];
                if (value === null || value === undefined) {
                    continue;
                }
                this.columnProcessed(dbProperty, recordToDelete, dbProperty.propertyColumns[0].column, value);
            }
        }
    }
    /*
     Values for the same column could be repeated in different places in the object graph.
     For example, if the same column is mapped to two different @ManyToOne relations.
     In this case, when persisting an entity we need to make sure that all values for the
     entity in question are being persisted.
     */
    columnProcessed(dbProperty, foundValues, dbColumn, value) {
        // if (value === undefined) {
        // 	throw `Values cannot be undefined, please use null.`;
        // }
        if (foundValues[dbColumn.name] === undefined) {
            foundValues[dbColumn.name] = value;
            return false;
        }
        if (!this.utils.valuesEqual(foundValues[dbColumn.name], value)) {
            throw `Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.name]} !== ${value}`;
        }
        return true;
    }
    async recordTreeToDelete(recordsToDelete, repositories, actor) {
        for (const [schemaIndex, schemaRecordsToDelete] of recordsToDelete) {
            for (const [entityIndex, entityRecordsToDelete] of schemaRecordsToDelete) {
                const dbEntity = this.airDb.schemas[schemaIndex].entities[entityIndex];
                for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
                    const repository = repositories.get(repositoryId);
                    const repoTransHistory = this.historyManager.getNewRepoTransHistory(this.transManager.currentTransHistory, repository, actor);
                    const operationHistory = this.repoTransHistoryDmo.startOperation(repoTransHistory, ground_control_1.ChangeType.DELETE_ROWS, dbEntity);
                    for (const recordToDelete of entityRecordsToDeleteForRepo) {
                        const recordHistory = this.operHistoryDmo.startRecordHistory(operationHistory, recordToDelete.actorRecordId);
                        for (const dbProperty of dbEntity.properties) {
                            if (dbProperty.relation && dbProperty.relation.length) {
                                const dbRelation = dbProperty.relation[0];
                                switch (dbRelation.relationType) {
                                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                                        this.utils.Schema.forEachColumnOfRelation(dbRelation, recordToDelete, (dbColumn, value, propertyNameChains) => {
                                            this.recHistoryDmo.addOldValue(recordHistory, dbColumn, value);
                                        });
                                        break;
                                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                                        // One-To-Many do not contain any columns in source entity
                                        break;
                                    default:
                                        throw `Unknown relation type: '${dbRelation.relationType}'
										on '${dbEntity.name}.${dbProperty.name}'.`;
                                }
                            }
                            else {
                                const dbColumn = dbProperty.propertyColumns[0].column;
                                this.recHistoryDmo
                                    .addOldValue(recordHistory, dbColumn, recordToDelete[dbProperty.name]);
                            }
                        }
                    }
                }
            }
        }
    }
    getCascadeSubTree(dbEntity, selectClause = {}) {
        for (const dbProperty of dbEntity.properties) {
            let dbRelation;
            if (dbProperty.relation && dbProperty.relation.length) {
                dbRelation = dbProperty.relation[0];
            }
            if (dbRelation) {
                switch (dbRelation.relationType) {
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        if (!dbRelation.oneToManyElems) {
                            continue;
                        }
                        switch (dbRelation.oneToManyElems.cascade) {
                            case ground_control_1.CascadeType.ALL:
                            case ground_control_1.CascadeType.REMOVE:
                                break;
                            default:
                                continue;
                        }
                        const subTree = {};
                        selectClause[dbProperty.name] = subTree;
                        this.getCascadeSubTree(dbRelation.relationEntity, subTree);
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        this.utils.Schema.addRelationToEntitySelectClause(dbRelation, selectClause);
                        break;
                    default:
                        throw `Unknown relation type: '${dbRelation.relationType}' on '${dbEntity.name}.${dbProperty.name}'.`;
                }
            }
            else {
                selectClause[dbProperty.name] = air_control_1.Y;
            }
        }
        return selectClause;
    }
}
exports.DeleteManager = DeleteManager;
di_1.DI.set(diTokens_1.DELETE_MANAGER, DeleteManager);
//# sourceMappingURL=DeleteManager.js.map