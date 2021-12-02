import { AIRPORT_DATABASE, APPLICATION_UTILS, valuesEqual, Y } from '@airport/air-control';
import { getSysWideOpId, SEQUENCE_GENERATOR } from '@airport/check-in';
import { container, DI, } from '@airport/di';
import { ChangeType, ensureChildArray, ensureChildJsMap, EntityRelationType, QueryResultType, } from '@airport/ground-control';
import { OPER_HISTORY_DUO, REC_HIST_OLD_VALUE_DUO, REC_HISTORY_DUO, REPOSITORY_TRANSACTION_HISTORY_DUO, } from '@airport/holding-pattern';
import { DELETE_MANAGER, HISTORY_MANAGER } from '../tokens';
export class DeleteManager {
    async deleteWhere(portableQuery, actor, transaction, context = {}) {
        const [airDb, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoTransHistoryDuo, applicationUtils, sequenceGenerator] = await container(this)
            .get(AIRPORT_DATABASE, HISTORY_MANAGER, OPER_HISTORY_DUO, REC_HISTORY_DUO, REC_HIST_OLD_VALUE_DUO, REPOSITORY_TRANSACTION_HISTORY_DUO, APPLICATION_UTILS, SEQUENCE_GENERATOR);
        const dbEntity = airDb
            .applications[portableQuery.applicationIndex].currentVersion[0].applicationVersion
            .entities[portableQuery.tableIndex];
        const deleteCommand = transaction.deleteWhere(portableQuery, context);
        if (dbEntity.isLocal || transaction.isSync) {
            return await deleteCommand;
        }
        const selectCascadeTree = this.getCascadeSubTree(dbEntity, applicationUtils);
        const jsonDelete = portableQuery.jsonQuery;
        const jsonSelect = {
            S: selectCascadeTree,
            F: [jsonDelete.DF],
            W: jsonDelete.W,
        };
        const portableSelect = {
            applicationIndex: portableQuery.applicationIndex,
            tableIndex: portableQuery.tableIndex,
            jsonQuery: jsonSelect,
            queryResultType: QueryResultType.ENTITY_TREE,
            parameterMap: portableQuery.parameterMap,
        };
        const treesToDelete = await transaction
            .find(portableSelect, {}, context);
        const recordsToDelete = new Map();
        const repositoryIdSet = new Set();
        for (const treeToDelete of treesToDelete) {
            this.recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet, applicationUtils);
        }
        await this.recordTreeToDelete(recordsToDelete, actor, airDb, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoTransHistoryDuo, applicationUtils, sequenceGenerator, transaction);
        return await deleteCommand;
    }
    recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet, applicationUtils) {
        const repositoryId = treeToDelete.repository.id;
        repositoryIdSet.add(repositoryId);
        const recordsToDeleteForApplication = ensureChildJsMap(recordsToDelete, dbEntity.applicationVersion.application.index);
        const recordsToDeleteForTable = ensureChildJsMap(recordsToDeleteForApplication, dbEntity.index);
        const recordsToDeleteForRepository = ensureChildArray(recordsToDeleteForTable, repositoryId);
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
                    case EntityRelationType.MANY_TO_ONE:
                        applicationUtils.forEachColumnOfRelation(dbRelation, treeToDelete, (dbColumn, value, propertyNameChains) => {
                            this.columnProcessed(dbProperty, recordToDelete, dbColumn, value);
                        }, false);
                        break;
                    case EntityRelationType.ONE_TO_MANY:
                        if (!dbRelation.oneToManyElems) {
                            continue;
                        }
                        let childTrees = treeToDelete[dbRelation.property.name];
                        if (childTrees && childTrees.length) {
                            const childDbEntity = dbRelation.relationEntity;
                            childTrees.forEach(childTree => {
                                this.recordRepositoryIds(childTree, childDbEntity, recordsToDelete, repositoryIdSet, applicationUtils);
                            });
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
        if (!valuesEqual(foundValues[dbColumn.name], value)) {
            throw new Error(`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.name]} !== ${value}`);
        }
        return true;
    }
    async recordTreeToDelete(recordsToDelete, actor, airDb, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoTransHistoryDuo, applicationUtils, sequenceGenerator, transaction) {
        let systemWideOperationId;
        for (const [applicationIndex, applicationRecordsToDelete] of recordsToDelete) {
            for (const [entityIndex, entityRecordsToDelete] of applicationRecordsToDelete) {
                const dbEntity = airDb.applications[applicationIndex].currentVersion[0]
                    .applicationVersion.entities[entityIndex];
                if (!systemWideOperationId) {
                    systemWideOperationId = await getSysWideOpId(airDb, sequenceGenerator);
                }
                for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
                    const repoTransHistory = await historyManager.getNewRepoTransHistory(transaction.transHistory, repositoryId, actor);
                    const operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, systemWideOperationId, ChangeType.DELETE_ROWS, dbEntity, operHistoryDuo);
                    for (const recordToDelete of entityRecordsToDeleteForRepo) {
                        const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, recordToDelete.actorRecordId, recHistoryDuo);
                        for (const dbProperty of dbEntity.properties) {
                            if (dbProperty.relation && dbProperty.relation.length) {
                                const dbRelation = dbProperty.relation[0];
                                switch (dbRelation.relationType) {
                                    case EntityRelationType.MANY_TO_ONE:
                                        applicationUtils.forEachColumnOfRelation(dbRelation, recordToDelete, (dbColumn, value, propertyNameChains) => {
                                            recHistoryDuo.addOldValue(recordHistory, dbColumn, value, recHistoryOldValueDuo);
                                        });
                                        break;
                                    case EntityRelationType.ONE_TO_MANY:
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
    getCascadeSubTree(dbEntity, applicationUtils, selectClause = {}) {
        for (const dbProperty of dbEntity.properties) {
            let dbRelation;
            if (dbProperty.relation && dbProperty.relation.length) {
                dbRelation = dbProperty.relation[0];
            }
            if (dbRelation) {
                switch (dbRelation.relationType) {
                    case EntityRelationType.ONE_TO_MANY:
                        if (!dbRelation.oneToManyElems) {
                            continue;
                        }
                        const subTree = {};
                        selectClause[dbProperty.name] = subTree;
                        this.getCascadeSubTree(dbRelation.relationEntity, applicationUtils, subTree);
                        break;
                    case EntityRelationType.MANY_TO_ONE:
                        applicationUtils.addRelationToEntitySelectClause(dbRelation, selectClause);
                        break;
                    default:
                        throw new Error(`Unknown relation type: '${dbRelation.relationType}' 
							on '${dbEntity.name}.${dbProperty.name}'.`);
                }
            }
            else {
                selectClause[dbProperty.name] = Y;
            }
        }
        return selectClause;
    }
}
DI.set(DELETE_MANAGER, DeleteManager);
//# sourceMappingURL=DeleteManager.js.map