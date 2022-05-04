var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { valuesEqual, Y } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { getSysWideOpId } from '@airport/check-in';
import { ChangeType, ensureChildArray, ensureChildJsMap, EntityRelationType, QueryResultType, repositoryEntity, } from '@airport/ground-control';
let DeleteManager = class DeleteManager {
    async deleteWhere(portableQuery, actor, transaction, rootTransaction, context) {
        const dbEntity = this.airportDatabase
            .applications[portableQuery.applicationIndex].currentVersion[0].applicationVersion
            .entities[portableQuery.tableIndex];
        const deleteCommand = transaction.deleteWhere(portableQuery, context);
        if (dbEntity.isLocal || transaction.isSync) {
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
            applicationIndex: portableQuery.applicationIndex,
            tableIndex: portableQuery.tableIndex,
            jsonQuery: jsonSelect,
            queryResultType: QueryResultType.ENTITY_TREE,
            parameterMap: portableQuery.parameterMap,
            // values: portableQuery.values,
        };
        const treesToDelete = await transaction
            .find(portableSelect, {}, context);
        const recordsToDelete = new Map();
        const repositoryIdSet = new Set();
        for (const treeToDelete of treesToDelete) {
            this.recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet, this.applicationUtils);
        }
        await this.recordTreeToDelete(recordsToDelete, actor, transaction, rootTransaction, context);
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
    async recordTreeToDelete(recordsToDelete, actor, transaction, rootTransaction, context) {
        let systemWideOperationId;
        for (const [applicationIndex, applicationRecordsToDelete] of recordsToDelete) {
            for (const [entityIndex, entityRecordsToDelete] of applicationRecordsToDelete) {
                const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
                    .applicationVersion.entities[entityIndex];
                if (!systemWideOperationId) {
                    systemWideOperationId = await getSysWideOpId(this.airportDatabase, this.sequenceGenerator);
                }
                for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
                    const repositoryTransactionHistory = await this.historyManager.getNewRepositoryTransactionHistory(transaction.transactionHistory, repositoryId, context);
                    const operationHistory = this.repositoryTransactionHistoryDuo.startOperation(repositoryTransactionHistory, systemWideOperationId, ChangeType.DELETE_ROWS, dbEntity, actor, rootTransaction);
                    for (const recordToDelete of entityRecordsToDeleteForRepo) {
                        const recordHistory = this.operationHistoryDuo.startRecordHistory(operationHistory, recordToDelete.actor.id, recordToDelete.actorRecordId);
                        for (const dbProperty of dbEntity.properties) {
                            if (dbProperty.relation && dbProperty.relation.length) {
                                const dbRelation = dbProperty.relation[0];
                                switch (dbRelation.relationType) {
                                    case EntityRelationType.MANY_TO_ONE:
                                        this.applicationUtils.forEachColumnOfRelation(dbRelation, recordToDelete, (dbColumn, value, propertyNameChains) => {
                                            switch (dbColumn.name) {
                                                // Do not add Actor or Repository the are recorded
                                                // at record history level
                                                case repositoryEntity.ACTOR_ID:
                                                case repositoryEntity.REPOSITORY_ID:
                                                    break;
                                                default:
                                                    this.recordHistoryDuo.addOldValue(recordHistory, dbColumn, value);
                                            }
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
                                this.recordHistoryDuo
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
                    case EntityRelationType.ONE_TO_MANY:
                        if (!dbRelation.oneToManyElems) {
                            continue;
                        }
                        const subTree = {};
                        selectClause[dbProperty.name] = subTree;
                        this.getCascadeSubTree(dbRelation.relationEntity, subTree);
                        break;
                    case EntityRelationType.MANY_TO_ONE:
                        this.applicationUtils.addRelationToEntitySelectClause(dbRelation, selectClause);
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
};
__decorate([
    Inject()
], DeleteManager.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], DeleteManager.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], DeleteManager.prototype, "historyManager", void 0);
__decorate([
    Inject()
], DeleteManager.prototype, "operationHistoryDuo", void 0);
__decorate([
    Inject()
], DeleteManager.prototype, "recordHistoryDuo", void 0);
__decorate([
    Inject()
], DeleteManager.prototype, "repositoryTransactionHistoryDuo", void 0);
__decorate([
    Inject()
], DeleteManager.prototype, "sequenceGenerator", void 0);
DeleteManager = __decorate([
    Injected()
], DeleteManager);
export { DeleteManager };
//# sourceMappingURL=DeleteManager.js.map