var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and, Delete, InsertValues, or, UpdateProperties, } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { EntityRelationType } from '@airport/ground-control';
/**
 * Created by Papa on 11/15/2016.
 */
let OperationManager = class OperationManager {
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performSave(entities, actor, transaction, rootTransaction, context) {
        let entityGraph;
        context.isSaveOperation = true;
        if (context.internal) {
            if (entities instanceof Array) {
                entityGraph = entities;
            }
            else {
                entityGraph = [entities];
            }
        }
        else {
            const verifiedTree = this.cascadeGraphVerifier
                .verify(entities, context);
            entityGraph = this.entityGraphReconstructor
                .restoreEntityGraph(verifiedTree, context);
        }
        const missingRepositoryRecords = this.structuralEntityValidator.validate(entityGraph, [], context);
        if (missingRepositoryRecords.length) {
            const repository = await this.repositoryManager.createRepository(context.actor, context);
            for (const missingRepositoryRecord of missingRepositoryRecords) {
                missingRepositoryRecord.record[missingRepositoryRecord.repositoryPropertyName]
                    = repository;
            }
        }
        const operations = this.dependencyGraphResolver
            .getOperationsInOrder(entityGraph, context);
        const rootDbEntity = context.dbEntity;
        let saveActor = {
            id: actor.id,
            uuId: actor.uuId,
            user: actor.user ? {
                id: actor.user.id
            } : null
        };
        let newRepository;
        if (context.newRepository) {
            newRepository = {
                id: context.newRepository.id,
                createdAt: context.newRepository.createdAt,
                uuId: context.newRepository.uuId,
                ageSuitability: context.newRepository.ageSuitability,
                source: context.newRepository.source,
                ownerActor: {
                    id: actor.id,
                    uuId: actor.uuId,
                    user: actor.user ? {
                        id: actor.user.id
                    } : null
                }
            };
        }
        const saveResult = {
            actor: saveActor,
            created: {},
            newRepository,
            deleted: {},
            updated: {},
        };
        for (const operation of operations) {
            context.dbEntity = operation.dbEntity;
            if (operation.isCreate) {
                await this.internalCreate(operation.entities, actor, transaction, rootTransaction, saveResult, context, true);
            }
            else if (operation.isDelete) {
                await this.internalDelete(operation.entities, actor, transaction, rootTransaction, saveResult, context);
            }
            else {
                await this.internalUpdate(operation.entities, actor, transaction, rootTransaction, saveResult, context);
            }
        }
        context.dbEntity = rootDbEntity;
        return saveResult;
    }
    async internalCreate(entities, actor, transaction, rootTransaction, saveResult, context, ensureGeneratedValues) {
        const qEntity = this.airportDatabase.qApplications[context.dbEntity.applicationVersion.application.index][context.dbEntity.name];
        let rawInsert = {
            insertInto: qEntity,
            columns: this.qMetadataUtils.getAllInsertableColumns(qEntity),
            values: []
        };
        let columnIndexesInValues = [];
        rawInsert.columns.forEach((qField, index) => {
            columnIndexesInValues[qField.dbColumn.index] = index;
        });
        for (const entity of entities) {
            let valuesFragment = [];
            for (const dbProperty of context.dbEntity.properties) {
                let newValue = entity[dbProperty.name];
                if (newValue === undefined) {
                    newValue = null;
                }
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            this.applicationUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, columnValue, _propertyNameChains) => {
                                if (dbColumn.isGenerated) {
                                    return;
                                }
                                valuesFragment[columnIndexesInValues[dbColumn.index]]
                                    = columnValue === undefined ? null : columnValue;
                            }, false);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                        default:
                            throw new Error(`Unknown relationType '${dbRelation.relationType}' 
						for '${context.dbEntity.name}.${dbProperty.name}'.`);
                    }
                }
                else {
                    let column = dbProperty.propertyColumns[0].column;
                    if (!column.isGenerated) {
                        valuesFragment[columnIndexesInValues[column.index]] = newValue;
                    }
                }
            }
            rawInsert.values.push(valuesFragment);
        }
        const insertValues = new InsertValues(rawInsert);
        if (rawInsert.values.length) {
            const generatedColumns = context.dbEntity.columns.filter(column => column.isGenerated);
            if (generatedColumns.length && ensureGeneratedValues) {
                const portableQuery = this.queryFacade
                    .getPortableQuery(insertValues, null, context);
                const idsAndGeneratedValues = await this.insertManager
                    .insertValuesGetIds(portableQuery, actor, transaction, rootTransaction, context);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    const entitySaveResult = {};
                    saveResult.created[this.entityStateManager.getOperationUniqueId(entity)] = entitySaveResult;
                    for (const generatedColumn of generatedColumns) {
                        // Return index for generated column values is: DbColumn.index
                        const generatedPropertyName = generatedColumn.propertyColumns[0].property.name;
                        const generatedPropertyValue = idsAndGeneratedValues[i][generatedColumn.index];
                        entity[generatedPropertyName] = generatedPropertyValue;
                        entitySaveResult[generatedPropertyName] = generatedPropertyValue;
                    }
                }
            }
            else {
                const portableQuery = this.queryFacade
                    .getPortableQuery(insertValues, null, context);
                await this.insertManager.insertValues(portableQuery, actor, transaction, rootTransaction, context, ensureGeneratedValues);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    saveResult.created[this.entityStateManager.getOperationUniqueId(entity)] = true;
                }
            }
        }
    }
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    async internalUpdate(entities, actor, transaction, rootTransaction, saveResult, context) {
        const qEntity = this.airportDatabase.qApplications[context.dbEntity.applicationVersion.application.index][context.dbEntity.name];
        for (const entity of entities) {
            const setFragment = {};
            const idWhereFragments = [];
            let runUpdate = false;
            const originalEntity = this.entityStateManager.getOriginalValues(entity);
            if (!originalEntity) {
                continue;
            }
            for (const dbProperty of context.dbEntity.properties) {
                const updatedValue = entity[dbProperty.name];
                if (!dbProperty.relation || !dbProperty.relation.length) {
                    const originalValue = originalEntity[dbProperty.name];
                    if (dbProperty.isId) {
                        // For an id property, the value is guaranteed to be the same (and not empty) -
                        // cannot entity-update id fields
                        idWhereFragments.push(qEntity[dbProperty.name]
                            .equals(updatedValue));
                    }
                    else if (!this.utils.valuesEqual(originalValue, updatedValue)) {
                        setFragment[dbProperty.name] = updatedValue;
                        saveResult.updated[this.entityStateManager.getOperationUniqueId(entity)] = true;
                        runUpdate = true;
                    }
                }
                else {
                    const dbRelation = dbProperty.relation[0];
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            let propertyOriginalValue = originalEntity[dbProperty.name];
                            this.applicationUtils.forEachColumnOfRelation(dbRelation, entity, (_dbColumn, value, propertyNameChains) => {
                                let originalColumnValue = propertyOriginalValue;
                                let columnValue = value;
                                let valuePropertyNameChain = value;
                                for (const childPropertyName of propertyNameChains[0]) {
                                    if (originalColumnValue instanceof Object
                                        && originalColumnValue[childPropertyName]) {
                                        originalColumnValue = originalColumnValue[childPropertyName];
                                    }
                                    else {
                                        originalColumnValue = null;
                                    }
                                    if (columnValue instanceof Object
                                        && columnValue[childPropertyName]) {
                                        columnValue = columnValue[childPropertyName];
                                        valuePropertyNameChain.push(childPropertyName);
                                    }
                                    else {
                                        columnValue = null;
                                    }
                                }
                                if (dbProperty.isId) {
                                    let idQProperty = qEntity;
                                    for (const propertyNameLink of propertyNameChains[0]) {
                                        idQProperty = idQProperty[propertyNameLink];
                                    }
                                    // For an id property, the value is guaranteed to be the same (and not
                                    // empty) - cannot entity-update id fields
                                    idWhereFragments.push(idQProperty.equals(value));
                                }
                                else if (!this.utils.valuesEqual(originalColumnValue, columnValue)) {
                                    let currentSetFragment = setFragment;
                                    for (let i = 0; i < valuePropertyNameChain.length - 1; i++) {
                                        const childPropertyName = valuePropertyNameChain[i];
                                        if (!currentSetFragment[childPropertyName]) {
                                            currentSetFragment[childPropertyName] = {};
                                        }
                                        currentSetFragment = currentSetFragment[childPropertyName];
                                    }
                                    currentSetFragment[valuePropertyNameChain.length - 1] = columnValue;
                                    saveResult.updated[this.entityStateManager.getOperationUniqueId(entity)] = true;
                                    runUpdate = true;
                                }
                            }, dbProperty.isId);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                        default:
                            throw new Error(`Unknown relationType '${dbRelation.relationType}' 
						for '${context.dbEntity.name}.${dbProperty.name}'.`);
                    }
                }
            }
            if (runUpdate) {
                let whereFragment;
                if (idWhereFragments.length > 1) {
                    whereFragment = and(...idWhereFragments);
                }
                else {
                    whereFragment = idWhereFragments[0];
                }
                const rawUpdate = {
                    update: qEntity,
                    set: setFragment,
                    where: whereFragment
                };
                const update = new UpdateProperties(rawUpdate);
                const portableQuery = this.queryFacade.getPortableQuery(update, null, context);
                await this.updateManager.updateValues(portableQuery, actor, transaction, rootTransaction, context);
            }
        }
    }
    async internalDelete(entities, actor, transaction, rootTransaction, saveResult, context) {
        const dbEntity = context.dbEntity;
        const qEntity = this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index][dbEntity.name];
        const idWhereFragments = [];
        const valuesMapByColumn = [];
        let entityIdWhereClauses = [];
        for (const entity of entities) {
            for (let propertyName in entity) {
                if (!entity.hasOwnProperty(propertyName)) {
                    continue;
                }
                const dbProperty = dbEntity.propertyMap[propertyName];
                // Skip transient fields
                if (!dbProperty) {
                    continue;
                }
                const deletedValue = entity[propertyName];
                let dbRelation;
                if (dbProperty.relation && dbProperty.relation.length) {
                    dbRelation = dbProperty.relation[0];
                }
                if (!dbRelation) {
                    if (dbProperty.isId) {
                        // For an id property, the value is guaranteed to be the same (and not empty) -
                        // cannot entity-update id fields
                        idWhereFragments.push(qEntity[propertyName].equals(deletedValue));
                    }
                }
                else {
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            this.applicationUtils.forEachColumnOfRelation(dbRelation, dbEntity, (dbColumn, value, propertyNameChains) => {
                                if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
                                    let idQProperty = qEntity;
                                    for (const propertyNameLink of propertyNameChains[0]) {
                                        idQProperty = idQProperty[propertyNameLink];
                                    }
                                    // For an id property, the value is guaranteed to be the same (and not
                                    // empty) - cannot entity-update id fields
                                    idWhereFragments.push(idQProperty.equals(value));
                                }
                            }, false);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                        default:
                            throw new Error(`Unknown relationType '${dbRelation.relationType}' 
						for '${dbEntity.name}.${dbProperty.name}'.`);
                    }
                }
            }
            if (idWhereFragments.length > 1) {
                entityIdWhereClauses.push(and(...idWhereFragments));
            }
            else {
                entityIdWhereClauses.push(idWhereFragments[0]);
            }
            saveResult.deleted[this.entityStateManager.getOperationUniqueId(entity)] = true;
        }
        let where;
        if (entityIdWhereClauses.length === 1) {
            where = entityIdWhereClauses[0];
        }
        else {
            where = or(...entityIdWhereClauses);
        }
        let rawDelete = {
            deleteFrom: qEntity,
            where
        };
        let deleteWhere = new Delete(rawDelete);
        let portableQuery = this.queryFacade.getPortableQuery(deleteWhere, null, context);
        await this.deleteManager.deleteWhere(portableQuery, actor, transaction, rootTransaction, context);
    }
};
__decorate([
    Inject()
], OperationManager.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "cascadeGraphVerifier", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "deleteManager", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "dependencyGraphResolver", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "entityGraphReconstructor", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "insertManager", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "qMetadataUtils", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "queryFacade", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "repositoryManager", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "structuralEntityValidator", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "updateManager", void 0);
__decorate([
    Inject()
], OperationManager.prototype, "utils", void 0);
OperationManager = __decorate([
    Injected()
], OperationManager);
export { OperationManager };
//# sourceMappingURL=OperationManager.js.map