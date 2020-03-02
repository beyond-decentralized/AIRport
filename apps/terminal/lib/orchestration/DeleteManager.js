"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const tokens_1 = require("../tokens");
class DeleteManager {
    async deleteWhere(portableQuery, actor) {
        const [airDb, historyManager, offlineDataStore, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoManager, repositoryManager, repoTransHistoryDuo, schemaUtils, sequenceGenerator, storeDriver, transManager] = await di_1.container(this).get(air_control_1.AIR_DB, tokens_1.HISTORY_MANAGER, tokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.OPER_HISTORY_DUO, holding_pattern_1.REC_HISTORY_DUO, holding_pattern_1.REC_HIST_OLD_VALUE_DUO, tokens_1.REPOSITORY_MANAGER, tokens_1.REPOSITORY_MANAGER, holding_pattern_1.REPO_TRANS_HISTORY_DUO, air_control_1.SCHEMA_UTILS, check_in_1.SEQUENCE_GENERATOR, ground_control_1.STORE_DRIVER, terminal_map_1.TRANSACTION_MANAGER);
        const dbEntity = airDb
            .schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex];
        const deleteCommand = storeDriver.deleteWhere(portableQuery);
        if (dbEntity.isLocal) {
            return await deleteCommand;
        }
        const selectCascadeTree = this.getCascadeSubTree(dbEntity, schemaUtils);
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
        };
        const treesToDelete = await storeDriver
            .find(portableSelect, {});
        const recordsToDelete = new Map();
        const repositoryIdSet = new Set();
        for (const treeToDelete of treesToDelete) {
            this.recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet, schemaUtils);
        }
        await this.recordTreeToDelete(recordsToDelete, actor, airDb, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoTransHistoryDuo, schemaUtils, sequenceGenerator, transManager);
        return await deleteCommand;
    }
    recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet, schemaUtils) {
        const repositoryId = treeToDelete.repository.id;
        repositoryIdSet.add(repositoryId);
        const recordsToDeleteForSchema = ground_control_1.ensureChildJsMap(recordsToDelete, dbEntity.schemaVersion.schema.index);
        const recordsToDeleteForTable = ground_control_1.ensureChildJsMap(recordsToDeleteForSchema, dbEntity.index);
        const recordsToDeleteForRepository = ground_control_1.ensureChildArray(recordsToDeleteForTable, repositoryId);
        const recordToDelete = {};
        // FIXME: implement
        recordsToDeleteForRepository.push(recordToDelete);
        for (const dbProperty of dbEntity.properties) {
            if (dbProperty.relation && dbProperty.relation.length) {
                if (!treeToDelete[dbProperty.name]) {
                    continue;
                }
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        schemaUtils.forEachColumnOfRelation(dbRelation, treeToDelete, (dbColumn, value, propertyNameChains) => {
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
                                        this.recordRepositoryIds(childTree, childDbEntity, recordsToDelete, repositoryIdSet, schemaUtils);
                                    });
                                }
                                break;
                        }
                        break;
                    default:
                        throw new Error(`Unknown relation type: '${dbRelation.relationType}' 
							on '${dbEntity.name}.${dbRelation.property.name}'.`);
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
        // 	throw new Error(`Values cannot be undefined, please use null.`_;
        // }
        if (foundValues[dbColumn.name] === undefined) {
            foundValues[dbColumn.name] = value;
            return false;
        }
        if (!air_control_1.valuesEqual(foundValues[dbColumn.name], value)) {
            throw new Error(`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.name]} !== ${value}`);
        }
        return true;
    }
    async recordTreeToDelete(recordsToDelete, actor, airDb, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoTransHistoryDuo, schemaUtils, sequenceGenerator, transManager) {
        let systemWideOperationId;
        for (const [schemaIndex, schemaRecordsToDelete] of recordsToDelete) {
            for (const [entityIndex, entityRecordsToDelete] of schemaRecordsToDelete) {
                const dbEntity = airDb.schemas[schemaIndex].currentVersion.entities[entityIndex];
                if (!systemWideOperationId) {
                    systemWideOperationId = await check_in_1.getSysWideOpId(airDb, sequenceGenerator);
                }
                for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
                    const repoTransHistory = await historyManager.getNewRepoTransHistory(transManager.currentTransHistory, repositoryId, actor);
                    const operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, systemWideOperationId, ground_control_1.ChangeType.DELETE_ROWS, dbEntity, operHistoryDuo);
                    for (const recordToDelete of entityRecordsToDeleteForRepo) {
                        const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, recordToDelete.actorRecordId, recHistoryDuo);
                        for (const dbProperty of dbEntity.properties) {
                            if (dbProperty.relation && dbProperty.relation.length) {
                                const dbRelation = dbProperty.relation[0];
                                switch (dbRelation.relationType) {
                                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                                        schemaUtils.forEachColumnOfRelation(dbRelation, recordToDelete, (dbColumn, value, propertyNameChains) => {
                                            recHistoryDuo.addOldValue(recordHistory, dbColumn, value, recHistoryOldValueDuo);
                                        });
                                        break;
                                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                                        // One-To-Many do not contain any columns in source entity
                                        break;
                                    default:
                                        throw new Error(`Unknown relation type: '${dbRelation.relationType}'
										on '${dbEntity.name}.${dbProperty.name}'.`);
                                }
                            }
                            else {
                                const dbColumn = dbProperty.propertyColumns[0].column;
                                recHistoryDuo
                                    .addOldValue(recordHistory, dbColumn, recordToDelete[dbProperty.name], recHistoryOldValueDuo);
                            }
                        }
                    }
                }
            }
        }
    }
    getCascadeSubTree(dbEntity, schemaUtils, selectClause = {}) {
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
                        this.getCascadeSubTree(dbRelation.relationEntity, schemaUtils, subTree);
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        schemaUtils.addRelationToEntitySelectClause(dbRelation, selectClause);
                        break;
                    default:
                        throw new Error(`Unknown relation type: '${dbRelation.relationType}' 
							on '${dbEntity.name}.${dbProperty.name}'.`);
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
di_1.DI.set(tokens_1.DELETE_MANAGER, DeleteManager);
//# sourceMappingURL=DeleteManager.js.map